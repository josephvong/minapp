import wepy from 'wepy' 

const SEARCH_HISTORY = 'SEARCH_HISTORY'
const MAX_LENGTH = 10

export function searchHisSave(item){
  let historyList = searchHisSaveLoad() //wepy.getStorageSync(SEARCH_HISTORY)
  _insertArr(historyList,item,MAX_LENGTH)
  wepy.setStorageSync(SEARCH_HISTORY,historyList) 
}
export function searchHisDelete(item){
  let historyList = searchHisSaveLoad()//wepy.getStorageSync(SEARCH_HISTORY)
  _deleteArr(historyList,item)
  wepy.setStorageSync(SEARCH_HISTORY,historyList) 
}


export function searchHisSaveLoad(){
  let historyList = wepy.getStorageSync(SEARCH_HISTORY) 
  if(!historyList || !historyList.length){
    return []
  }else{ 
    return historyList
  }
} 

// 数组 中插入目标项 （如果目标项存在于数组中，把它提前，否则插入数组开头，并且保持数组一定长度）
function _insertArr(arr,val,maxLen){
  const index = arr.findIndex((item)=>{
    return item == val
  }) 

  if(index==0){return}  // 插入值为 数组第一个 ，直接return

  if(index>0){  // 数组内 存在 val
    arr.splice(index,1) // 先把 数组原来的 val 删除
  }

  arr.unshift(val) // 把 参数 val 放入 数组的 最前头

  if(maxLen && arr.length>maxLen){
    arr.pop()  // 数组清除最后一项 （如果 长度超过maxLen）
  }
}

//从数组中删除 目标数据
function _deleteArr(arr,val){
  const index = arr.findIndex((item)=>{
    return item == val
  }) 
  if(index>=0){
    arr.splice(index,1)
  }
}
