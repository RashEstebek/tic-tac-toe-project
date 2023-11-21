import Component from "../../../types/Component.ts";
import Cell from "../Cell";
import Piece from "../../../types/Piece.ts";
import classNameToArray from "../../../utils/classNameToArray.ts";
import { twMerge } from "tailwind-merge";

type Props = {
  board: Piece[];
};

class Playarea implements Component {
  readonly #cellComponent: Cell;

  constructor() {
    this.#cellComponent = new Cell();
  }

  async render({ board }: Props) {
    return this.#renderPlayBoard(board);
  }

  async #renderPlayBoard(board: Piece[]) {
    const cells = await Promise.all(
      board.map(async (piece, ind) => {
        const cell = await this.#cellComponent.render({ piece, active: true });
        if (!piece) {
          cell.classList.add("cursor-pointer");
          cell.setAttribute("data-cell", ind.toString());
        }

        return cell;
      }),
    );

    const ul = document.createElement("ul");
    ul.classList.add(
      ...classNameToArray(
        twMerge(
          "grid aspect-square grid-cols-[repeat(3,max-content)] content-center justify-center gap-2",
        ),
      ),
    );
    ul.append(...cells);

    return ul;
  }
}

export default Playarea;
