const init = (db) => {
  const categories = require('../../controllers/categories')(db)
  const router = require('express').Router()
  router.get('/', categories.adminGetCategories)
  router.get('/nova', categories.adminCreateCategory)
  router.post('/nova', categories.adminCreateCategory)
  router.get('/excluir/:id', categories.adminRemoveCategory)
  router.get('/editar/:id', categories.adminEditCategory)
  router.post('/editar/:id', categories.adminEditCategory)
  return router
}

module.exports = init