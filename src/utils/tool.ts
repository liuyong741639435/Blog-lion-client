import md5 from "md5";
// 防抖
// cb回调 s 延时毫秒 start 是否调用立刻执行
export function debounce(cb: Function, s = 100, start = true) {
  let time: NodeJS.Timeout | null = null;
  if (start) {
    // 调用先执行，一个时间内不会再执行
    return function () {
      // 没有定时器，才会执行，执行后cb后，定时器标识空闲间隔
      if (time === null) {
        cb();
        time = setTimeout(() => {
          time = null;
        }, s);
      }
    };
  } else {
    // 一段事件内重复调用，不会马上执行，间隔一段时间再执行
    return function () {
      if (time) {
        // 清除之前的定时器
        clearTimeout(time);
      }
      // 定义新的定时器
      time = setTimeout(() => {
        cb();
        time = null;
      }, s);
    };
  }
}

// MD5摘要
export function MD5(str: string) {
  return md5(str);
}

// 时间格式
export function formatTime(value: number) {
  const time =  (new Date().getTime() - value) / 1000;
  // 年
  // 月
  // 星期
  // 日
  // 小时
  // 分钟
  if (time > 60 * 60 * 24 * 30 * 12) {
    return `${Math.floor(time / (60 * 60 * 24 * 30 * 12))}年前`;
  }
  if (time > 60 * 60 * 24 * 30) {
    return `${Math.floor(time / (60 * 60 * 24 * 30))}月前`;
  }
  if (time > 60 * 60 * 24 * 7) {
    return `${Math.floor(time / (60 * 60 * 24 * 7))}星期前`;
  }
  if (time > 60 * 60 * 24) {
    return `${Math.floor(time / (60 * 60 * 24))}日前`;
  }
  if (time > 60  * 60) {
    return `${Math.floor(time / (60 * 60))}小时前`;
  }
  if (time > 60) {
    return `${Math.floor(time / 60)}分钟前`;
  }
  return "刚刚";
}
