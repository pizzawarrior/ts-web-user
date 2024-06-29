import { Attributes } from './Attributes';
import { Model } from './Model';
import { Events } from './Events';
import { ApiSync } from './ApiSync';
import { Collection } from './Collection';

export interface UserProps {
    name?: string;
    age?: number;
    id?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {

    static createUser(attrs: UserProps): User {
        return new User(
            new Attributes<UserProps>(attrs),
            new Events(),
            new ApiSync<UserProps>(rootUrl))
    };

    static createCollection(): Collection<User, UserProps> {
        return new Collection(
            rootUrl,
            (jsonData: UserProps) => User.createUser(jsonData)
        )
    };

    // TODO: change this equality check in the future to a more meaningful value
    isAdmin(id: number): boolean {
        return this.getProperty('id') === 1;
    }

    setRandomAge(): void {
        const age = Math.floor(Math.random() * 120)
        this.setProperty({ age })
    };
}
