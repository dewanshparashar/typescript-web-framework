import { User } from "./models/User";

const user = new User({ id: 1 });

Object.assign(window, { User: User });
