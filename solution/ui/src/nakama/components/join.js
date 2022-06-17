import {LitElement, css, html} from "lit";
import {button} from "../../css/button";

export class Join  extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      gameName: { type: String },
      clickHandler: {type: Function },
      copied: {type: Boolean},
    };
  }

  static get styles() {
    return css`
      ${button}

      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60vh;
        text-align: center;
        font-size: 1.5em;
        line-height: 3em;
      }
      .signup-container input{
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        margin: 15px;
        align-items: center;
        border-color: #5c3977;
        color: #5c3977;

      }
    `
  }

  copyText() {

    var textToCopy = `${window.location}?gameName=${this.gameName}`

    var myTemporaryInputElement = document.createElement("input");
    myTemporaryInputElement.type = "text";
    myTemporaryInputElement.value = textToCopy;

    document.body.appendChild(myTemporaryInputElement);

    myTemporaryInputElement.select();
    document.execCommand("Copy");

    document.body.removeChild(myTemporaryInputElement);
    console.log(`copied "${textToCopy}" to clipboard` )
    this.copied = true

    setTimeout(() => { this.copied = false }, 5000)
  }
  /// LIFECYCLE INSERTION POINT DO NOT REMOVE

  render() {

    return (
      html`
        <div class="signup-container container">
          <div class="fearnot-waiting" >
            <div>Waiting for opponent to join.</div>
            ${!this.copied ?
              html`<button @click=${() => this.copyText()}>Click to copy the game link</button>`
              :
              html`<div>Copied to clipboard, now share it with a friend</div>`
            }
          </div>
        </div>
      `
    );

  }
}
