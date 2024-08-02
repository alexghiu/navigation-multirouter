import { LitElement, html } from "../deps.js";

customElements.define(
  "nmm-posts-create-page",
  class extends LitElement {
    render() {
      return html`
        <h3>Posts create page</h3>
        <form>
          <input placeholder="">Content</input>
          <button>Save</button>
        </form>
      `;
    }
  },
);
