import {LitElement, css, html} from "https://cdn.skypack.dev/lit-element";
//////
// This component was generate with a template.  To use this component use the following HTML snippet:
//     <game-component .text=${'SAMPLE TEXT: game'} />
//  Feel free to remove this comment, but leave the insertion points.component
//////

export class game  extends LitElement {
  constructor() {
    super();
    this.turn = 1
  }

  static get properties() {
    return {
      isHome: {type: Boolean},
      homeName: { type: String },
      awayName: { type: String },
      homeIsNext: {type: Boolean},
      turn: {type: Number},
      gameName: {type:String},
      gameState: {type:Object}
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
    `
  }


  /// LIFECYCLE INSERTION POINT DO NOT REMOVE
  resetGame = () =>{
    this.dispatchEvent(new CustomEvent("game-event", { detail: {gameName: this.gameName, opCode: 200, data:{}} }));
  }


  render() {
    console.log(typeof this.gameState.squares)
    console.log(this.gameState.squares)
    const turnNum = this.gameState.squares.reduce((accumulator, currentValue) => accumulator += currentValue ? 1 : 0, 0)

    const currentPlayer =  Boolean(  turnNum % 2 ) ? 'O' : 'X'
    const winner = this.calculateWinner(this.gameState.squares);
    let status;
    if (winner) {
      status = html `<div>Winner: ${winner} <button @click=${()=>this.resetGame()}>Another Game?</button></div>`
    } else {
      if(this.isHome){
        status = currentPlayer === 'X' ? 'Waiting for opponent to go' : "Your Turn"
      }
      else{
        status = currentPlayer === 'O' ? 'Waiting for opponent to go' : "Your Turn"
      }
    }


    return (
        html`
          <div class="game">
            <div class="game-board">
              <board-component .squares=${this.gameState.squares}
                               @square-clicked=${this.handleClick}/>
            </div>
            <div class="game-info">
              <div>${status}</div>
              ${ !this.homeName || !this.awayName ?
                html `${!this.copied ?
                  html `<button @click=${()=>this.copyText()}>Click to copy the game link</button>`
                  :
                  html `<div>Copied to clipboard, now share it with a friend</div>`
                }`
                :
                html `<div></div>`
              }
              <div>Opponent: ${this.isHome ? this.awayName || 'pending' : this.homeName}</div>
              <div>Playing as ${this.isHome ? 'X':'O'} ${this.isHome ? this.homeName:this.awayName}</div>
            </div>
          </div>
        `
    );


  }

  async handleClick(event){
    console.log(this.gameState.squares)
    const turnNum = this.gameState.squares.reduce((accumulator, currentValue) => accumulator += currentValue ? 1 : 0, 0)

    const isTurn = this.isHome  === Boolean(  turnNum % 2 )

    if (!isTurn || this.calculateWinner(this.gameState.squares)) return

    const position = event.detail
    if (this.gameState.squares[position]) return
    this.gameState.squares[position] = this.isHome ? 'X' : 'O'
    // send out the move
    console.log('dispatching Event')
    this.dispatchEvent(new CustomEvent("game-event", { detail: {gameName: this.gameName, opCode: 100, data:this.gameState}} ));
    console.log('event Dispatched')
    // record it locally
    this.gameState = JSON.parse(JSON.stringify(this.gameState))

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


  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  static getDefaultState() {
    return {
      squares: Array(9).fill(null)
    }

  }
}
