// Nakama
import {GameContainer} from "./src/nakama/game-container";
import {GameCreation} from "./src/nakama/components/game-creation"
import {Join} from "./src/nakama/components/join";
import {Chat} from "./src/nakama/components/chat";

window.customElements.define('game-container', GameContainer)
window.customElements.define('game-creation', GameCreation)
window.customElements.define('join-component', Join)
window.customElements.define('chat-component', Chat)


// matching
import { Cards } from './src/matching/components/Cards';
import { Card } from './src/matching/components/Card';
import { MatchingContainer } from './src/matching/MatchingContainer';

window.customElements.define('matching-card', Card)
window.customElements.define('matching-cards', Cards)
window.customElements.define('matching-container', MatchingContainer)


// common
import {Score} from "./src/common/components/score"
import {Header} from "./src/fearnot/components/header"

window.customElements.define('score-component', Score)
window.customElements.define('fearnot-header', Header)
