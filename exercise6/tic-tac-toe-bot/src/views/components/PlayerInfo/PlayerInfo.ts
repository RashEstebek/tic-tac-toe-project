import { twMerge } from "tailwind-merge";
import classNameToArray from "../../../utils/classNameToArray.ts";
import Component from "../../../types/Component.ts";
import Player from "../../../model/Player.ts";
import Cell from "../Cell";
import Piece from "../../../types/Piece.ts";

type Props = {
  score: number;
  player: Player;
  piece: Piece;
  active: boolean;
};

class PlayerInfo implements Component {
  readonly #cellComponent: Cell;

  constructor() {
    this.#cellComponent = new Cell();
  }

  async render({ score, player, piece, active }: Props) {
    const scoreContainer = this.#renderScore(score);
    const playerImage = this.#renderPlayerImage(player.name, player.avatarUrl);
    const figure = this.#renderFigure(playerImage);
    const figcaption = this.#renderFigcaption(player.name);
    const avatar = this.#renderAvatar(figure, figcaption);
    const playerPiece = await this.#renderPlayerPiece(piece, active);

    return this.#renderPlayer(scoreContainer, avatar, playerPiece);
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

  #renderAvatar(...children: (string | Node)[]) {
    const avatar = document.createElement("div");
    avatar.append(...children);

    return avatar;
  }

  #renderPlayer(...children: (string | Node)[]) {
    const div = document.createElement("div");
    div.classList.add(...classNameToArray(twMerge("flex", "flex-col")));
    div.append(...children);

    return div;
  }

  async #renderPlayerPiece(piece: Piece, active: boolean) {
    const playerPiece = await this.#cellComponent.render({ piece, active });
    playerPiece.classList.add("mt-3");

    return playerPiece;
  }
}

export default PlayerInfo;
