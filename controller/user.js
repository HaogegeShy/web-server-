const { exec, escape } = require("../db/mysql")
const { genPassword } = require('../utils/cryp')

const login = (username, password)=> {
  // 先使用假数据
  // if (username === "zhangshan" && password === "123") {
  //     return true
  // }
  // return false
  username = escape(username)
  password = genPassword(password)
  password = escape(password)
  // console.log(password)
  const sql = `select username, realname from users where username=${username} and password=${password}`
  return exec(sql).then(rows => {
    // console.log(rows);
    return rows[0] || {}
  })
}

module.exports = {
  login
}
