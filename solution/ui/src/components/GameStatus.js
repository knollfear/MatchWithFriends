import {LitElement, css, html} from "https://cdn.skypack.dev/lit-element";
export class gameStatus  extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      data: {type: Object},
      gameState: {type: Object},
      homeName: {type:String},
      awayName: {type:String},
      isReady: {type: Boolean},
      isDisplayStats: {type: Boolean},
      isHome: {type: Boolean}
    };
  }

  static get styles() {
    return css`{}`
  }

  /// LIFECYCLE INSERTION POINT DO NOT REMOVE

  render() {

    return (
      html`
        <div class="gameStatus">
          GAME STATUS
          <div>isHome: ${this.isHome}</div>
          <div>Home Name: ${this.homeName} (${this.gameState.homePick})</div>
          <div>Away Name: ${this.awayName} (${this.gameState.awayPick})</div>
          <div>Game Name: ${this.gameName}</div>
          <div>Game State: ${JSON.stringify(this.gameState)}</div>

        </div>
      `
    );

  }
}
