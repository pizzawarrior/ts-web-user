import { User } from "./models/User"
import { ApiSync } from "./models/ApiSync";
import axios from 'axios'

// Various tests for User class methods
// TODO: Delete these

// const user = new User({ name: 'Steve', age: 12 })
// user.on('change', () => {
//     console.log('user 1 was here');
// });
// // user.trigger('change');
// user.set({ 'name': 'Mikey' });

// console.log(user.get('name'));

// // test if events are registering and saving to the events array
// user.events.on('change', () => { console.log('change 1') })
// user.events.on('change', () => { console.log('change 2') })
// user.events.on('export', () => { console.log('export') })
// user.events.trigger('change')

// axios.get('http://localhost:3000/users/1')

// const user = new User({ id: 1 })
// user.fetch();
// setTimeout(() => {
//     console.log(user)
// }, 4000);

// const user = new User({ id: 1 })
// user.set({ name: 'Steve', age: 23 })
// user.save()
// console.log(user.fetch())
// setTimeout(() => {
//     console.log(user)
// }, 4000);

// const user = new User({ name: 'James', age: 239000 });
// user.save()
// console.log(user.fetch())
// setTimeout(() => {
//     console.log(user)
// }, 3000);

// const user = new User({ 'id': 5 });
// user.delete();

// const user = new User({"id": 1})
// user.on('change', () => {
//     console.log(user)
// });
// user.fetch()

const user = User.createNewUser({"name": 'SnoopDawg'})
console.log(user.getProperty('name'))
// user.on('save', () => {
//     console.log(user)
// })
// user.save()
