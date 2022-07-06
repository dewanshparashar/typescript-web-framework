import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
  set(update: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;

  trigger = this.events.trigger;

  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch(): void {
    const id = this.get("id");

    if (typeof id !== "number") {
      throw new Error("Cannot fetch without an id!");
    }

    this.sync
      .fetch(id)
      .then((result: AxiosResponse<T>): void => {
        this.set(result.data);
      })
      .catch(() => {
        this.events.trigger("error");
      });
  }

  save(): void {
    const data = this.attributes.getAll();

    this.sync
      .save(data)
      .then((_: AxiosResponse): void => {
        console.log("Updated the details in the db");
        this.events.trigger("save");
      })
      .catch(() => {
        this.events.trigger("error");
      });
  }
}
