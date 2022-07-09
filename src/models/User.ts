import { Model } from "./Model";

import { ApiSync } from "./ApiSync";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Collection } from "./Collection";

export interface UserProps {
  id?: number; // if user has id then it has a server saved representation
  name?: string;
  age?: number;
}

const ROOT_URL = "http://localhost:3000/users";

export class User extends Model<UserProps> {
  //static method
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(ROOT_URL)
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(ROOT_URL, User.buildUser);
  }
}
