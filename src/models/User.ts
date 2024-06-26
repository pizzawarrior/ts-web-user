import { AxiosResponse } from 'axios';
import { Attributes } from './Attributes';
import { Events } from './Events';
import { Sync } from './Sync';

export interface UserProps {
    name?: string;
    age?: number;
    id?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
    public events: Events = new Events();
    public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
    public attributes: Attributes<UserProps>

    constructor(attrs: UserProps) {
        this.attributes = new Attributes<UserProps>(attrs);
    }

    get on() {
        return this.events.on;
    };

    get trigger() {
        return this.events.trigger;
    };

    get get() {
        return this.attributes.get;
    };

    set(updateProperty: UserProps): void {
        this.attributes.set(updateProperty);
        this.events.trigger('change');
    };

    fetch(): void {
        const id = this.attributes.get('id');
        if (typeof id !== 'number') {
            throw new Error('Cannot fetch a user without a valid id');
        }
        this.sync.fetch(id)
            .then((response: AxiosResponse): void => {
                // we use this.set so we can access the this.events.trigger() method for the User class, not the Attributes version
                this.set(response.data)
            });
    }

    delete(): void {
        const id = this.attributes.get('id');
        if (typeof id !== 'number') {
            throw new Error('Cannot delete a user without a valid id');
        }
        this.sync.delete(id);
    }
}
