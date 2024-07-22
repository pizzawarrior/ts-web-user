import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserShow extends View<User, UserProps> {
    template(): string {
        return `
        <div>
            <h1>User Details</h1>
            <p>name: ${this.model.getProperty('name')}</p>
            <p>age: ${this.model.getProperty('age')}</p>
        </div>
        `
    }
}
