import { html, LitElement, nothing } from "./deps.js";

import { FeatureRouterMixin } from "./feature-router-mixin.js";

import "./pages/posts.js";
import "./pages/about.js";

customElements.define(
  "nmm-shell",
  class extends FeatureRouterMixin(LitElement) {
    static properties = {
      _routeTemplate: {},
    };

    constructor() {
      super();
      this._routeTemplate = nothing;
    }

    render() {
      return html`
        <h1>NMM Shell</h1>
        <nav>${this.#renderNavigation()}</nav>
        <div>${this._routeTemplate}</div>
      `;
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
    _parseFeatureRoute(url) {
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
