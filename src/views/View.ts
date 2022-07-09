import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K> {
  abstract template(): string;

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
  }

  bindEvents(fragment: DocumentFragment): void {
    const events = this.eventsMap();

    Object.keys(events).forEach((key: string) => {
      const [eventName, selector] = key.split(":");

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, events[key]);
      });
    });
  }

  render(): void {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content); // document fragment (html element in memory before dom insertion)
  }
}
