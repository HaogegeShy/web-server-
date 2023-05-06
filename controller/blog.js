const {exec} = require('../db/mysql')
const xss = require('xss')
const getList = (author, keyword) => {
  // 这里用1=1是一种小技巧，避免author和keyword都不存在出现错误
  let sql='select * from blogs where 1=1 '
  if(author){
    sql += `and author = '${author}' `
  }
  if(keyword){
    sql += `and title like '%${keyword}%' `
  }
  sql += 'order by createtime desc;'
  // 返回promise
  return exec(sql)
};
const getDetail = (id) => {
  let sql=`select * from blogs where id='${id}'`
  // rwa是一个数组，然后取出数据
  return exec(sql).then(raw => raw[0])
}
// 获取新建博客接口
const newBlog = (blogData = {}) => {
  //blogData是一个博客对象，包含：title content createtime属性
  const title=xss(blogData.title)
 // const title=blogData.title
  const content=blogData.content
  const createtime=Date.now()
  const author=blogData.author

  let sql=`insert into blogs (title, content, createtime, author) values ('${title}', '${content}', '${createtime}', '${author}')`
  return exec(sql).then(insertData => { 
    // console.log('insertData',insertData)
    return insertData.insertId
  })
  
}

// 获取更新博客接口
const updateBlog = (id, blogData = {}) => {
  // id 就是更新博客的 id
  //blogData是一个博客对象，包含：title content 属性
  const title = blogData.title
  const content = blogData.content
  let sql = `update blogs set title='${title}', content='${content}' where id=${id} `
  return exec(sql).then(updateData=>{
    //console.log('updateBlog',updateData)
    if(updateData.affectedRows>0){
      return true
    }else{
      return false
    }
  })
  
}

// 删除博客的接口
const deleteBlog= (id, author)=>{
  // id 就是要删除的博客的id
  const sql=`delete from blogs where id='${id}' and author='${author}'`
  return exec(sql).then(delData => {
    if(delData.affectedRows){
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
};
  