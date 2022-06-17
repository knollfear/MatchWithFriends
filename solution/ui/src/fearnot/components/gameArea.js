import {css, html, LitElement} from "lit";
import {Rules, aTeamRule, johnRule} from "../../helpers/Rules";
import {homeColor, awayColor} from "../../css/cssColors"
import {button} from "../../css/button";

export class GameArea extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      gameState: {type: Object},
      cards: {type: Object},
      isHome: {type: Boolean}
    };
  }

  static get styles() {
    return css`

      .card-container{
        display:flex;
        flex-wrap:wrap;
        justify-content: center;
        row-gap: 1em;
        column-gap: 15px;
      }
      .card {
        flex:1;
        cursor: pointer;

      }
      .card img {
        border-radius: 15px;
        border: #fff solid 5px;
        max-height: 170px;
        max-width: 170px;
      }

      .homePick img{
        outline: ${homeColor} solid 5px;
      }
      .awayPick img{
        outline: ${awayColor} solid 5px;
      }

      .not{
        color: #ee5340;
      }

      ${button}

      ul{
        list-style: none;
        font-size: 0.7em;
        line-height: 1em;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 0;
        margin: 0;
      }
    `
  }
  showResult(rule, activeCard){
    if (this.gameState.awayPick !== undefined && this.gameState.homePick !== undefined){
      const homeCorrect = this.gameState.isNot ? !rule.rule(this.cards[this.gameState.homePick], activeCard) : rule.rule(this.cards[this.gameState.homePick], activeCard)
      const awayCorrect = this.gameState.isNot ? !rule.rule(this.cards[this.gameState.awayPick], activeCard): rule.rule(this.cards[this.gameState.awayPick], activeCard)
      if (this.isHome ? homeCorrect : awayCorrect) {
        return (html`
          <div >
            Good Job. you got it right!
          </div>
        `)
      } else{
        return html`
          <div>
            Better Luck next time
          </div>
        `
      }
    }
    return (html``
    )
  }
  cardDetails(cardId, rule, activeCardId){
    const card = this.cards[cardId]
    const activeCard = this.cards[activeCardId]
    const activeCards = this.gameState.activeCards.map(ac => this.cards[ac])
    const isCorrect = rule.rule(card, activeCard, activeCards)

    if(this.gameState.awayPick !== undefined && this.gameState.homePick !== undefined){
      const awayPick = this.gameState.awayPick === cardId
      const homePick = this.gameState.homePick === cardId

      return (html `
          <ul>
            <li>${card.txt}</li>
            <li>${card.division}</li>
            <li>${card.jobTitle}</li>
          </ul>
        `)
    } else{
      return (html ``)
    }

  }

  render() {
    const {activeCardId, isNot, notNot, ruleNum} = this.gameState || {}
    const activeCard = activeCardId !== undefined ? this.cards[activeCardId] : null
    const rule = Rules[ruleNum || 0]
    const activeCards =  this.gameState.activeCards
    if(!activeCard) {
      return (
        html`
          <div style="margin-top:20vh">
            <button @click=${() => this.dispatchEvent(new CustomEvent("setupGame"))} >START GAME</button>
          </div>`
      )
    }

    return (
      html`
        <div class="game-container">
          <div class=${`rule ${isNot && 'not'}`}>
            ${rule.text(activeCard, isNot, notNot)}
            ${this.showResult(rule, activeCard)}
          </div>

        <div class="card-container">
        ${activeCards.map((cardId) => {
          const card = typeof cardId === "number" ? this.cards[cardId] : cardId
          return (
            html`
              <div class=${`card
                      ${card.isCorrect ? ' correct' : ''}
                      ${this.isHome && cardId === this.gameState.homePick ? 'homePick':''}
                      ${!this.isHome && cardId === this.gameState.awayPick ? 'awayPick':''}
              `}
                   @click=${() => this.dispatchEvent(new CustomEvent("cardClicked", { detail: {cardId} }))}
              >
                ${rule.cardRender(card)}

                ${this.cardDetails(cardId, rule, activeCardId)}
              </div>
            `
          )
        })}

        </div>
        </div>

      `
    )
  }
}


