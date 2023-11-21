class Player {
  readonly #name: string;
  readonly #avatarUrl: string;

  constructor(name: string, avatarUrl: string) {
    this.#name = name;
    this.#avatarUrl = avatarUrl;
  }

  get name() {
    return this.#name;
  }

  get avatarUrl() {
    return this.#avatarUrl;
  }
}

export default Player;
