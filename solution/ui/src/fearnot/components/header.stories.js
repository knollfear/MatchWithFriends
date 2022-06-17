import { Header } from './header';
import {html} from "lit";

window.customElements.define('fearnot-header', Header)

export default {
    title: 'FearNot/Components/Header',
};

const defaultArgs = {
    // More on composing args: https://storybook.js.org/docs/web-components/writing-stories/args#args-composition

}

const Template = (args) => new Header(args)

export const defaultHeader = Template.bind({});
defaultHeader.args = {
    ...defaultArgs
};
