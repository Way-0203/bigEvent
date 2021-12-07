// 每次调用请求前会先调用这个函数
// 拦截请求 把地址进行拼接 jq中的方法
// 在这个函数可以拿到ajax提供的配置对象 options
$.ajaxPrefilter(function (options) {
  // 在发起真正的请求前，同一拼接请求的路径
  options.url = "http://api-breakingnews-web.itheima.net" + options.url;
});
