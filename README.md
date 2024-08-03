# Navigation multi-router
Exploration of multi-router architectures for SPAs.

## Context

Complex applications are usually made out of deeply hierarchical page structures. Additionally, each page can contain components (like tabs, accordions etc) that can significantly change the page look and feel.

It us a reasonable user expectation that major UI changes to be restored when the page reloads or for the application to provide a capability of sharing its state to other users.

From an engineering perspective, multi-router architectures provide the added benefit of allowing features to be completely independent: the same feature should be as application agnostic as possible. This way, the same feature can be consumed in multiple applications without any change. Feature independence can also provide the capability of lifting a very complex feature in an application and moving it to a completely different part (again without any change).

This repository is a playground of architectures that serve the purposes mentioned above.

![Schematic goal](/assets/schematic-goal.svg)

## Approaches

[Mixin](mixin/README.md)

## Scripts

```bash
# Serve locally
npx serve
```
