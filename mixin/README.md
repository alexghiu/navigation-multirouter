# Mixin

This approach requires a feature to express all its functionality (links, sub-routes) relative to a base path. The feature will expose a callback that will be called when the browser URL changes. It will the be the resposability of the feature to take action (inside the callback) of which template it would render (or as an alternative, what parts of the UI it would show and hide).

The [FeatureRouterMixin](./feature-router-mixin.js) exposes a `featureBasePath` property (the base property mentioned above). The value should always be assigned to by a parent component.

The [FeatureRouterMixin](./feature-router-mixin.js) will call a `_parseFeatureRoute` callback, when the URL changes. This callback will receive one argument, the current URL.

## Sample explanation

Start from the [main.js](./main.js) file. Notice how our feature shell is being fed the `featureBasePath` property.

### `shell.js`

The [shell.js](./shell.js) element applies the [FeatureRouterMixin](./feature-router-mixin.js) and it uses the `featureBasePath` property to compute anchor links inside the `#renderNavigation` private method. The `_parseFeatureRoute` callback is overriden and `URLPattern`s are being used to match agains the current browser URL.

The `_parseFeatureRoute` callback, provides an example of basic functionality that most consumers should implement:
- like providing an empty route that redirects to what should be the default page
- defining templates to serve as pages to render when routes are matched
- providing a fallback template that is to be rendered when a match cannot be made (in our case `nothing` will be rendered).

Inside the [shell.js](./shell.js) one might also find of interest the `#renderPostsRoute` method. This illustrates how this feature forwards the `featureBasePath` property to a sub-feature that also exposes routing functionality. Notice how the sub-feature is being assigned the current value of `featureBasePath` to which a new URL segment is added (`posts/` in the indicated method).

### `pages/posts.js`

The [pages/posts.js](./pages/posts.js) component is itself a feature that has routing capabilities. As a consequence, it too applies the [FeatureRouterMixin](./feature-router-mixin.js).

In the case of this element, it only acts as a container to sub-routes by overriding the `_parseFeatureRoute` protected method.

A similar approach to designing REST APIs could be used to structure element hierarchies and URL segments: `posts` in this case is the resource and it facilitates actions such as `list`, `create` and `read`.

Notice that the `_parseFeatureRoute` matches URLPatters using these exact actions that will be present in URLs like:
- `..posts/list/`
- `..posts/create/`
- `..posts/read/123`

Of particular interest one might find:
- the [pages/posts-list.js](./pages/posts-list.js) element that itself is being served a `featureBasePath` property so that it computes anchor hrefs relevant for navigation for the rest of the `posts` feature (even though this component doesn't apply the [FeatureRouterMixin](./feature-router-mixin.js), by using the identically named `featureBasePath` property, it facilitates applying the mixin later on).
- the [pages/posts-read.js](./pages/posts-read.js) element that is being provided the `id` property that is extracted from the matched URL (see the `#renderReadRoute` method in [pages/posts.js](./pages/posts.js)).
