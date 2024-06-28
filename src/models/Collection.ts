import axios, { AxiosResponse } from 'axios';
import { Events } from "./Events";

export class Collection<T, K> {
    models: T[] = [];
    events: Events = new Events();

    constructor(
        public rootUrl: string,
        // pass in a function that will parse the json data returned from api call
        public deserialize: (jsonData: K) => T
    ) {}

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    fetch(): void {
        axios.get(this.rootUrl)
            .then((response: AxiosResponse) => {
                response.data.forEach((value: K) => {
                    // push each data entry, K, into the models array
                    this.models.push(this.deserialize(value));
                });
            this.trigger('change');
            })
    }
}
