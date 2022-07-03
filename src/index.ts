import { User } from "./models/User";

const user = new User({ name: "Hola", age: 20 });

console.log(user.get("name"));
console.log(user.get("age"));
user.set({ name: "Diego" });

console.log(user.get("name"));
console.log(user.get("age"));

user.on("click", () => {
  window.alert("Yayyyyy");
});

console.log(user.events);
