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
    open_id:kachaUser.user_id,
    session_id:kachaUser.session_id
    //authparams:JSON.stringify(kachaUser)  
  } 
}

// 临时图片上传
export function imgFileUpload(url){
  let auth = authObj()
  let data ={
    "type":"image",
    "user_id":auth.open_id,
    "session_id":auth.session_id
  }
  return new Promise((resolve,reject)=>{
    wepy.uploadFile({
      url: 'https://fs.9kacha.com/upload.php',
      filePath: url,
      name: 'media',
      header: { 'content-type': 'json' },
      formData: { jparams:JSON.stringify(data) },
    }).then((res)=>{  
      if(res && res.statusCode==200){
        let data = JSON.parse(res.data)
        if(!data.status ){
          //console.log(data)
          //return Promise.resolve(data.url)
          resolve(data.url)
        }else{
          //return Promise.reject('数据获取失败')
          reject('数据获取失败')
        }
      }else{
       // return Promise.reject('网络请求失败')
        reject('网络请求失败')
      } 
    })
  }) 
  
}

// 图片上传 接口： 上传 图片 base64， 获取 结果酒款ID
export function imgUrlSend(img_url){
  let auth = authObj() 
  console.log(auth) 
  let data = {img_url:img_url, response_type:'',...auth}
  
  return wepy.request({
    url:'https://ims.9kacha.com/api/search.php',
    data:{
      jparams:JSON.stringify(data), 
      
    },
    ...requestHeader
  }).then((res)=>{ //数据链接成功
    if(res.data){
      if(res.data.status==0 && res.data.description =="ok"){
       return Promise.resolve(res.data)
      }else{
        return Promise.reject('图片格式错误')
      }
    }
  }).catch((err)=>{  // 后端 处理不了图片 的 失败回调函数
    return Promise.reject('图片链接解析失败')
  })
}


// 图片Id 获取酒款的 接口： 上传 图片id，
export function imgWineResult(imgId){ 
  let auth = authObj()  
  let data = {ims_id:imgId,response_type:'html', ...auth } 

  return wepy.request({
    url:'https://ims.9kacha.com/api/qsearch_res.php',
     data:{
      jparams:JSON.stringify(data)
    },
    ...requestHeader
  }).then((res)=>{ //数据链接成功
     return Promise.resolve(res.data)
  }).catch((err)=>{
    return '网络连接异常'
  })
}

 