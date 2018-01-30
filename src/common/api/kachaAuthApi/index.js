import wepy from 'wepy' 
export function kachaAuthApi(loginInfo,userData){ 
  let reqdata = {
    'v':'1.0.0',
    'client':'wx',
    'command':'1003',
    'user':{
      'code':loginInfo.code,
      'nickName':userData.userInfo.nickName,
      'headurl':userData.userInfo.avatarUrl,
      'sex':userData.userInfo.gender,
      'encryptedData':userData.encryptedData,
      'iv':userData.iv
    }
  } 
  return wepy.request({
    url:'https://user.9kacha.com/wxuser.php',
    method:'POST',
    data:{
      jparams:JSON.stringify(reqdata)
    },
    header:{
      "Content-Type": "application/x-www-form-urlencoded" 
    } 
  }).then((res) => { 
    if(res.statusCode==200 && res.data){
      let data = res.data
      if(data.result.accept=="1"){
        return Promise.resolve(data.user)
      }else{
        return Promise.reject('用户登录失败')
      }
    }else{
       return Promise.reject('网络错误')
    } 
  })
}