const express = require('express');
const router = express.Router();
// 导入 getList 数据文件
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require("../controller/blog");
// 导入数据模型
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { loginCheck } = require('../middleware/loginCheck');
const { login } = require('../controller/user');

// 获取博客列表
router.get('/list', (req, res, next) => {
   // 获取 query 中的 anthor ,如果没有则为空字符串
   let author = req.query.author || "";
   // 获取 query 中的 keyword ,如果没有则为空字符串
   const keyword = req.query.keyword || "";

   if(req.query.isadmin){
     // 管理员界面
     console.log('is admin');
     if(req.session.username == null){
      console.error('is admin, but not a login');
        res.json(new ErrorModel('未登录'))
        return
     }
     // 强制查询自己的博客
     author= req.session.username
   }
   const result = getList(author, keyword);
   return result.then(listData => res.json(new SuccessModel(listData)))
});
// 获取博客详情
router.get('/detail', loginCheck,(req, res, next) => {
  const result = getDetail(req.query.id)
  return result.then(data => res.json(new SuccessModel(data)))
});
// 新建博客
router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username 
    const result= newBlog(req.body)
    return result.then(data => res.json(new SuccessModel(data)))
})
// 更新博客
router.post('/update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id, req.body)
  return result.then(val => {
      if (val) {
          res.json(
              new SuccessModel()
          )
      } else {
          res.json(
              new ErrorModel('更新博客失败')
          )
      }
  })
})
// 删除博客
router.post('/del', loginCheck, (req, res, next) => {
  const author = req.session.username
  const result = deleteBlog(req.query.id, author)
  return result.then(val => {
      if (val) {
          res.json(
              new SuccessModel()
          )
      } else {
          res.json(
              new ErrorModel('删除博客失败')
          )
      }
  })
})
module.exports = router;