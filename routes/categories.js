const init = (db) => {
  const categories = require('../controllers/categories')(db)
  const router = require('express').Router()
  router.get('/:id/:slug', categories.getCategories)
  return router
}

module.exports = init