import { LitElement, html, nothing } from "../deps.js";

customElements.define(
  "nmm-posts-read-page",
  class extends LitElement {
    static properties = {
      id: {},
    };

    render() {
      return html`
        <h3>Post #${this.id}</h3>
        <p>Lorem ipsum dolor sit amet...</p>
      `;
    }
  },
);
