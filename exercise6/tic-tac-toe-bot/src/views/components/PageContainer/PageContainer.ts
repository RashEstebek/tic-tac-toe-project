import { twMerge } from "tailwind-merge";
import Component from "../../../types/Component.ts";
import classNameToArray from "../../../utils/classNameToArray.ts";

type Props = {
  children: HTMLElement | HTMLElement[];
};

class PageContainer implements Component {
  async render({ children }: Props) {
    return Array.isArray(children)
      ? this.#renderContainer(...children)
      : this.#renderContainer(children);
  }

  #renderContainer(...children: (string | Node)[]) {
    const div = document.createElement("div");
    div.classList.add(
      ...classNameToArray(
        twMerge(
          "relative my-14 block w-1/2 rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800",
        ),
      ),
    );
    div.append(...children);

    return div;
  }
}

export default PageContainer;
