import { twMerge } from "tailwind-merge";
import Page from "../../Page.ts";
import Piece from "../../../types/Piece.ts";
import wait from "../../../utils/wait.ts";
import { getGameInd, QUERY_GAME_IND } from "../../../utils/queryGameIndex.ts";
import {
  getRoundInd,
  QUERY_ROUND_IND,
} from "../../../utils/queryRoundIndex.ts";
import classNameToArray from "../../../utils/classNameToArray.ts";
import { Router } from "../../../routes.ts";
import Tournament from "../../../model/Tournament.ts";
import Player from "../../../model/Player.ts";
import Round from "../../../model/Round.ts";
import Bot from "../../../model/Bot.ts";
import User from "../../../model/User.ts";
import PageContainer from "../../components/PageContainer";
import PlayerInfo from "../../components/PlayerInfo";
import Playarea from "../../components/Playarea";
import Game from "../../../model/Game.ts";

type Props = {
  router: Router;
};

class Playboard implements Page {
  readonly tournament: Tournament;
  abortCtrl: AbortController | undefined;
  readonly #pageContainerComponent: PageContainer;
  readonly #playerInfoComponent: PlayerInfo;
  readonly #playareaComponent: Playarea;

  constructor(tournament: Tournament) {
    this.tournament = tournament;
    this.#pageContainerComponent = new PageContainer();
    this.#playerInfoComponent = new PlayerInfo();
    this.#playareaComponent = new Playarea();
  }

  async render({ router }: Props) {
    if (this.tournament.games.length <= 0) {
      router.push("/");
    }

    const game = this.#getGame();
    const round = this.#getRound(game);

    const player1Info = await this.#renderPlayerInfo(
      game.player1,
      game.score[0],
      round.player1Piece,
      game.player1 === round.currentPlayer,
    );
    const player1Container = this.#renderPlayerContainer(player1Info);
    const playarea = await this.#playareaComponent.render({
      board: round.board,
    });
    const player2Info = await this.#renderPlayerInfo(
      game.player2,
      game.score[1],
      round.player2Piece,
      game.player2 === round.currentPlayer,
    );
    const player2Container = this.#renderPlayerContainer(player2Info);
    const main = await this.#renderMain(
      player1Container,
      playarea,
      player2Container,
    );

    this.listenEvents(playarea, router, round);

    return this.#pageContainerComponent.render({
      children: main,
    });
  }

  async cleanup() {
    this.abortCtrl?.abort();
  }

  listenEvents(playarea: HTMLUListElement, router: Router, round: Round) {
    this.abortCtrl = new AbortController();
    const signal = this.abortCtrl.signal;

    if (round.currentPlayer instanceof Bot) {
      this.#handleBotMove(round.currentPlayer, round, router);
    } else if (round.currentPlayer instanceof User) {
      playarea.addEventListener(
        "click",
        (ev: MouseEvent) => this.#handleUserClick(ev, router),
        {
          signal,
        },
      );
    }
  }

  async #renderPlayerInfo(
    player: Player,
    score: number,
    piece: Piece,
    active: boolean,
  ) {
    return this.#playerInfoComponent.render({
      player,
      score,
      piece,
      active,
    });
  }

  #renderPlayerContainer(...children: (string | Node)[]) {
    const aside = document.createElement("aside");
    aside.append(...children);

    return aside;
  }

  async #renderMain(...children: (string | Node)[]) {
    const main = document.createElement("main");
    main.classList.add(
      ...classNameToArray(
        twMerge(
          "mt-3 grid w-full grid-cols-[1fr_max-content_1fr] items-center gap-[2rem]",
        ),
      ),
    );
    main.append(...children);

    return main;
  }

  #getGame() {
    const gameIndex = getGameInd();
    return this.tournament.games[gameIndex];
  }

  #getRound(game: Game) {
    const roundIndex = getRoundInd();
    return game.rounds[roundIndex];
  }

  async #handleBotMove(bot: Bot, round: Round, router: Router) {
    await wait(500);
    const cellInd = bot.move(round.board, round.getCurrentPiece());
    this.#handleMoveResult(router, cellInd);
  }

  #handleUserClick = (ev: MouseEvent, router: Router) => {
    const { target } = ev;

    if (target instanceof HTMLElement && target.dataset.cell) {
      const cellInd = Number(target.dataset.cell);
      this.#handleMoveResult(router, cellInd);
    }
  };

  async #handleMoveResult(router: Router, cellInd: number) {
    const gameIndex = getGameInd();
    const roundIndex = getRoundInd();
    const game = this.#getGame();
    const round = this.#getRound(game);
    round.move(cellInd);

    if (typeof round.winner === "undefined") {
      router.push("/round", window.location.search);
    } else if (roundIndex + 1 < game.rounds.length) {
      await wait(500);
      router.push(
        "/round",
        `${QUERY_GAME_IND}=${gameIndex}&${QUERY_ROUND_IND}=${roundIndex + 1}`,
      );
    } else {
      await wait(500);
      router.push("/game/result", `${QUERY_GAME_IND}=${gameIndex}`);
    }
  }
}

export default Playboard;
