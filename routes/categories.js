const init = (db) => {
  const categories = require('../controllers/categories')
  const router = require('express').Router()
  router.get('/categoria/:id/:slug', categories.getCategories(db))
  return router
}

module.exports = init