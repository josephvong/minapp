import wepy from 'wepy'
export function questionGetApi(){
  return wepy.request({
    url:'http://m.9kacha.com/activities_t/jd_lafitte/api/getActivityData.php',
    method:'POST', 
  }).then((res) => {
    if(res.data.state && res.data.jsonData.length){
      return Promise.resolve(res.data.jsonData)
    }else{
      return Promise.reject('数据获取失败')
    } 
  }) 
}