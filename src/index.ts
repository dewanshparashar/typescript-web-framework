import { User } from "./models/User";

const user = User.buildUser({});

user.on("change", () => console.log("User has been updated!"));

Object.assign(window, { user: user });
