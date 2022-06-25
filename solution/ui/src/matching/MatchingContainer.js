import {LitElement, css, html} from "lit";
import {shuffle, getRandomInt, getCard} from "../helpers/utils";
import {homeColor, awayColor, cardSource} from "../settings"
import {button} from "../css/button";

const defaultLives = 3
const numCards = 8
const cardURL = cardSource

export class MatchingContainer  extends LitElement {

    constructor() {
        super();
        this.data = this._getWithExpiry('data')
        this.isReady = false
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
        return( this.data && this.data.cards ?
                this.gameState.cardMap ?
                        html `
                            <matching-cards
                                .cards=${this.data.cards}
                                .cardMap=${this.gameState.cardMap || []}
                                .flippedCards=${this.gameState.flippedCards || []}
                                .textCards=${this.gameState.textCards || []}
                                .picks=${this.gameState.picks || []}
                                @cardClicked=${this._clickHandler}
                            ></matching-cards>
                            
                        `
                    :
                        html`
                          <div>${this.gameState.winner ?
                                this.gameState.winner === 'tie' ?
                                    html`Great Job.  You tied.`
                                    :
                                    html`Congratulations ${this.gameState.winner} won!`
                            :
                            html ``
                          }</div>  
                          <div style="margin-top:20vh">
                            <button @click=${() => this._setupGame()} >${this.gameState.winner ? html`ANOTHER GAME?`:html`START GAME`}</button>
                          </div>
                        `
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
        const activeCards = Array(numCards).fill(false).map(()=> getRandomInt(this.data.cards.length))
        const cardMap =  shuffle(activeCards.concat(activeCards))
        const textCards = Array(numCards * 2).fill(false)
        // flip a coin, if heads make first index of card Id text, otherwise make lastIndexOf cardId text
        activeCards.forEach(cardId => getRandomInt(2) ?
                textCards[cardMap.indexOf(cardId)] = true
            :
                textCards[cardMap.lastIndexOf(cardId)] = true
        )
        const flippedCards = Array(numCards * 2).fill(false)
        const picks = []


        const gameState = {
            cardMap,
            textCards,
            flippedCards,
            picks,
            homeScore: 0,
            awayScore: 0,
            isHomeTurn: this.isHome
        }
        console.log(gameState)
        this.isReady = true
        this.dispatchEvent(new CustomEvent("game-event", { detail:{opCode: 300, data:gameState}}))
    }

    _nextTurn(){
        console.log("Advancing Turn")
        console.log(JSON.stringify(this.gameState))
        const tempState = JSON.parse(JSON.stringify(this.gameState))
        const firstPick = this.gameState.picks[0]
        const secondPick = this.gameState.picks[1]
        const isMatch = this.gameState.cardMap[firstPick] === this.gameState.cardMap[secondPick]
        if (isMatch){
            tempState.isHomeTurn ? tempState.homeScore = tempState.homeScore + 1: tempState.awayScore = tempState.awayScore + 1
            tempState.flippedCards[firstPick] = tempState.isHomeTurn ? "home" : "away"
            tempState.flippedCards[secondPick] = tempState.isHomeTurn ? "home" : "away"
        }
        if (tempState.awayScore + tempState.homeScore >= tempState.cardMap.length/2){
            delete tempState.cardMap
            tempState.winner = tempState.homeScore > tempState.awayScore ? this.homeName : tempState.awayScore > tempState.homeScore ? this.awayName : 'Tie'
        }
        tempState.picks = []
        tempState.isHomeTurn = !this.gameState.isHomeTurn


        this.dispatchEvent(new CustomEvent("game-event", {detail: {opCode: 100, data: tempState}}))
    }

    _clickHandler = event =>{
        const cardIndex = event.detail.cardIndex
        console.log(JSON.stringify(this.gameState))
        console.log(this.isHome)
        console.log(cardIndex)
        //  not your turn
        if (this.gameState.isHomeTurn !== this.isHome){
            return
        }
        console.log("my turn")
        // already picked this card, or 2 picks have been made
        if (this.gameState.picks.indexOf(cardIndex) > 0 || this.gameState.picks.length >= 2){
            return
        }
        console.log("not too many picks")
        const tempState = JSON.parse(JSON.stringify(this.gameState))

        tempState.picks.push(cardIndex)
        if (tempState.picks.length === 2){
            setTimeout(() => this._nextTurn(), 3000)
        }
        console.log(JSON.stringify(tempState))
        this.dispatchEvent(new CustomEvent("game-event", { detail:{opCode: 100, data:tempState}}))

    }
}
