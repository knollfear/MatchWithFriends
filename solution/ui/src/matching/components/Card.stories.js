import { Card } from './Card';
import {getCard} from "../../helpers/utils";
import {html} from "lit";
import {backgroundColor} from "../../settings";

window.customElements.define('matching-card', Card)

export default {
    title: 'Matching/Components/Card',
};


const defaultArgs = {
    // More on composing args: https://storybook.js.org/docs/web-components/writing-stories/args#args-composition
    card:getCard(),
    flipped: false,
    isText: false,
    cardId: 1,
    picked: false,
}

const Template = (args) =>  html`
        <div style="background-color: ${backgroundColor}">
            <matching-card
                .card=${args.card}
                .isText=${args.isText}
                .cardId=${args.cardId}
                .flipped=${args.flipped}
                .picked=${args.picked}
            >
            </matching-card>
        </div>
    `

export const defaultCard = Template.bind({});
defaultCard.args = {
    ...defaultArgs
};

export const flippedIMGCard = Template.bind({});
flippedIMGCard.args = {
    ...defaultArgs,
    flipped: true
};

export const pickedIMGCard = Template.bind({});
pickedIMGCard.args = {
    ...defaultArgs,
    picked: true
};

export const flippedTextCard = Template.bind({});
flippedTextCard.args = {
    ...defaultArgs,
    flipped: true,
    isText: true
};

export const pickedTextCard = Template.bind({});
pickedTextCard.args = {
    ...defaultArgs,
    picked: true,
    isText: true
};

