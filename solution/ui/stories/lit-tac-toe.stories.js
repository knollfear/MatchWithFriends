import { html } from 'lit-html';
import '../src/lit-tac-toe.js';

export default {
  title: 'LitTacToe',
  component: 'lit-tac-toe',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <lit-tac-toe
      style="--lit-tac-toe-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </lit-tac-toe>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
