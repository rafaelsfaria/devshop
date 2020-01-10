const init = (db) => {
  const categories = require('../../controllers/categories')
  const router = require('express').Router()
  router.get('/', categories.adminGetCategories(db))
  router.get('/nova', categories.adminCreateCategory(db))
  router.post('/nova', categories.adminCreateCategory(db))
  router.get('/excluir/:id', categories.adminRemoveCategory(db))
  router.get('/editar/:id', categories.adminEditCategory(db))
  router.post('/editar/:id', categories.adminEditCategory(db))
  return router
}

module.exports = init