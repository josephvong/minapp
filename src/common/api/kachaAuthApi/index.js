import wepy from 'wepy'
export function kachaAuthApi(loginInfo,userData){
  let reqdata = `{"v":"1.0.0","client":"wx","command":"1003","user":{"code":${loginInfo.code},"nickName":${userData.userInfo.nickName},"headurl":${userData.userInfo.avatarUrl},"sex":${userData.userInfo.gender},"encryptedData":${userData.encryptedData},"iv":${userData.iv}}`
  console.log(reqdata)
  return wepy.request({
    url:'https://user.9kacha.com/wxuser.php',
    method:'POST',
    data:{
      jparams:reqdata
    },
    header:{
      "Content-Type": "json",
    } 
  }).then((res) => {
    if(res){
      return Promise.resolve(res)
    }else{
      return Promise.reject('数据获取失败')
    }
  }) 
}