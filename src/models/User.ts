import { Attributes } from './Attributes';
import { Model } from './Model';
import { Events } from './Events';
import { ApiSync } from './ApiSync';

export interface UserProps {
    name?: string;
    age?: number;
    id?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {

    static createNewUser(attrs: UserProps): User {
        return new User(
            new Attributes<UserProps>(attrs),
            new Events(),
            new ApiSync<UserProps>(rootUrl))
    }

}
