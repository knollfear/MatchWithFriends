import { Cards } from './Cards';
import {html} from "lit";
import {getCard} from "../../helpers/utils";
import {backgroundColor} from "../../settings";

window.customElements.define('matching-cards', Cards)


export default {
    title: 'Matching/Components/Cards',
};
// Number of unique cards to choose
const numCards = 10
const defaultArgs = {
    // More on composing args: https://storybook.js.org/docs/web-components/writing-stories/args#args-composition
    cards: Array(numCards).fill(false).map(()=> getCard()),
    cardMap: [1,1,2,2,3,3,4,4],
    flippedCards: Array(8).fill(false),
    textCards: [false, true, false, true, false, true, false, true ],
    picks: []
}

const Template = (args) => html`
    <div style="background-color: ${backgroundColor}">
        <matching-cards
            .cards=${args.cards}
            .cardMap=${args.cardMap}
            .flippedCards=${args.flippedCards}
            .textCards=${args.textCards}
            .picks=${args.picks}
        ></matching-cards>
    </div>
`

export const DefaultCards = Template.bind({});
DefaultCards.args = {
    ...defaultArgs
};

export const AllFlippedCards = Template.bind({});
AllFlippedCards.args = {
    ...defaultArgs,
    flippedCards: ["home", "away", "home", "away", "home", "away", "home", "away"],
};

export const pickedCards = Template.bind({});
pickedCards.args = {
    ...defaultArgs,
    picks: [0,1]
};



