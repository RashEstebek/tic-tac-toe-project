import { twMerge } from "tailwind-merge";
import Page from "../../Page.ts";
import classNameToArray from "../../../utils/classNameToArray.ts";
import { Router } from "../../../routes.ts";
import Tournament from "../../../model/Tournament.ts";
import Player from "../../../model/Player.ts";
import PlayersList from "../../components/PlayersList/PlayersList.ts";
import PageContainer from "../../components/PageContainer";

type Props = {
  router: Router;
};

class TournamentIntro implements Page {
  readonly tournament: Tournament;
  abortCtrl: AbortController | undefined;
  readonly #pageContainerComponent: PageContainer;
  readonly #playersListComponent: PlayersList;

  constructor(tournament: Tournament) {
    this.tournament = tournament;
    this.#pageContainerComponent = new PageContainer();
    this.#playersListComponent = new PlayersList();
  }

  async render({ router }: Props) {
    const h1 = this.#renderH1("Welcome to Tic Tac Toe tournament!");
    const header = this.#renderHeader(h1);
    const h2 = this.#renderH2("Our players");
    const playersList = await this.#renderPlayersList(this.tournament.players);
    const button = this.#renderButton("Start tournament");
    const main = await this.#renderMain(h2, playersList, button);
    const result = this.#pageContainerComponent.render({
      children: [header, main],
    });

    this.listenEvents(router, button);

    return result;
  }

  async cleanup() {
    this.abortCtrl?.abort();

    await Promise.all([this.#playersListComponent?.cleanup?.()]);
  }

  listenEvents(router: Router, btn: HTMLButtonElement) {
    this.abortCtrl = new AbortController();
    const signal = this.abortCtrl.signal;

    btn.addEventListener("click", () => this.#handleStartTournament(router), {
      signal,
    });
  }

  #renderH1(...children: (string | Node)[]) {
    const h1 = document.createElement("h1");
    h1.classList.add(
      ...classNameToArray(
        twMerge(
          "mb-3 flex justify-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white dark:text-white",
        ),
      ),
    );
    h1.append(...children);

    return h1;
  }

  #renderHeader(...children: (string | Node)[]) {
    const header = document.createElement("header");
    header.append(...children);

    return header;
  }

  #renderH2(...children: (string | Node)[]) {
    const h2 = document.createElement("h2");
    h2.classList.add(
      ...classNameToArray(
        twMerge("text-xl font-medium text-gray-900 dark:text-white"),
      ),
    );
    h2.append(...children);

    return h2;
  }

  async #renderPlayersList(players: Player[]) {
    const ul = await this.#playersListComponent.render({ players });
    ul.classList.add(
      ...classNameToArray(
        twMerge(
          "my-3 grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] grid-rows-[repeat(auto-fill,_1fr)] gap-[20px]",
        ),
      ),
    );

    return ul;
  }

  #renderButton(...children: (string | Node)[]) {
    const button = document.createElement("button");
    button.classList.add(
      ...classNameToArray(
        twMerge(
          "mb-2 mr-2 self-end rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
        ),
      ),
    );
    button.append(...children);

    return button;
  }

  async #renderMain(...children: (string | Node)[]) {
    const main = document.createElement("main");
    main.classList.add(...classNameToArray(twMerge("flex flex-col")));
    main.append(...children);

    return main;
  }

  #handleStartTournament = (router: Router) => {
    this.tournament.start();
    router.push("/game");
  };
}

export default TournamentIntro;
