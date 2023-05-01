const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: process.env.USERNAME,
    host:process.env.HOST,
    port:process.env.DBPORT,
    password:process.env.PASSWORD,
    database : 'TaskApp'

})
module.exports=pool