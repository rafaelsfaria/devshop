const init = (db) => {
  const home = require('../controllers/home')
  const auth = require('../controllers/auth')

  const products = require('../routes/products')
  const categories = require('../routes/categories')
  const router = require('express').Router()

  router.get('/', home.getIndex)
  router.post('/login', auth.login(db))
  router.get('/logout', auth.logout)
  router.use('/categoria', categories(db))
  router.use('/produto', products(db))

  return router
}

module.exports = init