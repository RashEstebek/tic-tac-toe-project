import Bot from "./Bot.ts";
import Round from "./Round.ts";

class MyBot extends Bot {
  constructor(name: string, avatarUrl: string) {
    super(name, avatarUrl);
  }

  doMove(round: Round) {
    const availableMoves = round.board.reduce((acc, piece, index) => {
      if (piece === "") {
        acc.push(index);
      }
      return acc;
    }, [] as number[]);

    if (availableMoves.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const selectedMove = availableMoves[randomIndex];

    round.move(selectedMove);
  }
}

export default MyBot;
