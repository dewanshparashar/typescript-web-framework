// import { User, UserProps } from "./models/User";

import { User } from "./models/User";
import { UserForm } from "./views/UserForm";
import { UserShow } from "./views/UserShow";
// Object.assign(window, { collection: collection });

// 1. each view must produce HTML
// 2. we should be able to nest one view HTML in another
// 3. We need to have a good way to handle user events
// 4. there will be a tight coupling between model and view
// 5. we need to be able to reach html produced by a view and get a specific element

const rootElement = document.getElementById("root");
if (rootElement) {
  const user = User.buildUser({ name: "Dewans", age: 20 });
  const userForm = new UserForm(rootElement, user);
  userForm.render();
} else {
  throw new Error("Root element not found!");
}
