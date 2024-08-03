import { LitElement, html, nothing } from "../deps.js";

import { FeatureRouterMixin } from "../feature-router-mixin.js";

import "./posts-list.js";
import "./posts-create.js";
import "./posts-read.js";

customElements.define(
  "nmm-posts-page",
  class extends FeatureRouterMixin(LitElement) {
    static properties = {
      _routeTemplate: {},
      _routeMatch: { state: true },
    };

    constructor() {
      super();
      this._routeTemplate = nothing;
      this._routeMatch = {};
    }

    render() {
      return html`
        <h2>Posts page</h2>
        <div>${this._routeTemplate}</div>
      `;
    }

    /**
     * @override
     * @protected
     */
    _parseFeatureRoute(url) {
      const emptyPattern = new URLPattern({
        pathname: `${this.featureBasePath}`,
      });
      const listPattern = new URLPattern({
        pathname: `${this.featureBasePath}list/`,
      });
      const createPattern = new URLPattern({
        pathname: `${this.featureBasePath}create/`,
      });
      const readPattern = new URLPattern({
        pathname: `${this.featureBasePath}read/:id/*`,
      });
      switch (true) {
        case emptyPattern.test(url):
          this.navigation.navigate(`${this.featureBasePath}list/`);
          this._routeTemplate = this.#renderListRoute();
          break;
        case listPattern.test(url):
          this._routeTemplate = this.#renderListRoute();
          break;
        case createPattern.test(url):
          this._routeTemplate = this.#renderCreateRoute();
          break;
        case readPattern.test(url):
          // `_routeMatch` needs to have been assigned to when `#renderReadRoute` executes!
          this._routeMatch = readPattern.exec(url);
          this._routeTemplate = this.#renderReadRoute();
          break;
        default:
          this._routeTemplate = nothing;
      }
    }

    /**
     * @private
     */
    #renderListRoute() {
      return html`<nmm-posts-list-page
        .featureBasePath="${this.featureBasePath}list/"
      ></nmm-posts-list-page>`;
    }

    /**
     * @private
     */
    #renderCreateRoute() {
      return html`<nmm-posts-create-page></nmm-posts-create-page>`;
    }

    /**
     * @private
     */
    #renderReadRoute() {
      const id = this._routeMatch?.pathname?.groups?.id;
      return html`<nmm-posts-read-page
        .featureBasePath="${this.featureBasePath}read/${id}/"
        .id=${id}
      ></nmm-posts-read-page>`;
    }
  },
);
