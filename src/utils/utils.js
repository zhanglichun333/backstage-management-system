import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);
export const isAntDesignPro = () => {
  // 官方演示站点
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  // 真实开发环境:window.location.hostname=>localhost  官方演示站点 window.location.hostname=>preview.pro.ant.design
  return window.location.hostname === 'preview.pro.ant.design';
  // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
}; 
export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
// find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined
// path-to-regexp  url 的正则表达式  去匹配pathname
// 只能匹配
export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(({ path }) => path && pathRegexp(path).exec(pathname));
  console.log(authority)
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach(route => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};
/**
 * 公共方法
 */
// export const getDuration = (startTime, endTime) => {
//   let dateDiff = new Date(endTime).getTime() - new Date(startTime).getTime()
//   let hours = Math.floor(dateDiff / (3600 * 1000)) //计算出小时数
//   let leave1 = dateDiff % (3600 * 1000) //计算小时数后剩余的毫秒数
//   let minutes = Math.floor(leave1 / (60 * 1000)) //计算相差分钟数
//   let leave2 = leave1 % (60 * 1000) //计算分钟数后剩余的毫秒数
//   let seconds = Math.round(leave2 / 1000)
//   return hours + "小时 " + minutes + " 分钟" + seconds + " 秒"
// }

export const getDuration = (startTime, endTime) => {
  let dateDiff = new Date(endTime).getTime() - new Date(startTime).getTime()
  let d = Math.floor(dateDiff / 1000 / 60 / 60 / 24)
  let h = Math.floor(dateDiff / 1000 / 60 / 60 % 24)
  let m = Math.floor(dateDiff / 1000 / 60 % 60)
  let s = Math.floor(dateDiff / 1000 % 60)
  return `${d > 0 ? d + '天' : ''}${h > 0 ? h + '小时' : ''}${m > 0 ? m + '分' : ''}${s > 0 ? s + '秒' : ''}`
}