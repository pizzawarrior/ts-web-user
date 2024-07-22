import { User } from "./models/User"
import { UserEdit } from "./views/UserEdit";
import { UserList } from "./views/UserList";
import { Collection } from "./models/Collection";
import { UserProps } from "./models/User";

// const user = User.createUser({ 'id': 1, 'name': 'Jalapeno', 'age': 97 })
// const root = document.getElementById('root')

// if (root) {
//     const userEdit = new UserEdit(root, user);
//     userEdit.render();
//     console.log(userEdit)

// } else throw new Error('Root element not found')


const collection = new Collection('http://localhost:3000/users', (json: UserProps) => {
    return User.createUser(json)
})

collection.on('change', () => {
    const root = document.getElementById('root')

    if (root) {
        new UserList(root, collection).render()
    }
})

collection.fetch()
