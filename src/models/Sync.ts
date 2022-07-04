import axios, { AxiosPromise } from "axios";

type HasId = { id?: number };

export class Sync<T extends HasId> {
  constructor(public rootUrl: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;

    if (id) {
      // update the existing user
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      // add a new user
      return axios.post(this.rootUrl, data);
    }
  }
}
