import {html} from "lit";
import {getCard} from "../../helpers/utils";
import {GameArea} from "./gameArea";

window.customElements.define('fearnot-game-area', GameArea)

export default {
    title: 'FearNot/Components/GameArea',
};



const getCards = () => [0,1,2,3].map( () => getCard())



const defaultArgs = {
    // More on composing args: https://storybook.js.org/docs/web-components/writing-stories/args#args-composition
    isHome:true,
    cards: getCards(),
    gameState:{
        awayName: "Riley",
        homeName: "Casey",
        isNot: false,
        notNot: false,
        activeCards: [0,1,2,3],
        ruleNum: 0
    }
}

const Template = (args) => html `
    <div class="left-container container" style="flex:0 1 70%; padding:.5em;overflow:scroll;align-items: flex-start; text-align:center">
        <fearnot-game-area
            .gameState=${args.gameState}
            .cards=${args.cards}
            .isHome=${args.isHome}
        >
        </fearnot-game-area>
    </div>
`

export const PendingGame = Template.bind({});
PendingGame.args = {
    ...defaultArgs
};

export const SelectedRight = Template.bind({});
SelectedRight.args = {
    ...defaultArgs,
    gameState:{
        awayName: "Riley",
        homeName: "Casey",
        awayPick: 1,
        homePick: 0,
        activeCardId: 0,
        isNot: false,
        notNot: false,
        activeCards: [0,1,2,3],
        ruleNum: 0
    }
};

export const SelectedWrong = Template.bind({});
SelectedWrong.args = {
    ...defaultArgs,
    gameState:{
        awayName: "Riley",
        homeName: "Casey",
        awayPick: 1,
        homePick: 3,
        activeCardId: 0,
        isNot: false,
        notNot: false,
        activeCards: [0,1,2,3],
        ruleNum: 0
    }
};

export const OnlyHomePick = Template.bind({});
OnlyHomePick.args = {
    ...defaultArgs,
    gameState:{
        awayName: "Riley",
        homeName: "Casey",
        homePick: 3,
        activeCardId: 0,
        isNot: false,
        notNot: false,
        activeCards: [0,1,2,3],
        ruleNum: 0
    }
};

export const OnlyAwayPick = Template.bind({});
OnlyAwayPick.args = {
    ...defaultArgs,
    gameState:{
        awayName: "Riley",
        homeName: "Casey",
        awayPick: 3,
        activeCardId: 0,
        isNot: false,
        notNot: false,
        activeCards: [0,1,2,3],
        ruleNum: 0
    }
};

export const Rule0 = Template.bind({});
Rule0.args = {
    ...defaultArgs,
    gameState:{
        awayName: "Riley",
        homeName: "Casey",
        activeCardId: 0,
        isNot: false,
        notNot: false,
        activeCards: [0,1,2,3],
        ruleNum: 0
    }
};

export const Rule1 = Template.bind({});
Rule1.args = {
    ...defaultArgs,
    gameState:{
        awayName: "Riley",
        homeName: "Casey",
        activeCardId: 0,
        isNot: false,
        notNot: false,
        activeCards: [0,1,2,3],
        ruleNum: 1
    }
};

export const Rule2 = Template.bind({});
Rule2.args = {
    ...defaultArgs,
    gameState:{
        awayName: "Riley",
        homeName: "Casey",
        activeCardId: 0,
        isNot: false,
        notNot: false,
        activeCards: [0,1,2,3],
        ruleNum: 2
    }
};

export const Rule3 = Template.bind({});
Rule3.args = {
    ...defaultArgs,
    gameState:{
        awayName: "Riley",
        homeName: "Casey",
        activeCardId: 0,
        isNot: false,
        notNot: false,
        activeCards: [0,1,2,3],
        ruleNum: 3
    }
};

export const Rule4 = Template.bind({});
Rule4.args = {
    ...defaultArgs,
    gameState:{
        awayName: "Riley",
        homeName: "Casey",
        activeCardId: 0,
        isNot: false,
        notNot: false,
        activeCards: [0,1,2,3],
        ruleNum: 4
    }
};

export const Rule5 = Template.bind({});
Rule5.args = {
    ...defaultArgs,
    gameState:{
        awayName: "Riley",
        homeName: "Casey",
        activeCardId: 0,
        isNot: false,
        notNot: false,
        activeCards: [0,1,2,3],
        ruleNum: 5
    }
};

export const Rule6 = Template.bind({});
Rule6.args = {
    ...defaultArgs,
    gameState:{
        awayName: "Riley",
        homeName: "Casey",
        activeCardId: 0,
        isNot: false,
        notNot: false,
        activeCards: [0,1,2,3],
        ruleNum: 6
    }
};

export const Rule7 = Template.bind({});
Rule7.args = {
    ...defaultArgs,
    gameState:{
        awayName: "Riley",
        homeName: "Casey",
        activeCardId: 0,
        isNot: false,
        notNot: false,
        activeCards: [0,1,2,3],
        ruleNum: 7
    }
};

export const Rule8 = Template.bind({});
Rule8.args = {
    ...defaultArgs,
    gameState:{
        awayName: "Riley",
        homeName: "Casey",
        activeCardId: 0,
        isNot: false,
        notNot: false,
        activeCards: [0,1,2,3],
        ruleNum: 8
    }
};

export const Rule9 = Template.bind({});
Rule9.args = {
    ...defaultArgs,
    gameState:{
        awayName: "Riley",
        homeName: "Casey",
        activeCardId: 0,
        isNot: false,
        notNot: false,
        activeCards: [0,1,2,3],
        ruleNum: 9
    }
};


