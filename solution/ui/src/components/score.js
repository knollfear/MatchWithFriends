import {LitElement, css, html} from "https://cdn.skypack.dev/lit-element";
import {homeColor, awayColor} from "../cssColors"
import {openWcLogo} from "../open-wc-logo"
//////
// This component was generate with a template.  To use this component use the following HTML snippet:
//     <square-component .text=${'SAMPLE TEXT: square'} />
//  Feel free to remove this comment, but leave the insertion points.component
//////

const life = html`<img class="life" src="https://static.lingoapp.com/avatar/s/98426/86443E2F-CE31-4882-929C-8C8203C06D62.png" alt="1 Life"/>`

export class score  extends LitElement {
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
        max-width:32px;
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
    if(this.gameState.activeCards) {
      return (

        html`
          <fieldset>
            <legend>Score</legend>
            <ul>
              <li class="${this.isHome ? 'home' : 'away'}">${this.isHome ? this.homeName : this.awayName}:
                ${this.isHome ? this.gameState.homeScore : this.gameState.awayScore}
              </li>
              <li class="${this.isHome ? 'home' : 'away'}">
                ${new Array(this.isHome ? this.gameState.homeLives : this.gameState.awayLives).fill(0).map(x => life)}
              </li>
              <li class="${this.isHome ? 'away' : 'home'}">${this.isHome ? this.awayName : this.homeName}:
                ${this.isHome ? this.gameState.awayScore : this.gameState.homeScore}
              </li>
              <li class="${this.isHome ? 'away' : 'home'}">
                ${new Array(this.isHome ? this.gameState.awayLives : this.gameState.homeLives).fill(0).map(x => life)}
              </li>
            </ul>
          </fieldset>
        `
      );
    }
    else{
      return html`
        <fieldset>
            <legend>Score</legend>
        </fieldset>
      `
    }

  }
}
