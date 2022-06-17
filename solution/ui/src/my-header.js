import { html, css, LitElement } from 'lit'

export class MyHeader extends LitElement {
    static get styles() {
        return css``
    }

    static get properties() {
        return {}
    }

    constructor() {
        super()
    }

    render() {
        return html`
          <h1>This is a Header</h1>
    `
    }

}