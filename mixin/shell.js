import { html, LitElement, nothing } from "./deps.js";

import { FeatureRouterMixin } from "./feature-router-mixin.js";

import "./pages/posts.js";
import "./pages/about.js";

customElements.define(
  "nmm-shell",
  class extends FeatureRouterMixin(LitElement) {
    static properties = {
      _routeTemplate: {},
      // Sample of remotely loaded data.
      lazyProperty: {},
    };

    constructor() {
      super();
      this._routeTemplate = nothing;
      this.lazyProperty = {};
    }

    connectedCallback() {
      super.connectedCallback();
      // Simulate loading some data after 2 secs from a remote source.
      setTimeout(() => {
        this.lazyProperty = {
          message: "Greetings",
        };
      }, 2000);
    }

    render() {
      return html`
        <h1>NMM Shell</h1>
        <nav>${this.#renderNavigation()}</nav>
        <div>${this._routeTemplate}</div>
      `;
    }

    /**
     * @override
     * @param {Map} changedProperties
     */
    update(changedProperties) {
      super.update(changedProperties);
      // If the `lazyProperty` changes, the route template will need to be
      // re-rendered so that the state change is observed by the element.
      if (changedProperties.has("lazyProperty")) {
        this._parseFeatureRoute();
      }
    }

    /**
     * @private
     */
    #renderNavigation() {
      return html`
        <ul>
          <li><a href="${this.featureBasePath}posts/">Posts</a></li>
          <li><a href="${this.featureBasePath}about/">About</a></li>
        </ul>
      `;
    }

    /**
     * @override
     * @protected
     */
    _parseFeatureRoute() {
      const url = this._currentUrl;
      // This is where we define our "routes".
      const emptyPattern = new URLPattern({
        pathname: `${this.featureBasePath}`,
      });
      const postsPattern = new URLPattern({
        pathname: `${this.featureBasePath}posts/*`,
      });
      const aboutPattern = new URLPattern({
        pathname: `${this.featureBasePath}about/`,
      });
      // Testing the previously defined routes occurs below (including empty route & fallback).
      // First match wins!
      switch (true) {
        // Our "/" route handler (should redirect to an explicitly defined route).
        case emptyPattern.test(url):
          this.navigation.navigate(`${this.featureBasePath}posts/`);
          this._routeTemplate = this.#renderPostsRoute();
          break;
        // The "posts" route handler (the empty route redirects to this route as well).
        case postsPattern.test(url):
          this._routeTemplate = this.#renderPostsRoute();
          break;
        case aboutPattern.test(url):
          this._routeTemplate = this.#renderAboutRoute();
          break;
        // Fallback (404) route.
        default:
          this._routeTemplate = nothing;
      }
    }

    /**
     * @private
     */
    #renderPostsRoute() {
      return html`
        <nmm-posts-page
          .featureBasePath="${this.featureBasePath}posts/"
          .lazyProperty=${this.lazyProperty}
        ></nmm-posts-page>
      `;
    }

    /**
     * @private
     */
    #renderAboutRoute() {
      return html` <nmm-about-page></nmm-about-page> `;
    }
  },
);
