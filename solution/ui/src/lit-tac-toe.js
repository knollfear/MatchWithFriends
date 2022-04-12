import { LitTacToe } from './LitTacToe.js';
import board from "./components/board";
import square from "./components/square";
import gameContainer from "./containers/GameContainer";

customElements.define("game-board", board);
customElements.define("board-square", square);
customElements.define('lit-tac-toe', LitTacToe);
customElements.define('game-container', gameContainer)
