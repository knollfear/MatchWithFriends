import {LitElement, css, html} from "lit";
import {backImage, borderColor, textColor, homeColor, awayColor} from "../../settings"

//////
// This component was generate with a template.  To use this component use the following HTML snippet:
//     <square-component .text=${'SAMPLE TEXT: square'} />
//  Feel free to remove this comment, but leave the insertion points.component
//////

export class Card  extends LitElement {
    constructor() {
        super();

    }

    static get properties() {
        return {
            card: {
                type: Object,
                required: true,
            },
            flipped: {
                type: String,
                required: false,
                default: false
            },
            isText: {
                type: Boolean,
                required: false,
                default: false
            },
            cardId: {
                type: Number,
                required: true,
            },
            picked: {
                type: Boolean,
                required: false,
                default: false
            }
        };
    }



    _handleClick(cardId){
        this.dispatchEvent(new CustomEvent("cardClicked", { detail: {cardId} }))
    }

    /// LIFECYCLE INSERTION POINT DO NOT REMOVE

    render() {

        return (
            html`
                <div 
                    @click=${() => this._handleClick(this.cardId)} 
                    class="card-container flip-card ${this.flipped || this.picked ? "flipped":""} ${this.picked ? "picked":""}"
                >
                    <div class="card-body flip-card-inner">
                        <div class="flip-card-front">
                            <img src="${backImage}" alt="${backImage}"/>
                        </div>
                        <div class="flip-card-back ${this.flipped ? this.flipped: ""}">
                            ${this.isText ?
                                html`<div>${this.card.txt}</div>`
                                :
                                html`<img src="${this.card.photoUrl}" alt="${this.card.photoUrl}"/>`
                            }
                        </div>
                    </div>
                </div>
              `
            );

    }



    static get styles() {
        return css`
      .card-container{
        text-align: center;
        width: 100%;
        font-size: 1em;
        line-height: .8em;
        font-weight: bolder;
        padding-top: 15px;
        margin: 7px;
        
      }
      .card-body{
        color:${textColor};
        background-color: ${borderColor};
        width: 140px;
        height: 140px;
        text-align: center;
        line-height: 70px;
        margin: 10px
      }
      .card-body img{
        max-height: 120px;
        border-radius: 30px;
        padding: 8px;
      }
      .flip-card {
        background-color: transparent;
        width: 140px;
        height: 140px;
        
        perspective: 1000px; /* Remove this if you don't want the 3D effect */
      }
      /* This container is needed to position the front and back side */
      .flip-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
      }

      /* Do an horizontal flip when you move the mouse over the flip box container */
      .flipped .flip-card-inner {
        transform: rotateY(180deg);
      }

      /* Position the front and back side */
      .flip-card-front, .flip-card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
      }

      /* Style the front side (fallback if image is missing) */
      .flip-card-front {
        background-color: ${borderColor};
      }

      /* Style the back side */
      .flip-card-back {
        background-color: ${borderColor};
        color: ${textColor};
        transform: rotateY(180deg);
      }
          
      .picked .flip-card-inner .flip-card-back {
        background-color: white;
        color:  ${textColor};
      }
      .flipped .flip-card-inner .home {
        background-color: ${homeColor};
        color: ${awayColor};
      }
      .flipped .flip-card-inner .away {
        background-color: ${awayColor};
        color: ${homeColor};
      }
        `
    }
}
