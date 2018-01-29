//---------------------------------------------------------------
// 延时执行节流函数 基础版    函数的参数：一个真实执行的函数 , 延时时间段
export function debounce(fn,delay){
  let timer // 创建一个变量 
  return function (...args){ // debounce 函数 输出一个 函数
    if(timer){
      clearTimeout(timer) // 如果timer 变量里面有 计时器对象，清除计时器
    }
    timer = setTimeout(()=>{ // 重新创建计时器来执行 函数
       // 对参数内要执行的函数 延时执行
      fn.apply(this,args)// 用apply() 绑定 this（调用debounce的对象） 到 fn 中
    },delay)
  }
}

// 延时执行节流函数 高级版（使一些 需要连续 重复执行的函数 延时一定时间来执行，减少重复）
export function throttle (action, delay) {
    let timeout = null
    let lastRun = 0
    return function () {
        if (timeout) {
            return
        }
        let elapsed = Date.now() - lastRun
        let context = this
        let args = arguments
        let runCallback = function () {
                lastRun = Date.now()
                timeout = false
                action.apply(context, args)
            }
        if (elapsed >= delay) {
            runCallback()
        }
        else {
            timeout = setTimeout(runCallback, delay)
        }
    }
}