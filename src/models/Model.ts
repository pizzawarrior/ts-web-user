import { AxiosPromise, AxiosResponse } from 'axios';
import { HasId } from './HasId';

export interface ModelAttributes<T> {
    getProperty<K extends keyof T>(key: K): T[K]
    getAllProperties(): T
    setProperty(value: T): void
}

export interface Events {
    on(eventName: string, callback: () => void): void;
    trigger(eventName: string): void;
}

export interface Sync<T> {
    save(data: T): AxiosPromise;
    fetch(id: number): AxiosPromise;
    delete(id: number): void;
}

export class Model<T extends HasId> {
    constructor(
        private attributes: ModelAttributes<T>,
        private events: Events,
        private sync: Sync<T>
    ) {};

    get on() {
        return this.events.on;
    };

    get trigger() {
        return this.events.trigger;
    };

    get getProperty() {
        return this.attributes.getProperty;
    };

    setProperty(updateProperty: T): void {
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
