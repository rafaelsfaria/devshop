const init = (db) => {
  const categories = require('./categories')(db)
  const router = require('express').Router()

  // router.use((req, res, next) => {
  //   if (req.session.user) {
  //     if (req.session.user.roles.indexOf('admin') < 0) {
  //       res.redirect('/')
  //     } else {
  //       next()
  //     }
  //   } else {
  //     res.redirect('/')
  //   }
  // })

  router.get('/', (req, res) => res.render('admin/index'))
  router.use('/categorias', categories)

  return router
}

module.exports = init