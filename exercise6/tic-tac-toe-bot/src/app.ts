import { newRouter, type Router } from "./routes.ts";
import Tournament from "./model/Tournament.ts";
import Player from "./model/Player.ts";

type Store = {
  tournament: Tournament;
  router: Router;
};

class App {
  readonly #app: HTMLElement;
  readonly #store: Store;

  constructor(app: HTMLElement, players: Player[]) {
    this.#app = app;

    const tournament = new Tournament(players, 4);
    this.#store = {
      tournament,
      router: newRouter(tournament),
    };
  }

  render = async () => {
    const node = await this.#store.router.render(window.location);

    if (!node) {
      this.#app.replaceChildren("");
    } else if (Array.isArray(node)) {
      this.#app.replaceChildren(...node);
    } else {
      this.#app.replaceChildren(node);
    }
  };
}

export default App;
