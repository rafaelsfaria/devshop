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
      email: 'rafaelsanfaria@gmail.com',
      password: generateHash('123456'),
      email_checked: true,
      created: new Date(),
      updated: new Date(),
      roles: 'admin,financial,customer'
    }
    await db('users').insert(user)
  }
}

const login = db => async (email, password) => {
  const users = await db('users').select('*').where('email', email)
  if (users.length === 0) {
    throw new Error('E-mail inválido')
  }
  if (!bcrypt.compareSync(password, users[0].password)) {
    throw new Error('Senha inválida')
  }
  return users[0]
}

module.exports = {
  initialUser,
  login
}