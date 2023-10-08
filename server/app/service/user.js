
const query = require('../extend/query')



const registry = async (params) => {
    const { username, password, nickname, phone } = params
    let sql = `insert into user (username,password,nickname,phone) values ('${username}','${password}','${nickname}','${phone}')`
    let res = await query(sql)
    if (res.affectedRows == 1) {
        return {
            status: true,
            message: "注册成功，请登陆！",
            code: 200
        }
    } else {
        return {
            status: false,
            message: "系统错误，请联系管理员或稍后重试！",
            code: 500
        }
    }
}

const isRegUser = async (params) => {
    let sql = `select username from user where username='${params.username}'`
    let res = await query(sql)
    if (res.length > 0) {
        return {
            status: false,
            message: "用户名已经存在",
            code: 403
        }
    } else {
        return {
            status: true,
            message: "用户未注册，可以正常注册",
            code: 200
        }
    }
}

const login = async (params) => {
    const { username, password } = params
    let sql = `select username from user where username = '${username}' and password = '${password}'`
    let res = await query(sql)
    if (res.length > 0) {
        return {
            code: 200,
            data: res
        }
    } else {
        return {
            code: 403,
            data: null
        }
    }
}

module.exports = {
    registry,
    isRegUser,
    login
}