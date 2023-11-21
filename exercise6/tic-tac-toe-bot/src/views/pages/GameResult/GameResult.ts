import Page from "../../Page.ts";
import Tournament from "../../../model/Tournament.ts";
import { Router } from "../../../routes.ts";
import { getGameInd, QUERY_GAME_IND } from "../../../utils/queryGameIndex.ts";
import GameInfo from "../../components/GameInfo";

type Props = {
  router: Router;
};

class GameResult implements Page {
  readonly tournament: Tournament;
  readonly #gameInfoComponent: GameInfo;

  constructor(tournament: Tournament) {
    this.tournament = tournament;
    this.#gameInfoComponent = new GameInfo();
  }

  async render({ router }: Props) {
    if (this.tournament.games.length <= 0) {
      router.push("/");
    }

    const gameIndex = getGameInd();
    const game = this.tournament.games[gameIndex];

    return this.#gameInfoComponent.render({
      onProgressAnimationEnd: () =>
        this.#onProgressAnimationEnd(router, gameIndex),
      player1: game.player1,
      player2: game.player2,
      gameIndex,
      score: game.score,
    });
  }

  async cleanup() {
    await this.#gameInfoComponent?.cleanup();
  }

  #onProgressAnimationEnd(router: Router, gameInd: number) {
    if (gameInd + 1 < this.tournament.games.length) {
      router.push("/game", `${QUERY_GAME_IND}=${gameInd + 1}`);
    } else {
      router.push("/result");
    }
  }
}

export default GameResult;
