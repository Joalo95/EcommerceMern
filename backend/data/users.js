import bcrypt from 'bcryptjs'
const Users = [
    {
        name: 'admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('admin', 12),
        isAdmin: true
    },
    {
        name: 'user',
        email: 'user@gmail.com',
        password: bcrypt.hashSync('user', 12),
        isAdmin: false
    }

]
export default Users