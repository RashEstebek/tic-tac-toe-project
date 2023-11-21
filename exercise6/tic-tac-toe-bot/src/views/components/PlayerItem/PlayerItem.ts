import { twMerge } from "tailwind-merge";
import Component from "../../../types/Component.ts";
import Player from "../../../model/Player.ts";
import classNameToArray from "../../../utils/classNameToArray.ts";

type Props = {
  player: Player;
  playerScore?: number;
};

class PlayerItem implements Component {
  async render({ player, playerScore }: Props) {
    const nodes: (string | Node)[] = [];

    if (typeof playerScore !== "undefined") {
      const scoreInfo = this.#renderScore(playerScore);
      nodes.push(scoreInfo);
    }
    const playerImage = this.#renderPlayerImage(player.name, player.avatarUrl);
    const figure = this.#renderFigure(playerImage);
    nodes.push(figure);
    const figcaption = this.#renderFigcaption(player.name);
    nodes.push(figcaption);

    return this.#renderPlayer(...nodes);
  }

  #renderScore(score: number) {
    const h3 = document.createElement("h3");
    h3.classList.add(
      ...classNameToArray(
        twMerge("mb-3 text-center text-4xl text-gray-500 dark:text-gray-400"),
      ),
    );
    h3.append(score.toString());

    return h3;
  }

  #renderPlayerImage(title: string, src: string) {
    const img = document.createElement("img");
    img.alt = title;
    img.src = src;
    img.classList.add("rounded-lg");

    return img;
  }

  #renderFigure(...children: (string | Node)[]) {
    const figure = document.createElement("figure");
    figure.append(...children);

    return figure;
  }

  #renderFigcaption(...children: (string | Node)[]) {
    const figcaption = document.createElement("figcaption");
    figcaption.classList.add(
      ...classNameToArray(
        twMerge("mt-2 text-center text-base text-gray-500 dark:text-gray-400"),
      ),
    );
    figcaption.append(...children);

    return figcaption;
  }

  #renderPlayer(...children: (string | Node)[]) {
    const li = document.createElement("li");
    li.append(...children);

    return li;
  }
}

export default PlayerItem;
