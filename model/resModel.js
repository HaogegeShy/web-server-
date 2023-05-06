// class BaseModel {

//   constructor(data, message) {
//       if (typeof data === 'string') {
//           this.message = data
//           data = null
//           message = null
//       }
//       if (data) {
//           this.data = data
//       }
//       if (message) {
//           this.message = message
//       }
//   }
// }

// class SuccessModel extends BaseModel {
//   constructor(data, message) {
//       // 执行父类的构造函数
//       super(data, message)
//       this.errno = 0
//   }
// }

// class ErrorModel extends BaseModel {
//   constructor(data, message) {
//       super(data, message)
//       this.errno = -1
//   }
// }
  /*
  data:对象类型
  message:字符串类型
  */
function SuccessModel(data,message){
  if (typeof data === 'string') {
    this.message = data
    return
  }
  this.data=data
  this.message=message
  this.errno=0
}
function ErrorModel(data,message){
  if (typeof data === 'string') {
    this.message = data
    return
  }
  this.data=data
  this.message=message
  this.errno=-1
}

module.exports = {
  SuccessModel,
  ErrorModel
}
