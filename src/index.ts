import { User } from "./models/User"

const user = new User({ name: 'Steve', age: 12 })
console.log(user.get('age'))

user.set({ name: 'michael', age: 97 })
console.log(user.get('age'))
