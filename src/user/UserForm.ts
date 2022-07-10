import { User, UserProps } from "./User";
import { View } from "../core/views/View";

export class UserForm extends View<User, UserProps> {
  onUpdateNameClick = (): void => {
    const inputValue = (
      document.getElementById("nameInput") as HTMLInputElement
    ).value;

    this.model.set({ name: inputValue });
    console.log("Update name button was clicked uyayyy");
  };

  onUpdateAgeClick = (): void => {
    const newAge = Math.floor(Math.random() * 100);
    this.model.setRandomAge();
  };

  onSaveUserClick = (): void => {
    this.model.save();
  };

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:#updateName": this.onUpdateNameClick,
      "click:#updateAge": this.onUpdateAgeClick,
      "click:#saveUser": this.onSaveUserClick,
    };
  }

  template(): string {
    return `<div>
                <h1>User Form</h1>             
                <input id="nameInput" placeholder="${this.model.get("name")}" />
                <button id="updateName">Update user name</button>
                <button id="updateAge">Set Random age</button>
                <br />
                <br />
                <button id="saveUser">Save in Database</button>
            </div>
    `;
  }
}
