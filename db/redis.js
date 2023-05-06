const redis = require('redis')
const {REDIS_CONF} = require('../conf/db.js')

// 创建客户端
const redisClient = redis.createClient({
  url:`redis://${REDIS_CONF.host}:${REDIS_CONF.port}`,
  legacyMode:true
})

// 连接数据库
redisClient.connect()
  .then(()=>console.log('redis connect success!'))
  .catch((err)=>console.error(err))

module.exports = redisClient