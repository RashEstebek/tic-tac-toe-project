import { signal } from "../utils/abortSignal";
import pushState from "./pushState";

export default function link(href: string) {
  const a = document.createElement("a");
  a.href = href;
  a.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      pushState({ href }, "", href);
    },
    { signal },
  );

  return a;
}
