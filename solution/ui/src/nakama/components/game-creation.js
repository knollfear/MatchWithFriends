import { html, css, LitElement } from 'lit'
import {button} from "../../css/button";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class GameCreation extends LitElement {
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

    static get properties() {
        return {
            /**
             * The id of the game.
             */
            gameName: { type: String },

        }
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <div class="signup-container container">
                <div class="signup-body">
                    <label class"signup-name" htmlFor="name">Please enter your name</label>
                    <br/>
                    <input id="nameInput" type="text" name="name" value=${localStorage.getItem("username") || ''}></input>
                    <br/>
                    ${this.gameName ?
                            html`<button @click=${() => this._joinGame()}>Join a game</button>`
                            :
                            html`<button @click=${() => this._createGame()}>Create a game</button>`
                    }
                </div>
            </div>
        `
    }

    _joinGame(){
        const awayName = this.shadowRoot.getElementById("nameInput").value;
        this.dispatchEvent(new CustomEvent("join-game", { detail:{awayName}}))
    }

    _createGame(){
        const homeName = this.shadowRoot.getElementById("nameInput").value;
        this.dispatchEvent(new CustomEvent("create-game", { detail:{homeName}}))
    }
}
