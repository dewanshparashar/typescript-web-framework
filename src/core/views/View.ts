import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K> {
  abstract template(): string;

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  // 1. Call regionsMap for the list of regions that need to be created
  // 2. Render method populates the values in 'regions'
  // 3. We insert a new 'child' views into those regions

  regions: { [key: string]: Element } = {};
  regionsMap(): { [key: string]: string } {
    return {};
  }
  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    for (let key in regionsMap) {
      const selector = regionsMap[key];

      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
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

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content); // document fragment (html element in memory before dom insertion)
  }
}
