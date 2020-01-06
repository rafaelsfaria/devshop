const bcrypt = require('bcryptjs')

const generateHash = password => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

const initialUser = db => async (id) => {
  const count = await db('users').count('id as total')
  console.log({count})
  if (count[0].total === 0) {
    const user = {
      name: 'Admin',
      email: 'admin@devshop.com',
      password: generateHash('MINHASENHASECRETA!'),
      email_checked: true,
      created: new Date(),
      updated: new Date(),
      roles: 'admin,financial,customer'
    }
    await db('users').insert(user)
  }
}

module.exports = {
  initialUser
}