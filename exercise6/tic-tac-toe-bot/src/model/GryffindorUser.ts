import User from "./User.ts";

class GryffindorUser extends User {
    constructor() {
        super("Gryffindor", "/public/gryffindor.webp");
    }
}

export default GryffindorUser;
