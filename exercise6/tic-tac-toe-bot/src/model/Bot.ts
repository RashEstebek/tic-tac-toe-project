import Player from "./Player";
import Piece from "../types/Piece.ts";

class Bot extends Player {
  constructor(name: string, avatarUrl: string) {
    super(name, avatarUrl);
  }

  move(board: Piece[], ownPiece: Piece) {
    console.log(board, ownPiece);
    return 0;
  }
}

export default Bot;
