import User from "./User.ts";

class RavenclawUser extends User {
    constructor() {
        super("Ravenclaw", "/public/ravenclaw.webp");
    }
}

export default RavenclawUser;
