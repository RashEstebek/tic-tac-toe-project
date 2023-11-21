import { twMerge } from "tailwind-merge";
import classNameToArray from "../../../utils/classNameToArray.ts";
import Component from "../../../types/Component.ts";
import Piece from "../../../types/Piece.ts";

type Props = {
  piece: Piece;
  active: boolean;
};

class Cell implements Component {
  abortCtrl: AbortController | undefined;

  async render({ piece, active }: Props) {
    return this.#renderCell(piece, active);
  }

  async cleanup() {
    this.abortCtrl?.abort();
  }
  
  #renderCell(piece: Piece, active: boolean) {
    const div = document.createElement("div");
    div.classList.add(
      ...classNameToArray(
        twMerge(
          "text-neutral-content flex aspect-square h-20 items-center justify-center self-center rounded-2xl border font-['Hugmate'] text-4xl focus:outline-none focus:ring-4",
          piece === "o" &&
            !active &&
            "border-purple-700 text-purple-700 hover:bg-purple-800 hover:text-white focus:ring-purple-300 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-500 dark:hover:text-white dark:focus:ring-purple-900",
          piece === "o" &&
            active &&
            "bg-purple-700 text-white hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900",
          piece === "x" &&
            !active &&
            "border-yellow-400 text-yellow-400 hover:bg-yellow-500 hover:text-white focus:ring-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:bg-yellow-400 dark:hover:text-white dark:focus:ring-yellow-900",
          piece === "x" &&
            active &&
            "bg-yellow-400 text-white hover:bg-yellow-500 focus:ring-yellow-300 dark:focus:ring-yellow-900",
          piece === "" &&
            !active &&
            "border-blue-700 text-blue-700 hover:bg-blue-800 hover:text-white focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800",
          piece === "" &&
            active &&
            "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
        ),
      ),
    );
    div.append(piece);

    return div;
  }
}

export default Cell;
