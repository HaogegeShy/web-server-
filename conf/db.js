const env = process.env.NODE_ENV //环境参数

// 配置
let MYSQL_CONF
let REDIS_CONF
// 开发环境下的
if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'admin123',
        port: '3306',
        database: 'myblog'
    }
    REDIS_CONF={
        port:6379,
        host:'127.0.0.1'
    }
}

// 线上的（现在只不过是没有具体区别线上线下）
if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'admin123',
        port: '3306',
        database: 'myblog'
    }
    REDIS_CONF={
        port:6379,
        host:'127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}
