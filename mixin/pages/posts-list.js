import { LitElement, html } from "../deps.js";

customElements.define(
  "nmm-posts-list-page",
  class extends LitElement {
    static properties = {
      featureBasePath: {},
    };

    constructor() {
      super();
      this.featureBasePath = "/";
    }

    render() {
      // prettier-ignore
      return html`
        <h3>Posts list page</h3>
        <div>${this.#renderActions()}</div>
        <div>${this.#renderList()}</div>
      `;
    }

    /**
     * @private
     */
    #renderActions() {
      return html`
        <ul>
          <li><a href="${this.featureBasePath}../create/">Create post</a></li>
        </ul>
      `;
    }

    /**
     * @private
     */
    #renderList() {
      return html`
        <ul>
          <li><a href="${this.featureBasePath}../read/1/">Post #1</a></li>
          <li><a href="${this.featureBasePath}../read/2/">Post #2</a></li>
          <li><a href="${this.featureBasePath}../read/3/">Post #3</a></li>
          <li><a href="${this.featureBasePath}../read/4/">Post #4</a></li>
          <li><a href="${this.featureBasePath}../read/5/">Post #5</a></li>
        </ul>
      `;
    }
  },
);
