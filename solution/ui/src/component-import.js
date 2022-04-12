import { LitTacToe } from './LitTacToe.js';
import {game} from "./components/game.js";

import {board} from "./components/board.js";

import {square} from "./components/square.js";

import {chat} from "./components/chat.js"
import {gameContainer} from "./containers/GameContainer.js"
import {fearNotContainer} from "./containers/FearnotContainer.js"
import {gameArea} from "./components/fearnot/gameArea.js"
import {header} from "./components/fearnot/header.js"
import {join} from "./components/join"
import {score} from "./components/score"
import {gameStatus} from "./components/GameStatus";


// IMPORT INSERTION POINT;
customElements.define('lit-tac-toe', LitTacToe);
customElements.define('game-component', game);

customElements.define('board-component', board);

customElements.define('square-component', square);

customElements.define( 'chat-component', chat)

customElements.define ('game-container', gameContainer)
customElements.define ('fearnot-container', fearNotContainer)
customElements.define ('game-area', gameArea)
customElements.define('fearnot-header', header)
customElements.define('score-component', score)
customElements.define('join-component', join)
customElements.define('game-status-component', gameStatus)



// CUSTOM ELEMENTS INSERTION POINT
