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
    openid:kachaUser.user_id,
    session_id:kachaUser.session_id
    //authparams:JSON.stringify(kachaUser)  
  } 
}

// 临时图片上传
export function imgFileUpload(url){
  let auth = authObj()
  let data ={
    "type":"image",
    "user_id":auth.openid,
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
        if(!data.status && data.url ){ 
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
  let data = {img_url:img_url, response_type:'data',...auth}
  
  return new Promise((resolve,reject)=>{
    wepy.request({
      url:'https://ims.9kacha.com/api/search.php',
      data:{
        jparams:JSON.stringify(data),  
      },
      ...requestHeader
    }).then((res)=>{ //数据链接成功 
      if(res && res.statusCode==200){
        let data = res.data
        if(data){
          if(data.status==0 && data.ims_id){
            //return Promise.resolve(res.data)
            resolve(data.ims_id)
          }else{
            console.log(data)
            //return Promise.reject('图片格式错误')
            reject(data.description)
          }
        }
      }else{
        //return Promise.reject('图片链接解析失败')
        reject('图片链接解析失败')
      }
    })
  }) 
}


// 图片Id 获取酒款的 接口： 上传 图片id，
export function imgWineResult(imgId){ 
  let auth = authObj()  
  let data = {ims_id:imgId, response_type:'data', ...auth } 

  return wepy.request({
    url:'https://ims.9kacha.com/api/qsearch_res.php',
     data:{
      jparams:JSON.stringify(data)
    },
    ...requestHeader
  }).then((res)=>{ //数据链接成功
    if(res && res.statusCode==200){
      let data = res.data
      if(data){
        if(data.status==0 ){
          return Promise.resolve(data)
          //resolve(data.ims_id)
        }else{
          return Promise.reject('图片格式错误')
          //reject('图片数据错误')
        }
      }
    }else{
      return Promise.reject('图片链接解析失败')
      //reject('搜索网络异常')
    }  
  }) 
}

  // 使用 s_id 递归 访问 接口 获取结果
export function recurImgSearch(imgId){ // 递归 访问接口
  //let This = this;
  return new Promise(function(Res,Rej){   // 输出一个 promise 对象
    let times = 0;  // 访问次数 值
    function getData(Id){
      if(times>4){ Rej('超时');  return }
      setTimeout(()=>{
        imgWineResult(Id).then((res)=>{
          times += 1  // 访问成功，times +1 
          if( res.jsonData &&  !res.jsonData.length && !res.jsonData.status){
            //This.findingTime = times   // 输出 第 n 次 遍历号
            getData(imgId)  //递归
          }else if(res.status===0 && res.jsonData && res.jsonData.status=="1"){ 
            Rej(res.jsonData.description)
            //This.resultLoad = false;   // 递归结束 结果loading 隐藏
          }else if(res.status===0 && res.jsonData && res.jsonData.status=="0" && res.jsonData.wine_list.length){

            Res(res.jsonData)  // 返回搜索结果
            //This.resultLoad = false;   // 递归结束 结果loading 隐藏
          }
        }).catch((err)=>{
          Rej(err);
        })
      },2000)  //  定义一个递归函数
    }
    getData(imgId)  // 执行递归函数，在递归函数过程中，根据不同的状态 调用 Res() 和 Rej（）
  })
}
 