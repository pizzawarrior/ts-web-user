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

    get getProperty() {
        return this.attributes.getProperty;
    };

    setProperty(updateProperty: UserProps): void {
        this.attributes.setProperty(updateProperty);
        this.events.trigger('change');
    };

    fetch(): void {
        const id = this.attributes.getProperty('id');
        if (typeof id !== 'number') {
            throw new Error('Cannot fetch a user without a valid id');
        }
        this.sync.fetch(id)
            .then((response: AxiosResponse): void => {
                // we use this.set so we can access the this.events.trigger() method for the User class, not the Attributes version
                this.setProperty(response.data)
            });
    }

    save():void {
        this.sync.save(this.attributes.getAllProperties())
            .then((response: AxiosResponse): void => {
                this.trigger('save')
            }
        )
        .catch(() => {
            this.trigger('error');
        })
    }

    delete(): void {
        const id = this.attributes.getProperty('id');
        if (typeof id !== 'number') {
            throw new Error('Cannot delete a user without a valid id');
        }
        this.sync.delete(id);
    }
}
