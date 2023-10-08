const Router = require('koa2-router')
const userController = require('./controller/user')
const router = new Router()

router.post('/user/registry', userController.registry)
router.post('/user/login', userController.login)


module.exports = router