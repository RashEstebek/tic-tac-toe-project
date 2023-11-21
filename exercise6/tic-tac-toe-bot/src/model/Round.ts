import Piece from "../types/Piece.ts";
import Game from "./Game.ts";
import Player from "./Player";

const ROW = 3;
const COL = 3;

class Round {
  readonly board: Piece[];
  currentPlayer: Player;
  readonly player1Piece: Piece;
  readonly player2Piece: Piece;
  readonly #game: Game;
  #winner: Player | null | undefined;

  constructor(
    game: Game,
    player1Piece: Piece,
    player2Piece: Piece,
    isFirstPlayerStarts: boolean,
  ) {
    this.#game = game;
    this.player1Piece = player1Piece;
    this.player2Piece = player2Piece;
    this.currentPlayer = isFirstPlayerStarts ? game.player1 : game.player2;
    this.#winner = undefined;
    this.board = new Array(COL * ROW).fill("");
  }

  get winner() {
    return this.#winner;
  }

  move(cellInd: number) {
    const winner = this.#judge(cellInd);
    if (typeof winner === "undefined") {
      this.#togglePlayer();
    } else {
      this.#winner = winner;
      this.#game.updateScore(winner);
    }
  }

  getCurrentPiece() {
    return this.currentPlayer === this.#game.player1
      ? this.player1Piece
      : this.player2Piece;
  }

  #togglePlayer() {
    this.currentPlayer =
      this.currentPlayer === this.#game.player1
        ? this.#game.player2
        : this.#game.player1;
  }

  #judge(ind: number) {
    if (this.board[ind]) {
      window.confirm(
        `Selected cell(#${ind}) is already filled with piece ${this.board[ind]}. Sorry but you lost the round.`,
      );
      return this.currentPlayer === this.#game.player1
        ? this.#game.player2
        : this.#game.player1;
    }

    const piece = this.getCurrentPiece();
    this.board[ind] = piece;

    const firstInRowInd = Math.floor(ind / COL) * COL;
    const firstInColInd = ind % COL;
    const win =
      // row
      this.#assess(piece, firstInRowInd, COL, 1) ||
      // col
      this.#assess(piece, firstInColInd, ROW, COL) ||
      // diagonal 1
      this.#assess(piece, 0, COL, ROW + 1) ||
      // diagonal 2
      this.#assess(piece, ROW - 1, COL, ROW - 1);
    if (win) {
      return this.currentPlayer;
    }

    const draw = !new Set(this.board).has("");
    if (draw) {
      return null;
    }

    return undefined;
  }

  #assess(piece: Piece, firstInd: number, total: number, step: number) {
    let i = firstInd;

    for (let counter = 0; counter < total; counter++) {
      if (this.board[i] !== piece) {
        return false;
      }
      i += step;
    }

    return true;
  }
}

export default Round;
