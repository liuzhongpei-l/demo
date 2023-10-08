const fs = require('fs');
const path = require('path');
const logPath = path.join(__dirname, '../', 'log', 'steamLog.log')
const moment = require('moment');
const logger = function () {
    return async (ctx, next) => {
        let requestTime = moment(new Date()).format('YYYY-MM-DD h:mm:ss a');
        let appendData = ctx.request.url + '    ' + requestTime + '   '
        fs.appendFileSync(logPath, appendData, 'utf-8')
        await next()
    }
}


module.exports = logger