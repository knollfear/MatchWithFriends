import {LitElement, css, html} from "lit";
import {homeColor, awayColor} from "../../css/cssColors"
//////
// This component was generate with a template.  To use this component use the following HTML snippet:
//     <square-component .text=${'SAMPLE TEXT: square'} />
//  Feel free to remove this comment, but leave the insertion points.component
//////

const life = html`<img class="life" src="../../../src/img/fearless.png" alt="1 Life"/>`

export class Score  extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      gameState: {type: Object},
      homeName: {type:String},
      awayName: {type:String},
      isHome: {type:Boolean}
    }
  };


  static get styles() {
    return css`
      fieldset{
        border:#5c3977 solid 2px;
        border-radius:10px;
        min-height: 20vh;
      }

      ul{
        list-style: none;
      }
      .life{
        border-radius: 100%;
        margin: 8px;
        max-width:24px;
      }
      .score-box{
        display: flex;
        align-items:center;
        padding: 20px;
      }
      .home .life{
        border: ${homeColor} solid 2px;
      }
      .away .life{
        border: ${awayColor} solid 2px;
      }
      .home{
        color:${homeColor}
      }
      .away{
        color: ${awayColor}
      }
    `
  }

  /// LIFECYCLE INSERTION POINT DO NOT REMOVE

  render() {
    if(this.gameState.cardMap) {
      return (

        html`
          <fieldset>
            <legend>Score</legend>
            <div>
              <div class="${this.isHome ? 'home' : 'away'} score-box">
                <span>${this.isHome ? this.homeName : this.awayName}:</span>
                ${new Array(this.isHome ? this.gameState.homeScore : this.gameState.awayScore).fill(0).map(x => life)}
              </div>
              <div class="${this.isHome ? 'away' : 'home'} score-box">
                <span>${this.isHome ? this.awayName : this.homeName}:</span>
                ${new Array(this.isHome ? this.gameState.awayScore : this.gameState.homeScore).fill(0).map(x => life)}
              </div>

            </div>
          </fieldset>
        `
      );
    }
    else{
      return html`
        <fieldset>
            <legend>Score</legend>
            Waiting for game to start
        </fieldset>
      `
    }

  }
}
