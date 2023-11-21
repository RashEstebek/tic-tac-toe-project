import type Page from "../views/Page.ts";
import pushState from "./pushState.ts";

export type Route<PathName extends string> = {
  path: PathName;
  page: Page;
};

export default class Router<PathName extends string> {
  readonly #routes: Route<PathName>[];
  #activeRoute: Route<PathName> | null;

  constructor(routes: Route<PathName>[]) {
    this.#routes = routes;
    this.#activeRoute = null;
  }

  push(href: PathName, searchParams?: string) {
    const urlSearchParams = new URLSearchParams(searchParams);
    const searchStr = urlSearchParams.toString();
    const fullHref = searchStr ? `${href}?${urlSearchParams.toString()}` : href;
    pushState({ href: fullHref }, "", fullHref);
  }

  async render(location: Location) {
    const match = this.#routes.find(
      (route) => route.path === location.pathname,
    );

    // TODO: redirect to 404
    if (!match) {
      return;
    }

    if (this.#activeRoute) {
      this.#activeRoute?.page.cleanup?.();
    }

    this.#activeRoute = match;
    return this.#activeRoute?.page.render({ router: this });
  }
}
