import Page from "../../Page.ts";
import Tournament from "../../../model/Tournament.ts";
import { Router } from "../../../routes.ts";
import classNameToArray from "../../../utils/classNameToArray.ts";
import { twMerge } from "tailwind-merge";
import PageContainer from "../../components/PageContainer";

type Props = {
  router: Router;
};

class TournamentResult implements Page {
  readonly tournament: Tournament;
  readonly #pageContainerComponent: PageContainer;

  constructor(tournament: Tournament) {
    this.tournament = tournament;
    this.#pageContainerComponent = new PageContainer();
  }

  async render({ router }: Props) {
    if (this.tournament.games.length <= 0) {
      router.push("/");
    }

    const h1 = this.#renderH1("Coming soon...");

    return this.#pageContainerComponent.render({
      children: [h1],
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
}

export default TournamentResult;
