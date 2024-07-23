import { User, UserProps } from "../src/models/User";
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('User class', () => {
    const userProps: UserProps = {'age': 21, 'name': 'Henry', 'id': 1}
    const user = User.createUser(userProps)

    it('creates a new User instance with the correct attributes', () => {
        expect(user).toBe instanceof(User);
        expect(user.getProperty('name')).toEqual('Henry');
        expect(user.getProperty('age')).toEqual(21)
        expect(user.getProperty('id')).toEqual(1)
    });

    it('create a new User instance with a random age', () => {
        user.setRandomAge();

        expect(user.getProperty('age')).toBeGreaterThanOrEqual(0);
        expect(user.getProperty('age')).toBeLessThanOrEqual(120);
    });

    it('creates a Collection instance and fetches data', async () => {
        const userProps: UserProps[] = [
            {'age': 21, 'name': 'Henry', 'id': 1},
            {'age': 13, 'name': 'Geoffrey', 'id': 2}
        ];

        mockedAxios.get.mockResolvedValue({ data: userProps });

        const collection = User.createCollection();
        await collection.fetch();

        expect(collection.models.length).toEqual(2);
        expect(collection.models[0].getProperty('name')).toBe('Henry');
        expect(collection.models[1].getProperty('name')).toBe('Geoffrey');
    });
});
