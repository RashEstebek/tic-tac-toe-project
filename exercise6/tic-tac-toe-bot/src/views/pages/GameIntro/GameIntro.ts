import Page from "../../Page.ts";
import { getGameInd, QUERY_GAME_IND } from "../../../utils/queryGameIndex.ts";
import { Router } from "../../../routes.ts";
import Tournament from "../../../model/Tournament.ts";
import { QUERY_ROUND_IND } from "../../../utils/queryRoundIndex.ts";
import GameInfo from "../../components/GameInfo";

type Props = {
  router: Router;
};

class GameIntro implements Page {
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
    });
  }

  async cleanup() {
    await this.#gameInfoComponent?.cleanup();
  }

  #onProgressAnimationEnd(router: Router, gameInd: number) {
    if (gameInd < this.tournament.games.length) {
      this.tournament.games[gameInd].start();

      router.push(
        "/round",
        `${QUERY_GAME_IND}=${gameInd}&${QUERY_ROUND_IND}=0`,
      );
    }
  }
}

export default GameIntro;
