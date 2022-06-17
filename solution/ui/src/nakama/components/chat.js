import {LitElement, css, html} from "lit";
import {homeColor, awayColor} from "../../css/cssColors"
import {button} from "../../css/button";
//////
// This component was generate with a template.  To use this component use the following HTML snippet:
//     <square-component .text=${'SAMPLE TEXT: square'} />
//  Feel free to remove this comment, but leave the insertion points.component
//////

export class Chat  extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      messages: {type: Array },
      gameName: {type: String },
      homeName: {type:String},
      awayName: {type:String},
      isHome: {type:Boolean}
    };
  }

  static get styles() {
    return css`
        .chatFieldSet{
          position:absolute;
          bottom:15px;
        }
        fieldset{
          min-height:40vh;
          border:#5c3977 solid 2px;
          border-radius:10px;
          padding:10px;
        }

      ${button}
      button{
        padding: 15px;
        font-size: .75em;
      }

      .home{
        color:${homeColor}
      }
      .away{
        color: ${awayColor}
      }
    `
  }

  handleClick() {
    const text = this.shadowRoot.getElementById("chatMessage").value;
    const author = this.isHome ? this.homeName : this.awayName
    this.dispatchEvent(new CustomEvent("send-message",  { detail: {gameName: this.gameName, opCode: 500, data:{ text, author }}}));
    this.shadowRoot.getElementById("chatMessage").value = ""
  }

  /// LIFECYCLE INSERTION POINT DO NOT REMOVE

  render() {

    return (
      html`
        <fieldset>
          <legend>Chat</legend>
          <ul>
            ${this.messages.map(
              message => html`
              <li class="${message.author === this.homeName ? 'home':'away'}">${message.author}: ${message.text}</li>
            `
            )}
          </ul>
          <div class="chatFieldSet">
            <input type="text" id="chatMessage" name="chatMessage" class="chatMessage" value=""/>
            <button
              class="chatButton"
              @click=${this.handleClick}
              @enter=${this.handleClick}
            >
              Send
            </button>
          </div>

        </fieldset>
      `
    );

  }
}
