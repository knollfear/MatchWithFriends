import {LitElement, css, html} from "lit";
import {Client} from "@heroiclabs/nakama-js";
import { v4 as uuid } from 'uuid'
import {button} from "../css/button";
import {clientConfig} from "./config";
import {backgroundColor} from "../settings"

//////
// This component was generate with a template.  To use this component use the following HTML snippet:
//     <game-component .text=${'SAMPLE TEXT: game'} />
//  Feel free to remove this comment, but leave the insertion points.component
//////


export class GameContainer  extends LitElement {
    constructor() {
        super();
        // Get the game name from the URL if it is there
        this.gameName = new URLSearchParams(window.location.search).get('gameName') || null
        // Setup Nakama client
        this.client = new Client(clientConfig.serverKey, clientConfig.host, clientConfig.port, clientConfig.useSSL);
        this.client.ssl = false;
        this.showDialog = false;
        // Message Queue
        this.messages = []
        // GameState
        this.gameState = {}
        // Async, do login
        this._login()
    }

    static get properties() {
        return {
            gameName: {type:String},
            text: { type: String },
            client: {type: Object},
            showDialog: {type: Boolean},
            messages: {type:Array},
            copied: {type: Boolean},
            socket: {type: Object},
            isHome: {type: Boolean},
            homeName: {type: String},
            awayName: {type: String},
            gameState: {type: Object},
            user_id: {type:String},
            abandonedGame: {type: Boolean, default:false}

        };
    }

    static get styles() {
        return css`
      .game {
        display: flex;
        flex-direction: row;
      }

      .game-info {
        margin-left: 20px;
      }
      .svg-right-arrow {
        max-height: 25px
      }

      ${button}

      .fearnot-body{
        background-color: ${backgroundColor};
        color: #5c3977;
        height: 100vh;
        font-family: "Montserrat Alternates Bold", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
      }

      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60vh;
        text-align: center;
        font-size: 1.5em;
        line-height: 3em;
      }

      .main-container {
        display:flex;
        width:100%;
        min-height:85%;
        height:85%;

      }

      .left-container {
        flex:0 1 70%;
        min-height:100%;
        height:100%;
        max-width:70%;
        padding:.5em;
        overflow:scroll;
        align-items: flex-start
      }

      .right-container {
        flex:0 1 30%;
        display:flex;
        height:100%;
        max-width:30%;
        flex-wrap:wrap;
        align-items:flex-start;
      }

      .half-container {
        flex:0 0 100%;
        max-width:90%;
        padding:.5em;
        position:relative;
        margin:15px
      }

      .score-container{
        min-height: 25%;
        max-height:25%
      }
      .chat-container fieldset{
        min-height: 60%;
        max-height:75%;
      }

    `
    }


    /// LIFECYCLE INSERTION POINT DO NOT REMOVE
    render() {

        if(this.homeName ) {
            if (this.awayName){

                return (
                    // Render your game component here.  It should emit events when the user takes a turn.
                    // When an update is received the game state will be updated to the data payload of the move.
                    html`
          <div class="fearnot-body">
            <fearnot-header></fearnot-header>
            <div class="main-container">
              <div class="left-container container">
                <matching-container
                  @game-event=${this._handleGameEvent}
                  .isHome=${this.isHome}
                  .homeName=${this.homeName}
                  .awayName=${this.awayName}
                  .gameName=${this.gameName}
                  .gameState=${this.gameState}
                >
                </matching-container>
              </div>
              <div class="right-container">
                <div class="score-container half-container">

                  <score-component
                    .gameState=${this.gameState}
                    .isHome=${this.isHome}
                    .homeName=${this.homeName}
                    .awayName=${this.awayName}
                  >
                  </score-component>
                  </div>
                  <div class="chat-container half-container">
                      <chat-component
                        .messages=${this.messages}
                        .gameName=${this.gameName}
                        .isHome=${this.isHome}
                        .homeName=${this.homeName}
                        .awayName=${this.awayName}
                        @send-message=${this._sendMessage}
                      ></chat-component>
                  </div>
                </div>
            </div>
          `
                );
            } else{
                return (
                    html`
            <div class="fearnot-body">
              <fearnot-header></fearnot-header>
              <div class="signup-container container">
                <join-component .gameName="${this.gameName}"></join-component>
              </div>
            </div>
            `
                )
            }
        }
        else {

            return (
                html`
            <div class="fearnot-body">
              <fearnot-header></fearnot-header>
                  <game-creation
                          @create-game=${this._createGame}
                          @join-game=${this._joinGame}
                          .gameName="${this.gameName}"
                      >
                  </game-creation>
            </div>
          `

            )
        }

    }

    async _login() {
        // See if device is logged in
        let deviceId = localStorage.getItem("deviceId");
        if (!deviceId) {
            // Make a new deviceId
            deviceId = uuid();
            console.log(deviceId)
            localStorage.setItem("deviceId", deviceId);
        }

        // Authenticate Device, Create a new account if needed
        this.session = await this.client.authenticateDevice(deviceId, true);
        localStorage.setItem("user_id", this.session.user_id);
        this.user_id = this.session.user_id
        // Store session for quick reconnects.
        localStorage.setItem("nakamaAuthToken", this.session.token)
        console.info("Authenticated successfully. User id:", this.session.user_id);
        const trace = false;
        this.socket = this.client.createSocket(this.client.useSSL, trace);
        await this.socket.connect(this.session);
    }

    _handlePresencesChange = async presences =>{
        // set away name to the joined player.
        if (presences.joins && presences.joins[0].user_id !== this.user_id) {
            const response = await this.client.getUsers(this.session, [presences.joins[0].user_id], [], []);
            console.log(this.isHome ? "Setting Away Name": "Setting Home Name")
            this.isHome ?  this.awayName = response.users[0].display_name : this.homeName = response.users[0].display_name
        }
        if (presences.leaves){
            this.abandonedGame = true
        }
    }

    _createGame = async (event) => {
        this.isHome = true;
        console.log(event)
        this.homeName = event.detail.homeName
        console.log(this.homeName)
        await this.client.updateAccount(this.session, {
            display_name: this.homeName
        });
        localStorage.setItem("username", this.homeName);
        // subscribe to the game
        const match = await this.socket.createMatch();
        this.gameName = match.match_id
        console.log(this.gameName)

        // handle leaving or joining the match
        this.socket.onmatchpresence = (presences) => {
            this._handlePresencesChange(presences)
        };
        // handle turns here

        this.socket.onmatchdata = (result) => {
            this._resultHandler(result)
        };

    }

    _joinGame = async (event) => {
        console.log(event)
        this.isHome = false;
        // you are joining a game, you are 'away'
        this.awayName = event.detail.awayName
        // Join a game.
        await this.client.updateAccount(this.session, {
            display_name: this.awayName,
        });

        localStorage.setItem("username", this.awayName);
        console.log(this.gameName)
        // slack treats the dot at the end of the game name as punctuation, not link so need to fix it
        if( this.gameName[this.gameName.length - 1] !== "."){
            this.gameName = this.gameName + "."
        }
        console.log(this.gameName)
        const match = await this.socket.joinMatch(this.gameName);
        const connectedOpponents = match.presences.filter((presence) => {
            // Remove your own user from list.
            return presence.user_id !== this.user_id;
        });
        const response = await this.client.getUsers(this.session, [connectedOpponents[0].user_id], [], []);
        this.homeName = response.users[0].display_name

        // handle turns here
        this.socket.onmatchdata = (result) => {
            this._resultHandler(result)
        };

        this.socket.onmatchpresence = (presences) => {
            this._handlePresencesChange(presences)
        }

    }

    _resultHandler = result => {
        var content = result.data;
        console.log(result.op_code)
        switch (result.op_code) {
            // Regular move incoming, set the game state to the contents
            case 100:
                this.gameState = content
                break;
            // Opponent requested new game
            case 200:
                if (window.confirm("Would you like to play again?")) {
                    this.socket.sendMatchState(this.gameName, 300,{})
                }else{
                    this.socket.leaveMatch(this.gameName)
                    this.homeName = null
                    this.awayName = null
                    this.gameState = {}
                    this.gameName = null
                }
                break;
            // Start a new game
            case 300:
                console.log(content)
                this.gameState = content
                break
            // Message came in
            case 500:
                this.messages.unshift(content)
                this.messages = this.messages.slice(0,5)
                break
            default:
                console.log("Unknown event type: ", content);
        }
    }

    _sendMessage = event =>{
        this._handleGameEvent(event)
        this.messages.unshift(event.detail.data)
        this.messages = this.messages.slice(0,5)
    }

    _handleGameEvent = event =>{
        console.log(event.detail)
        this.socket.sendMatchState(this.gameName, event.detail.opCode, event.detail.data)
        if (event.detail.opCode < 500) {
            this.gameState = event.detail.data
        }
    }

}
