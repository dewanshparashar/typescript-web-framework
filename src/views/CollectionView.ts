import { Collection } from "../models/Collection";

export abstract class CollectionView<T, K> {
  // provide a model and item parent for collection, render it

  abstract renderItem(model: T): string;

  constructor(
    public parent: Element,
    public collectionModel: Collection<T, K>
  ) {
    this.bindModel();

    this.collectionModel.fetch();
  }

  bindModel(): void {
    this.collectionModel.on("change", () => {
      this.render();
    });
  }

  render = (): void => {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");

    templateElement.innerHTML = this.collectionModel.models
      .map((model: T) => this.renderItem(model))
      .join("");

    this.parent.append(templateElement.content); // document fragment (html element in memory before dom insertion)
  };
}
