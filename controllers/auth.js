const user = require('../models/user')

const login = (db) => async (req, res) => {
  console.log('login')
  try {
    const userFromDb = await user.login(db)(req.body.email, req.body.password)
    req.session.user = userFromDb
    res.redirect('/')
  } catch (err) {
    res.send({ err: err.message })
  }
}

const logout = (req, res) => {
  req.session.destroy(() => {})
  res.redirect('/')
}

module.exports = {
  login,
  logout
}