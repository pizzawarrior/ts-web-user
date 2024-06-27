import axios, { AxiosResponse } from 'axios';
import { User, UserProps } from "./User";
import { Events } from "./Events";

export class Collection {
    models: User[] = [];
    events: Events = new Events();

    constructor(public rootUrl: string) {}

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    fetch(): void {
        axios.get(this.rootUrl)
            .then((response: AxiosResponse) => {
                response.data.forEach((value: UserProps) => {
                    const user = User.createUser(value);
                    this.models.push(user);
                });
            this.trigger('change');
            })
    }
}
