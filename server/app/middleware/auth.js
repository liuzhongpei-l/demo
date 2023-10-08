const { verifyToken } = require('../extend/helper')
const { whitelist } = require('../../config/config.default')

const auth = function () {
    return async (ctx, next) => {
        if (!whitelist.includes(ctx.request.url)) {
            console.log(ctx.request.header, '111')
            console.log(ctx.request.header?.authorization, '222')
            if (ctx.request.header?.authorization) {
                let token = ctx.request.header?.authorization.substring(7)
                let verRes = await verifyToken(token)
                if (verRes == 'JsonWebTokenError') {
                    ctx.body = {
                        code: 401,
                        message: "token 被篡改，请重新登录后重试！",
                        data: null
                    }
                } else if (verRes == 'TokenExpiredError') {
                    ctx.body = {
                        code: 401,
                        message: "登陆超时，请重新登陆！",
                        data: null
                    }
                } else {
                    await next()
                }
            } else {
                ctx.body = {
                    code: 401,
                    message: "请登录重试！",
                    data: null
                }
            }
        } else {
            await next()
        }
    }
}


module.exports = auth


/*
1. 要检测用户请求的接口是否在白名单（不需要我们的中间件进行校验的接口，如：登录、注册）
2. 在白名单中直接跳出中间件向下执行、如果不在白名单、我们去检测当前用户请求此接口是否携带了token
3. 当前接口没有携带token（相当于用户未登录，此接口就需要鉴权，提示用户未登录或者登录失效！）
4. 如果携带了token进行请求，就去校验此token是否正确，正确就进行跳出中间件，失败错误返回信息提示
*/

