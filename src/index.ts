// import { User, UserProps } from "./models/User";

import { User } from "./user/User";
import { UserEdit } from "./user/UserEdit";
import { UserList } from "./user/UserList";
// Object.assign(window, { collection: collection });

// 1. each view must produce HTML
// 2. we should be able to nest one view HTML in another
// 3. We need to have a good way to handle user events
// 4. there will be a tight coupling between model and view
// 5. we need to be able to reach html produced by a view and get a specific element

const rootElement = document.getElementById("root");
if (rootElement) {
  const userCollection = User.buildUserCollection();

  const userList = new UserList(rootElement, userCollection);
  userList.render();

  console.log(userList);
} else {
  throw new Error("Root element not found!");
}
