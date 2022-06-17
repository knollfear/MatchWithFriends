import { GameCreation } from './game-creation';
import {html} from "lit";

window.customElements.define('game-creation', GameCreation)

export default {
    title: 'Nakama/Components/GameCreation',
};

const defaultArgs = {
    // More on composing args: https://storybook.js.org/docs/web-components/writing-stories/args#args-composition
    gameName: null
}

const Template = (args) => html`
    <game-creation
        .gameName=${args.gameName}
    >
        
    </game-creation>
`

export const CreateGame = Template.bind({});
CreateGame.args = {
    ...defaultArgs
};

export const JoinGame = Template.bind({});
JoinGame.args = {
    gameName: 'daa132a4-59b1-45cd-946a-9794cc405d34.'
};


