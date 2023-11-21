import { twMerge } from "tailwind-merge";
import classNameToArray from "../../../utils/classNameToArray.ts";
import Component from "../../../types/Component.ts";

type Props = {
  onAnimationEnd: (ev: AnimationEvent) => void;
};

class ProgressCircle implements Component {
  abortCtrl: AbortController | undefined;

  async render({ onAnimationEnd }: Props) {
    const circle = this.#renderSvgCircle();
    const svg = this.#renderProgressSvg(circle);
    const progress = this.#renderProgressContainer(svg);

    this.listenEvents(circle, onAnimationEnd);

    return progress;
  }

  async cleanup() {
    this.abortCtrl?.abort();
  }

  listenEvents(
    circle: SVGCircleElement,
    onAnimationEnd: (ev: AnimationEvent) => void,
  ) {
    this.abortCtrl = new AbortController();
    const signal = this.abortCtrl.signal;

    circle.addEventListener("animationend", onAnimationEnd, { signal });
  }

  #renderSvgCircle() {
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    ) as unknown as SVGCircleElement;
    circle.setAttribute("cx", "60");
    circle.setAttribute("cy", "60");
    circle.setAttribute("r", "55");
    circle.setAttribute("stroke-width", "10");

    circle.classList.add(
      ...classNameToArray(
        twMerge(
          "animate-[progress_1.5s_ease-in-out_forwards] fill-none stroke-blue-600 [stroke-dasharray:500_500] [stroke-dashoffset:500] [stroke-linecap:round] [stroke-width:10]",
        ),
      ),
    );

    return circle;
  }

  #renderProgressSvg(...children: (string | Node)[]) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 120 120");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.append(...children);

    return svg;
  }

  #renderProgressContainer(...children: (string | Node)[]) {
    const div = document.createElement("div");
    div.append(...children);

    return div;
  }
}

export default ProgressCircle;
