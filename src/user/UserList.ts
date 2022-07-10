import { User, UserProps } from "./User";
import { CollectionView } from "../core/views/CollectionView";

export class UserList extends CollectionView<User, UserProps> {
  renderItem(user: User): string {
    return `<div>
                <div>ID is ${user.get("id")}</div>
                <div>User Name is ${user.get("name")}</div>
                <div>User Age is ${user.get("age")}</div>
                <hr />
            </div>`;
  }
}
