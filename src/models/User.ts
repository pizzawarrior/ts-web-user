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
    }
}
