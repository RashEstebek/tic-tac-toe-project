import User from "./User.ts";

class SlytherinUser extends User {
    constructor() {
        super("Slytherin", "/public/slytherin.webp");
    }
}

export default SlytherinUser;
