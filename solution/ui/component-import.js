// Nakama
import {GameContainer} from "./src/nakama/game-container";
import {GameCreation} from "./src/nakama/components/game-creation"
import {Join} from "./src/nakama/components/join";
import {Chat} from "./src/nakama/components/chat";

window.customElements.define('game-container', GameContainer)
window.customElements.define('game-creation', GameCreation)
window.customElements.define('join-component', Join)
window.customElements.define('chat-component', Chat)

// fearnot
import {FearNotContainer} from "./src/fearnot/FearNotContainer"
import {GameArea} from "./src/fearnot/components/gameArea"
import {Header} from "./src/fearnot/components/header"

window.customElements.define('fearnot-container', FearNotContainer)
window.customElements.define('fearnot-game-area', GameArea)
window.customElements.define('fearnot-header', Header)



// common
import {Score} from "./src/common/components/score"

window.customElements.define('score-component', Score)
