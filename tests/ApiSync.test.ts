import { ApiSync } from "../src/models/ApiSync";
import { HasId } from "../src/models/HasId";
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('ApiSync class', () => {
    const rootUrl = 'http://localhost:3000';
    let apiSync: ApiSync<HasId>

    beforeEach(() => {
        apiSync = new ApiSync<HasId>(rootUrl);
    })

    describe('save', () => {
        it('should make a POST request if no id is provided', async () => {
            const data: HasId = { 'name': 'Steven', 'age': 97 };
            mockedAxios.post.mockResolvedValue({ data });

            await apiSync.save(data);

            expect(mockedAxios.post).toHaveBeenCalledWith(`${rootUrl}`, data);
        });

        it('should make a PUT request when an id is provided', async () => {
            const data: HasId = { 'name': 'Steven', 'age': 97, 'id': 1 };
            mockedAxios.put.mockResolvedValue({ data });

            await apiSync.save(data);

            expect(mockedAxios.put).toHaveBeenCalledWith(`${rootUrl}/1`, data);
        });
    });
});
