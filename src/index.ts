import { User } from "./models/User"

const user = new User({ name: 'Steve', age: 12 })

// test if events are registering and saving to the events array
user.on('change', () => { console.log('change 1') })
user.on('change', () => { console.log('change 2') })
user.on('export', () => { console.log('export') })

user.trigger('change')
