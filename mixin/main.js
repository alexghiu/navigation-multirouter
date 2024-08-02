import { html, render } from "./deps.js";

import "./shell.js";

export async function main() {
  const container = document.querySelector("body");
  const featureBasePath = "/mixin/";
  const template = html`<nmm-shell
    .featureBasePath=${featureBasePath}
  ></nmm-shell>`;

  if (!container) {
    throw new Error("Container missing from page.");
  }

  render(template, container);
}
