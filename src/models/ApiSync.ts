import axios, { AxiosPromise } from 'axios'
import { HasId } from './HasId';

export class ApiSync<T extends HasId> {

    constructor(public rootUrl: string) {}

    save(data: T): AxiosPromise {
        const { id } = data;

        // if user.id then make a put request, else make a post request
        if (id) {
           return axios.put(`${this.rootUrl}/${id}`, data)
        } else {
           return axios.post(this.rootUrl, data);
        }
    };

    fetch(id: number): AxiosPromise {
        return axios.get(`${this.rootUrl}/${id}`)
    };

    delete(id: number): void {
        axios.delete(`${this.rootUrl}/${id}`)
            .then(response => {
                console.log( `User ${id} deleted successfully`, response.data);
            })
            .catch(error => {
                console.error(`Error deleting user_id: ${id}, this user does not exist.`);
            })
    };
}
