import wepy from 'wepy'
const requestHeader = {
  method:'POST',
  header:{
    'content-type':'application/x-www-form-urlencoded;charset=UTF-8'
  }
}

const authObj = function(){
  let kachaUser = wepy.getStorageSync('UserInfo').kachaUserInfo;
  return {
    //authmode:'user',
    user:kachaUser  
  } 
}

// 热门列表接口
//wineInfo: {"category":"wine","wine_id":"","sign":"","year":""}
export function wineDetailApi(wine_info){
  let auth = authObj() 
  //"detail":
  let data = {
    "command":"1017",
    "flags":"offline", // 'online' // 上线前切换
    "detail":{...wine_info}, 
    ...auth
  }
  return wepy.request({
    url:'https://wine.9kacha.com/json80/recevice_json.php', 
    data:{ 
      jparams:JSON.stringify(data)
    },
    ...requestHeader 
  }).then((res) => { 
    if(res && res.statusCode==200){
      let data = res.data 
      if(data.result.accept == '1' ){
        return Promise.resolve(data.wine)
      }else{
        return Promise.reject('数据获取失败')
      }
    }else{
      return Promise.reject('网络请求失败')
    } 
  })
}

