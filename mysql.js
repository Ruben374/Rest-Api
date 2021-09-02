const mysql = require('mysql')

const pool=mysql.createPool({
    "user":"root",
    "password":"",
    "database":"api",
    "host":"localhost",
    "port":"3306"
})

exports.pool=pool;