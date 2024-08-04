export const FeatureRouterMixin = (superClass) =>
  class extends superClass {
    static properties = {
      navigation: {},
      featureBasePath: {},
    };

    constructor() {
      super();
      // Tests should inject their own navigation stub.
      this.navigation = window.navigation;
      this.featureBasePath = "/";
      this._currentUrl = new URL(this.navigation.currentEntry.url);
    }

    connectedCallback() {
      super.connectedCallback();
      this._parseFeatureRoute();
      this.#_handleNavigationNavigate =
        this.#handleNavigationNavigate.bind(this);
      this.navigation.addEventListener(
        "navigate",
        this.#_handleNavigationNavigate,
      );
    }

    disconnectedCallback() {
      if (this.#_handleNavigationNavigate) {
        this.navigation.removeEventListener(
          "navigate",
          this.#_handleNavigationNavigate,
        );
        this.#_handleNavigationNavigate = undefined;
      }
      super.disconnectedCallback();
    }

    /**
     * Used to hold the event handler copy returned by `.bind`.
     *
     * @private
     */
    #_handleNavigationNavigate;

    /**
     * @private
     * @param {NavigateEvent} e
     */
    #handleNavigationNavigate(e) {
      this._currentUrl = new URL(e.destination.url);
      e.intercept({
        handler: () => {
          this._parseFeatureRoute();
        },
      });
    }

    /**
     * @type {URL}
     * @readonly
     * @protected
     */
    _currentUrl = null;

    /**
     * @protected
     */
    _parseFeatureRoute() {}
  };
