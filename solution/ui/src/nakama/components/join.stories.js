import { Join } from './join';
import {html} from "lit";

window.customElements.define('join-component', Join)

export default {
    title: 'Nakama/Components/JoinGame',
};

const defaultArgs = {
    // More on composing args: https://storybook.js.org/docs/web-components/writing-stories/args#args-composition
    gameName: '58235d33-a9b1-4fff-b6b1-fa3bb121cf5e'
}

const Template = (args) => html`
    <join-component 
            .gameName="${args.gameName}"
    >  
    </join-component>
`

export const CreateGame = Template.bind({});
CreateGame.args = {
    ...defaultArgs
};



