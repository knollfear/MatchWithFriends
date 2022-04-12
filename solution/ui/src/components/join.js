import {LitElement, css, html} from "https://cdn.skypack.dev/lit-element";
import {button} from "../css/button";

export class join  extends LitElement {
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
        <div class="fearnot-waiting" >
          <div>Waiting for opponent to join.</div>
          ${!this.copied ?
            html`<button @click=${() => this.copyText()}>Click to copy the game link</button>`
            :
            html`<div>Copied to clipboard, now share it with a friend</div>`
          }
        </div>
      `
    );

  }
}
