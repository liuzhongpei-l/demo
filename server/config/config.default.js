const mysqlConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'demo'
}
const secretString = 'qwdnajhaffuidsifg'
const whitelist = ['/user/login']

module.exports = {
    mysqlConfig,
    secretString,
    whitelist
}