import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

export interface UserProps {
  id?: number; // if user has id then it has a server saved representation
  name?: string;
  age?: number;
}

const ROOT_URL = "http://localhost:3000/users";

export class User {
  events: Eventing = new Eventing();
  sync: Sync<UserProps> = new Sync<UserProps>(ROOT_URL);
  attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes(attrs);
  }
}
