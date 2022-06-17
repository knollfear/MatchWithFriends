import { Chat } from './chat';
import {html} from "lit";

window.customElements.define('chat-component', Chat)

export default {
    title: 'Nakama/Components/Chat',
};

const defaultArgs = {
    // More on composing args: https://storybook.js.org/docs/web-components/writing-stories/args#args-composition
    messages:[],
    gameName: "FOO",
    isHome: true,
    homeName: "Riley",
    awayName: "Casey"
}

const Template = (args) => html`
    <div style="position:relative; max-width:30vw">
        <chat-component
            .messages=${args.messages}
            .gameName=${args.gameName}
            .isHome=${args.isHome}
            .homeName=${args.homeName}
            .awayName=${args.awayName}
        >
        </chat-component>
    </div>

`

export const EmptyHomeChat = Template.bind({});
EmptyHomeChat.args = {
    ...defaultArgs
};

export const EmptyAwayChat = Template.bind({});
EmptyAwayChat.args = {
    ...defaultArgs,
    isHome: false,
};

export const FullHomeChat = Template.bind({});
FullHomeChat.args = {
    ...defaultArgs,
    messages: [
        {
            author: "Casey",
            text: "HI"
        },
        {
            author: "Casey",
            text: "Hello There"
        },
        {
            author: "Riley",
            text: "Well, then it's Treason"
        }
    ]
};

export const FullAwayChat = Template.bind({});
FullAwayChat.args = {
    ...defaultArgs,
    isHome: false,
    homeName: "Casey",
    awayName: "Riley",
    messages: [
        {
            author: "Casey",
            text: "HI"
        },
        {
            author: "Casey",
            text: "Hello There"
        },
        {
            author: "Riley",
            text: "It's Treason then"
        }
    ]
};



