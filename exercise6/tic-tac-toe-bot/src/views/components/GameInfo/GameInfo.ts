import { twMerge } from "tailwind-merge";
import Component from "../../../types/Component.ts";
import classNameToArray from "../../../utils/classNameToArray.ts";
import PageContainer from "../../components/PageContainer";
import PlayerItem from "../../components/PlayerItem";
import ProgressCircle from "../../components/ProgressCircle";
import Player from "../../../model/Player.ts";

type Props = {
  onProgressAnimationEnd: (ev: AnimationEvent) => void;
  player1: Player;
  player2: Player;
  gameIndex: number;
  score?: [number, number];
};

class GameInfo implements Component {
  readonly #pageContainerComponent: PageContainer;
  readonly #playerItemComponent: PlayerItem;
  readonly #progressComponent: ProgressCircle;

  constructor() {
    this.#pageContainerComponent = new PageContainer();
    this.#playerItemComponent = new PlayerItem();
    this.#progressComponent = new ProgressCircle();
  }

  async render({
    onProgressAnimationEnd,
    player1,
    player2,
    gameIndex,
    score,
  }: Props) {
    const progress = await this.#renderProgress(onProgressAnimationEnd);
    const number = this.#renderGameNumber(`${gameIndex + 1}`);
    const title = this.#renderH1("Game #", number);
    const header = this.#renderHeader(title);
    const player1Info = await this.#playerItemComponent.render({
      player: player1,
      playerScore: score?.[0],
    });
    const divider = this.#renderDivider("VS");
    const player2Info = await this.#playerItemComponent.render({
      player: player2,
      playerScore: score?.[1],
    });
    const list = this.#renderPlayersList(player1Info, divider, player2Info);
    const main = await this.#renderMain(list);
    return this.#pageContainerComponent.render({
      children: [progress, header, main],
    });
  }

  async cleanup() {
    await Promise.all([this.#progressComponent?.cleanup?.()]);
  }

  async #renderProgress(onProgressAnimationEnd: (ev: AnimationEvent) => void) {
    const progress = await this.#progressComponent.render({
      onAnimationEnd: onProgressAnimationEnd,
    });
    progress.classList.add(
      ...classNameToArray(twMerge("absolute right-6 h-6 w-6")),
    );

    return progress;
  }

  #renderGameNumber(...children: (string | Node)[]) {
    const em = document.createElement("em");
    em.append(...children);

    return em;
  }

  #renderH1(...children: (string | Node)[]) {
    const h1 = document.createElement("h1");
    h1.classList.add(
      ...classNameToArray(
        twMerge(
          "mb-3 flex justify-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white",
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

  #renderDivider(...children: (string | Node)[]) {
    const divider = document.createElement("div");
    divider.classList.add(
      ...classNameToArray(
        twMerge(
          "mx-3 flex items-center text-3xl text-blue-600 dark:text-blue-500",
        ),
      ),
    );
    divider.append(...children);

    return divider;
  }

  #renderPlayersList(...children: (string | Node)[]) {
    const ul = document.createElement("ul");
    ul.classList.add(...classNameToArray(twMerge("mx-auto mt-6 flex w-5/6")));
    ul.append(...children);

    return ul;
  }

  async #renderMain(...children: (string | Node)[]) {
    const main = document.createElement("main");
    main.classList.add(...classNameToArray(twMerge("flex flex-col")));
    main.append(...children);

    return main;
  }
}

export default GameInfo;
