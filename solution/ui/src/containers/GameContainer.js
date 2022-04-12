import {LitElement, css, html} from "https://cdn.skypack.dev/lit-element";
import {Client} from "https://cdn.skypack.dev/@heroiclabs/nakama-js";
import {v4 as uuidv4} from "https://cdn.skypack.dev/uuid";
import {button} from "../css/button";

//////
// This component was generate with a template.  To use this component use the following HTML snippet:
//     <game-component .text=${'SAMPLE TEXT: game'} />
//  Feel free to remove this comment, but leave the insertion points.component
//////
const clientConfig = {
  serverKey:  'H5U324Pu8RurWkyEYAxYwCCdNSA5fpxzdyezMnrYCdUt3',
  host:  "nakama.gypsysilks.com",
  port:  "7350",
  useSSL: true,
}

export class gameContainer  extends LitElement {
  constructor() {
    super();
    this.gameName = new URLSearchParams(window.location.search).get('gameName') || null
    this.client = new Client(clientConfig.serverKey, clientConfig.host, clientConfig.port, clientConfig.useSSL);
    this.client.ssl = false;
    this.showDialog = false;
    this.messages = []
    this.gameState = {}
    console.log(this.gameName)
    this.login()
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
      user_id: {type:String}

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
        background-color: #ccc4d5;
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
      .signup-container input{
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        margin: 15px;
        align-items: center;
        border-color: #5c3977;
        color: #5c3977;

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

  async login() {
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem("deviceId", deviceId);
    }

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

  getKey = () =>{
    return `game/${this.gameName}`
  }

  handlePresencesChange = async presences =>{
    // set away name to the joined player.
    if (presences.joins && presences.joins[0].user_id !== this.user_id) {
      const response = await this.client.getUsers(this.session, [presences.joins[0].user_id], [], []);
      console.log(this.isHome ? "Setting Away Name": "Setting Home Name")
      this.isHome ?  this.awayName = response.users[0].display_name : this.homeName = response.users[0].display_name
    }
    if (presences.leaves){
      this.homeName = null
      this.awayName = null
      this.gameName = null
      this.isHome = false
      this.messages = []
    }
  }


  createGame = async () => {
    this.isHome = true;
    this.homeName = this.shadowRoot.getElementById("nameInput").value;
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
      this.handlePresencesChange(presences)
    };
    // handle turns here

    this.socket.onmatchdata = (result) => {
      this.resultHandler(result)
    };

  }

  joinGame = async () => {

    this.isHome = false;
    // you are joining a game, you are 'away'
    this.awayName = this.shadowRoot.getElementById("nameInput").value;
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
      this.resultHandler(result)
    };

    this.socket.onmatchpresence = (presences) => {
      this.handlePresencesChange(presences)
    }

  }

  resultHandler = result =>{
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

  handleGameEvent = event =>{
    console.log(event.detail)
    this.socket.sendMatchState(this.gameName, event.detail.opCode, event.detail.data)
    if (event.detail.opCode < 500) {
      this.gameState = event.detail.data
    }
  }

  sendMessage = event =>{
    this.handleGameEvent(event)
    this.messages.unshift(event.detail.data)
    this.messages = this.messages.slice(0,5)
  }

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
                <fearnot-container
                  @game-event=${this.handleGameEvent}
                  .isHome=${this.isHome}
                  .homeName=${this.homeName}
                  .awayName=${this.awayName}
                  .gameName=${this.gameName}
                  .gameState=${this.gameState}
                >
                </fearnot-container>
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
                        @send-message=${this.sendMessage}
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
              <div class="signup-container container">
                <div  class="signup-body">
                 <label class"signup-name" for="name">Please enter your name</label>
                <br/>
                 <input id="nameInput" type="text" name="name" value=${localStorage.getItem("username") || ''}></input>
                 <br/>
                  ${this.gameName ?
                    html `<button @click=${()=>this.joinGame()}>Join a game</button>`
                    :
                    html `<button @click=${()=>this.createGame()}>Create a game</button>`
                  }
                  </div>
              </div>
            </div>
          `

      )
    }

  }

}
