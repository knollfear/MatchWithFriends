import {LitElement, css, html} from "https://cdn.skypack.dev/lit-element";

//////
// This component was generate with a template.  To use this component use the following HTML snippet:
//     <board-component .text=${'SAMPLE TEXT: board'} />
//  Feel free to remove this comment, but leave the insertion points.component
//////

export class board  extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
      text: { type: String },
      squares: {type: Array},
      xIsNext: {type: Boolean},
    };
  }

  static get styles() {
    return css`
      .board-row:after {
        clear: both;
        content: "";
        display: table;
      }

      .status {
        margin-bottom: 10px;
      }
    `
  }

  /// LIFECYCLE INSERTION POINT DO NOT REMOVE

  handleClick(position){
    this.dispatchEvent(new CustomEvent("square-clicked", { detail: position }));
  }

  renderSquare(position){
    return html`<square-component .text=${this.squares[position]} @click=${() => this.handleClick(position)} ></square-component>`
  }
  render() {
    return (
      html`
        <div>
          <div class="status">${status}</div>
          <div class="board-row">
            ${this.renderSquare(0)}
            ${this.renderSquare(1)}
            ${this.renderSquare(2)}
          </div>
          <div class="board-row">
            ${this.renderSquare(3)}
            ${this.renderSquare(4)}
            ${this.renderSquare(5)}
          </div>
          <div class="board-row">
            ${this.renderSquare(6)}
            ${this.renderSquare(7)}
            ${this.renderSquare(8)}
          </div>
        </div>
      `
    );

  }


}
