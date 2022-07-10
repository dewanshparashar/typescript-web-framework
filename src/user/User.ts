import { Model } from "../core/models/Model";

import { ApiSync } from "../core/models/ApiSync";
import { Attributes } from "../core/models/Attributes";
import { Eventing } from "../core/models/Eventing";
import { Collection } from "../core/models/Collection";

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

  setRandomAge = () => {
    const newAge = Math.floor(Math.random() * 100);
    this.set({ age: newAge });
  };
}
