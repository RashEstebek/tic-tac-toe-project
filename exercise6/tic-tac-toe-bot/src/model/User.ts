import Player from "./Player";

class User extends Player {
  constructor(name: string, avatarUrl: string) {
    super(name, avatarUrl);
  }
}

export default User;
