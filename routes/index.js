const init = (db) => {
  const home = require('../controllers/home')
  const auth = require('../controllers/auth')

  const products = require('../routes/products')(db)
  const categories = require('../routes/categories')(db)
  const admin = require('../routes/admin/index')
  const router = require('express').Router()

  router.get('/', home.getIndex)
  router.post('/login', auth.login(db))
  router.get('/logout', auth.logout)
  router.use('/categoria', categories)
  router.use('/produto', products)
  router.use('/admin', admin(db))

  return router
}

module.exports = init