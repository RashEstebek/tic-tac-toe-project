import User from "./User.ts";

class HufflepuffUser extends User {
    constructor() {
        super("Hufflepuff", "/public/hufflepuff.webp");
    }
}

export default HufflepuffUser;
