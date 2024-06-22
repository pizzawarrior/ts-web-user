import axios, { AxiosResponse } from 'axios'

interface UserProps {
    name?: string;
    age?: number;
    id?: number;
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

    fetch(): void {
        axios.get(`http://localhost:3000/users/${this.get('id')}`)
        .then((response: AxiosResponse): void => {
            this.set(response.data);
        })
    };

    save(): void {
        // if user.id then make a put request, else make a post request
        const id = this.get('id');

        if (id) {
            axios.put(`http://localhost:3000/users/${id}`, this.data)
        } else {
            axios.post('http://localhost:3000/users', this.data);
        }
    };

    delete(): void {
        const id = this.get('id');

        axios.delete(`http://localhost:3000/users/${id}`)
            .then(response => {
                console.log( `User ${id} deleted successfully`, response.data);
            })
            .catch(error => {
                console.error(`Error deleting user_id: ${id}, this user does not exist.`);
            })
    };
}
