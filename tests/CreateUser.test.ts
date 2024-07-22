import { User, UserProps } from "../src/models/User";

describe('User class', () => {
    it('creates a new User instance with the correct attributes', () => {
        const userProps: UserProps = {'age': 21, 'name': 'Henry', 'id': 1}
        const user = User.createUser(userProps)

        expect(user).toBe instanceof(User);
        expect(user.getProperty('name')).toEqual('Henry');
        expect(user.getProperty('age')).toEqual(21)
        expect(user.getProperty('id')).toEqual(1)
    })
})
