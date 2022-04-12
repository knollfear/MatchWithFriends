import {LitElement, css, html} from "https://cdn.skypack.dev/lit-element";

//////
// This component was generate with a template.  To use this component use the following HTML snippet:
//     <square-component .text=${'SAMPLE TEXT: square'} />
//  Feel free to remove this comment, but leave the insertion points.component
//////

export class square  extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      text: { type: String },
      clickHandler: {type: Function }
    };
  }

  static get styles() {
    return css`
      .square {
        background: #fff;
        border: 1px solid #999;
        float: left;
        font-size: 24px;
        font-weight: bold;
        line-height: 34px;
        height: 34px;
        margin-right: -1px;
        margin-top: -1px;
        padding: 0;
        text-align: center;
        width: 34px;
      }

      .square:focus {
        outline: none;
      }
    `
  }

  /// LIFECYCLE INSERTION POINT DO NOT REMOVE

  render() {

    return (
      html`
        <button class="square" >
          ${this.text}
        </button>
      `
    );

  }
}
