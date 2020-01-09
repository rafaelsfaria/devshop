const init = (db) => {
  const categories = require('../../controllers/categories')
  const router = require('express').Router()
  router.get('/', categories.adminGetCategories(db))
  router.get('/nova', categories.adminCreateCategory(db))
  router.post('/nova', categories.adminCreateCategory(db))
  return router
}

module.exports = init