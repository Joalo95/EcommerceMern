import bcrypt from 'bcryptjs'
const Users = [
    {
        name: 'admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('admin', 12),
        isAdmin: true,
        isStore: false
    },
    {
        name: 'user',
        email: 'user@gmail.com',
        password: bcrypt.hashSync('user', 12),
        isAdmin: false,
        isStore: false
    },
    {
        name: 'store',
        email: 'store@gmail.com',
        password: bcrypt.hashSync('store', 12),
        isAdmin: false,
        isStore: true
    }

]
export default Users