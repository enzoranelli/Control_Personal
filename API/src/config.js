require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 9000,
    
    },
    mysql:{
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DB || 'controlpersonal',
    }
}