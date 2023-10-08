
const userService = require('../service/user')
const helper = require('../extend/helper')

const registry = async (ctx, next) => {
    let isRegUser = await userService.isRegUser(ctx.request.body)
    if (isRegUser.status) {
        let params = ctx.request.body
        params.password = await helper.signPassword(params.password)
        let regResults = await userService.registry(params)
        if (regResults.status) {
            ctx.body = {
                code: isRegUser.code,
                message: isRegUser.message,
                data: null
            }
        }
    } else {
        ctx.body = {
            code: isRegUser.code,
            message: isRegUser.message,
            data: null
        }
    }
}

const login = async (ctx, next) => {
    let params = ctx.request.body
    params.password = await helper.signPassword(params.password);
    let res = await userService.login(ctx.request.body)
    if (res.code == 200) {
        let token = await helper.signToken(res.data)
        ctx.body = {
            code: 200,
            message: "登录成功！",
            data: {
                userInfo: res.data,
                token
            }
        }
    } else {
        ctx.body = {
            code: 403,
            message: "请检查账号密码后进行重试"
        }
    }
}


module.exports = {
    registry,
    login
}