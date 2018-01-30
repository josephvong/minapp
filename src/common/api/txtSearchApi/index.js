import wepy from 'wepy'
const requestHeader = {
  method:'POST',
  header:{
    'content-type':'application/x-www-form-urlencoded;charset=UTF-8'
  }
}
const authObj = {
  authmode:'user',
  authparams:{...wepy.getStorageSync('UserInfo').kachaUserInfo}  
}

// 热门列表接口
export function hotWordApi(){  
  let data = { wordStr:'', ...authObj } 
  return wepy.request({
    url:'https://wdsapi.9kacha.com/util/word_search.php', 
    data:{
      dtype:2,
      jparams:JSON.stringify(data)
    }, 
    ...requestHeader 
  }).then((res) => {
    if(res && res.statusCode==200){
      let data = res.data
      if(!data.status && data.wordHot.length){
        return Promise.resolve(data.wordHot)
      }else{
        return Promise.reject('数据获取失败')
      }
    }else{
      return Promise.reject('网络请求失败')
    }
  }) 
}


// 关联选项接口
export function relateWordApi(queryStr){
  let data = {wordStr:queryStr, ...authObj}
  return wepy.request({
    url:'https://wdsapi.9kacha.com/util/word_suggest.php', 
    data:{ 
      jparams:JSON.stringify(data)
    },
    ...requestHeader 
  }).then((res) => { 
    if(res && res.statusCode==200){
      let data = res.data
      if(!data.status ){
        return Promise.resolve(data.wordOnSuggest)
      }else{
        return Promise.reject('数据获取失败')
      }
    }else{
      return Promise.reject('网络请求失败')
    } 
  })
}

export function resultListApi(info){
  let data = {
    wordStr:info.wordStr,
    size:10,
    fuzzy_flag:1, //关闭模糊搜索
    offset:info.pageIndex*10-10, 
    //is_correct:is_correct, // 默认开启 错误匹配
    //is_alias:is_alias, // 默认开启别名适配
    //grape_blend_flag:isMix?1:0,  // 默认不是混酿
    //rowSearch:rowSearch, 
    ...authObj
  }
  return wepy.request({
    url: 'https://wdsapi.9kacha.com/util/word_search.php',
    data: {
      jparams: JSON.stringify(data)
    },
    ...requestHeader
  }).then((res) => {
    console.log(res)
    
    /*if(res && res.statusCode==200){
      let data = res.data
      if(!data.status ){
        return Promise.resolve(data.wordOnSuggest)
      }else{
        return Promise.reject('数据获取失败')
      }
    }else{
      return Promise.reject('网络请求失败')
    }*/

  })
}