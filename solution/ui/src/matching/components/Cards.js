import { html, css, LitElement } from "lit"


export class Cards extends LitElement {
    static get styles() {
        return css`
          .flex-container{
            display:flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
          }
        `
    }

    static get properties() {
        return {

            cards: {type: Array},
            cardMap: {type: Array},
            flippedCards: {type: Array},

            textCards: {type: Array},
            picks: {type: Array},
        }
    }

    constructor() {
        super()
    }

    _handleClick(cardIndex){
        console.log(cardIndex)
        this.dispatchEvent(new CustomEvent("cardClicked", { detail: {cardIndex} }))
    }
    render() {
        return html`
            <div class="flex-container">
                ${this.cardMap.map((cardId, index) => {
                    const card = this.cards[cardId]
    
                    return html`
                        <div class="flex-item">
                            <matching-card
                                    .card=${card}
                                    .isText=${this.textCards[index]}
                                    .cardId=${cardId}
                                    .flipped=${this.flippedCards[index]}
                                    .picked=${this.picks.indexOf(index) >= 0}
                                    @click=${() => this._handleClick(index)}
                            ></matching-card>
                        </div>
                    `
    
                })}
            </div>
        `


    }
}