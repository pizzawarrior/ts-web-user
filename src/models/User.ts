interface UserProps {
    name?: string;
    age?: number;
}

// type alias returns a function
type Callback = () => void;

export class User {

    events: { [key: string]: Callback[] } = {};

    constructor(private data: UserProps) {};

    get(propName: string): (number | string) {
        return this.data[propName];
    }

    set(updateProperty: UserProps): void {
        Object.assign(this.data, updateProperty);
    }

    on(eventName: string, callback: Callback): void {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }

    trigger(eventName: string): void {
        const handlers = this.events[eventName];
        if (!handlers || handlers.length === 0) {
            return;
        }
        handlers.forEach(callback => {
            callback();
        })
    }

    // fetch(): Promise {};

    // save(): Promise {};
 }
