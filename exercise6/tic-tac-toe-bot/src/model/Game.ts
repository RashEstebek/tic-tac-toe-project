import Player from "./Player";
import Round from "./Round";
import Piece from "../types/Piece.ts";

class Game {
  readonly player1: Player;
  readonly player2: Player;
  readonly rounds: Round[];
  score: [number, number];
  readonly #numRounds: number;

  constructor(player1: Player, player2: Player, numRounds: number) {
    this.player1 = player1;
    this.player2 = player2;
    this.#numRounds = numRounds;
    this.score = [0, 0];
    this.rounds = [];
  }

  start() {
    for (let i = 0; i < this.#numRounds; i++) {
      const [player1Piece, player2Piece]: [Piece, Piece] =
        Math.floor(i / 2) % 2 === 0 ? ["x", "o"] : ["o", "x"];

      const round = new Round(this, player1Piece, player2Piece, i % 2 === 0);

      this.rounds.push(round);
    }
  }

  updateScore(winner: Player | null) {
    switch (winner) {
      case this.player1:
        this.score[0]++;
        break;
      case this.player2:
        this.score[1]++;
        break;
    }
  }
}

export default Game;
