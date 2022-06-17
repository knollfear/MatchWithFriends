import {LitElement, css, html} from "lit";
import {Rules, aTeamRule, johnRule} from "../helpers/Rules"
import {shuffle, getRandomInt} from "../helpers/utils";
import {homeColor, awayColor} from "../css/cssColors"
import {button} from "../css/button";

const defaultLives = 3
const cardURL = 'https://3bq9li6123.execute-api.us-east-1.amazonaws.com/knoll/teammembers'

export class FearNotContainer  extends LitElement {

  constructor() {
    super();
    this.data = this._getWithExpiry('data')
    this.isReady = false
    this.currentRule = Rules[0]
    if (!this.data){
      this._fetchData()
    }
  }

  static get properties() {
    return {
      data: {type: Object},
      gameState: {type: Object},
      homeName: {type:String},
      awayName: {type:String},
      isReady: {type: Boolean},
      isDisplayStats: {type: Boolean},
      isHome: {type:Boolean}
    };
  }

  static get styles() {
    return css`
      .card{
        display:inline-block;
        cursor: pointer;
      }

      ${button}

      .home{
        color:${homeColor}
      }
      .away{
        color: ${awayColor}
      }

    `
  }

  render(){
    if(this.gameState.awayPick !== undefined && this.gameState.homePick !== undefined && this.isHome){
      setTimeout(() => this._nextTurn(), 3000)
    }
    // someone has scored and one person has 0 lives
    if ((this.gameState.homeScore || this.gameState.awayScore) && (!this.gameState.awayLives || !this.gameState.homeLives)){
      return (html `
        <div>
          <div>GAME OVER</div>
          <div class="${this.isHome ? 'home' : 'away'}">Your Score: ${this.isHome ? this.gameState.homeScore : this.gameState.awayScore}</div>
          <div class="${this.isHome ? 'away' : 'home'}">Opponent Score: ${this.isHome ? this.gameState.awayScore : this.gameState.homeScore}</div>
          <button @click=${() => this._setupGame()}>Start New Game</button>
        </div>
      `)
    }
    return( this.data && this.data.cards ?
      html `<fearnot-game-area
        .gameState=${this.gameState}
        .cards=${this.data.cards}
        .isHome=${this.isHome}
        @setupGame=${this._setupGame}
        @cardClicked=${this._clickHandler}
      >

      </fearnot-game-area>`
        :
        html `<div>LOADING</div>`
    )
  }

  _setWithExpiry(key, value, ttl){
    const now = new Date()

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    }
    console.log(item.expiry)
    localStorage.setItem(key, JSON.stringify(item))
  }

  _getWithExpiry(key) {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
      console.log('cache miss')
      return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    console.log("cache hit")
    console.log(item.expiry)
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }

  _fetchData() {
    return fetch(cardURL)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          this.data = data;
          this.data.cards = data.cards.filter(card => card.img )
          this._setWithExpiry('data', this.data, 60*60*24*1000)
          console.log('Success:', this.data.cards);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  }

  _setupGame(){
    const activeCardId = getRandomInt(this.data.cards.length)
    const activeCards = [1,2,3].map(() => getRandomInt(this.data.cards.length))
    activeCards.unshift(activeCardId)
    shuffle(activeCards)
    const gameState = {
      ruleNum: 0,
      isNot:false,
      notNot:false,
      homeScore: 0,
      awayScore: 0,
      homeLives: defaultLives,
      awayLives: defaultLives,
      activeCardId,
      activeCards
    }
    this.isReady = true
    this.dispatchEvent(new CustomEvent("game-event", { detail:{opCode: 300, data:gameState}}))
  }

  _nextTurn(){
    console.log("Advancing Turn")
    console.log(this.data)
    if(this.gameState.awayPick !== undefined && this.gameState.homePick !== undefined && this.isHome){

      const rule = Rules[this.gameState.ruleNum]
      const activeCard = this.data.cards[this.gameState.activeCardId]

      const homeCorrect = this.gameState.isNot ? !rule.rule(this.data.cards[this.gameState.homePick], activeCard) : rule.rule(this.data.cards[this.gameState.homePick], activeCard)
      const homeScore = homeCorrect ? this.gameState.homeScore + 1 : this.gameState.homeScore
      const homeLives = homeCorrect ? this.gameState.homeLives : this.gameState.homeLives - 1

      const awayCorrect = this.gameState.isNot ? !rule.rule(this.data.cards[this.gameState.awayPick], activeCard): rule.rule(this.data.cards[this.gameState.awayPick], activeCard)
      const awayScore = awayCorrect ? this.gameState.awayScore + 1 : this.gameState.awayScore
      const awayLives = awayCorrect ? this.gameState.awayLives : this.gameState.awayLives - 1

      const score = Math.floor((homeScore + awayScore)/2)

      let isNot = (Math.floor(Math.random() * 10) % 3 === 0);
      const notNot = score > 20 && !isNot && Math.random() * 10 >= 7;
      const numRules = Math.min(Rules.length, Math.floor(score / 5));
      const ruleNum = Math.floor(Math.random() * numRules);


      const activeCardId = getRandomInt(this.data.cards.length)
      const activeCards = new Array(numRules + 3).fill(0).map(() => getRandomInt(this.data.cards.length))
      activeCards.unshift(activeCardId)
      const filteredCards = activeCards.filter((c, index) => {
        return activeCards.indexOf(c) === index;
      });
      shuffle(filteredCards)

      const gameState = {
        ruleNum,
        isNot,
        notNot,
        homeScore,
        awayScore,
        homeLives,
        awayLives,
        activeCardId,
        activeCards: filteredCards,
        aTeamRule: getRandomInt(100) < 3,
        johnRule: getRandomInt(100) < 3
      }
      this.isReady = true
      this.dispatchEvent(new CustomEvent("game-event", {detail: {opCode: 100, data: gameState}}))
    }else{
      console.log("no picks, skipping next turn")
    }
  }

  _clickHandler = event =>{
    const card = event.detail.cardId
    const tempState = JSON.parse(JSON.stringify(this.gameState))
    if (this.isHome && this.gameState.homePick === undefined){
      tempState.homePick = card
      this.dispatchEvent(new CustomEvent("game-event", { detail:{opCode: 100, data:tempState}}))
    }
    if (!this.isHome && this.gameState.awayPick === undefined){
      tempState.awayPick = card
      this.dispatchEvent(new CustomEvent("game-event", { detail:{opCode: 100, data:tempState}}))
    }

  }
}
