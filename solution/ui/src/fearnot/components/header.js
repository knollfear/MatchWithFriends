import {LitElement, css, html} from "lit";

//////
// This component was generate with a template.  To use this component use the following HTML snippet:
//     <square-component .text=${'SAMPLE TEXT: square'} />
//  Feel free to remove this comment, but leave the insertion points.component
//////

export class Header  extends LitElement {
    constructor() {
        super();
    }

    static get properties() {
        return {};
    }

    static get styles() {
        return css`
      .fearnot-header{
        text-align: center;
        width: 100vw;
        font-size: 3em;
        line-height: .8em;
        font-weight: bolder;
        padding-top: 15px;
        color:#5c3977
      }
      .fearnot-withfriends{
        font-size:.75em;
        font-weight: lighter;
        color:#ee5340;
      }
    `
    }

    /// LIFECYCLE INSERTION POINT DO NOT REMOVE

    render() {

        return (
            html`
        <div class="fearnot-header">
          <span class="fearnot-fearnot">Fear Not</span>
          <br/>
          <span class="fearnot-withfriends">With Friends</span>
        </div>
      `
        );

    }
}
