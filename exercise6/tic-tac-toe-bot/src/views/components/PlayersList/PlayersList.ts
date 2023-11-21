import Component from "../../../types/Component.ts";
import Player from "../../../model/Player.ts";
import PlayerItem from "../PlayerItem";

type Props = {
  players: Player[];
};

class PlayersList implements Component {
  readonly #playerItemComponent: Component;

  constructor() {
    this.#playerItemComponent = new PlayerItem();
  }

  async render({ players }: Props) {
    const playersEls = await this.#renderPlayers(players);
    return this.#renderContainer(...playersEls);
  }

  async cleanup() {
    await this.#playerItemComponent?.cleanup?.();
  }

  async #renderPlayers(players: Player[]) {
    const childrenPromise = players.map((player) =>
      this.#playerItemComponent.render({ player }),
    );

    return await Promise.all(childrenPromise);
  }

  async #renderContainer(...children: (string | Node)[]) {
    const ul = document.createElement("ul");
    ul.append(...children);

    return ul;
  }
}

export default PlayersList;
