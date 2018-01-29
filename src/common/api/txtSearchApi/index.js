import wepy from 'wepy'
export function hotWordApi(){ 
  return wepy.request({
    url:'https://m.9kacha.com/wsearch/dataApi/get_data.php',
    method:'POST',
    data:{
      dtype:2,
      jparams:JSON.stringify({wordStr:''})
    },
    header:{
      'content-type':'application/x-www-form-urlencoded;charset=UTF-8'
    } 
  }).then((res) => {
    if(res){
      return Promise.resolve(res)
    }else{
      return Promise.reject('数据获取失败')
    }
  }) 
}