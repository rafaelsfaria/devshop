const init = () => {
  const home = require('../controllers/home')
  const router = require('express').Router()
  router.get('/', home.getIndex)
  return router
}

module.exports = init