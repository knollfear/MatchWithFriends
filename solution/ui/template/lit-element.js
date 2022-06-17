import { html, css, LitElement } from 'lit'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
    static get styles() {
        return css``
    }

    static get properties() {
        return {
            /**
             * The name to say "Hello" to.
             */
            name: { type: String },

            /**
             * The number of times the button has been clicked.
             */
            count: { type: Number }
        }
    }

    constructor() {
        super()
    }

    render() {
        return html``
    }

}