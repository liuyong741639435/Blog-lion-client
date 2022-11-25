// 防抖
// cb回调 s 延时毫秒 start 是否调用立刻执行
export function debounce(cb: Function, s = 100, start = true) {
    let time: NodeJS.Timeout | null = null;
    if (start) {
        // 调用先执行，一个时间内不会再执行
        return function() {
            // 没有定时器，才会执行，执行后cb后，定时器标识空闲间隔
            if(time === null) {
                cb()
                time = setTimeout(() => {
                    time = null
                })
            }
        }
    } else {
        // 一段事件内重复调用，不会马上执行，间隔一段时间再执行
        return function() {
            if (time) {
                // 清除之前的定时器
                clearTimeout(time)
            }
            // 定义新的定时器
            time = setTimeout(() => {
                cb()
                time = null
            })
        }
    }
}