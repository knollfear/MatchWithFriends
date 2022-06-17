import { GameCreation } from './game-creation';
import {html} from "lit";

window.customElements.define('game-creation', GameCreation)

export default {
    title: 'Nakama/Components/GameCreation',
};

const defaultArgs = {
    // More on composing args: https://storybook.js.org/docs/web-components/writing-stories/args#args-composition

}

const Template = (args) => html`YOLO`

export const CreateGame = Template.bind({});
CreateGame.args = {
    ...defaultArgs
};



