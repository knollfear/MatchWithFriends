import { Score } from './score';
import {html} from "lit";

window.customElements.define('score-component', Score)

export default {
    title: 'Common/Components/Score',
};

const defaultArgs = {
    // More on composing args: https://storybook.js.org/docs/web-components/writing-stories/args#args-composition
    gameState:{
        homeScore: 0,
        homeLives: 3,
        awayScore: 0,
        awayLives: 3,
        activeCards: [1,2,3],
    },
    isHome: true,
    homeName: "Casey",
    awayName: "Riley"
}

const Template = (args) => {

    return html`
      <score-component
              .gameState=${args.gameState}
              .isHome=${args.isHome}
              .homeName=${args.homeName}
              .awayName=${args.awayName}
      >
      </score-component>
    `
}

export const NewGame = Template.bind({});
NewGame.args = {
    ...defaultArgs
};

export const PendingGame = Template.bind({});
PendingGame.args = {
    ...defaultArgs,
    gameState:{
        homeScore: 0,
        homeLives: 3,
        awayScore: 0,
        awayLives: 3,
    },
};

export const ScoredGame = Template.bind({});
ScoredGame.args = {
    ...defaultArgs,
    gameState:{
        homeScore: 5,
        homeLives: 1,
        awayScore: 7,
        awayLives: 2,
        cardMap: [1,1,2,2],
    },
};

