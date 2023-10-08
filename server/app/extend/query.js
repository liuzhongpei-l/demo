var mysql = require('mysql');
const { mysqlConfig } = require('../../config/config.default')

var connection = mysql.createConnection(mysqlConfig);

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('db is connected!');
});

const query = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    })
}


module.exports = query;