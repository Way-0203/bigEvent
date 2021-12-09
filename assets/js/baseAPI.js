// 每次调用请求前会先调用这个函数
// 拦截请求 把地址进行拼接 jq中的方法
// 在这个函数可以拿到ajax提供的配置对象 options
$.ajaxPrefilter(function (options) {
  // 在发起真正的请求前，同一拼接请求的路径
  options.url = "http://api-breakingnews-web.itheima.net" + options.url;
  // 给有权限的接口，在请求投中携带token
  // indexOf()函数 返回第一次出现这个值的索引，没有就返回-1
  if (options.url.indexOf("/my/") !== -1) {
    // 有
    options.headers = {
      Authorization: localStorage.getItem("token"),
    };
  }
  // 设置complete函数，控制用户的访问权限
  // 没有token值或者token值为假时都会返回status为1  message为身份认证失败
  options.complete = function (xhr) {
    // 判断token值
    if (
      xhr.responseJSON.status === 1 &&
      xhr.responseJSON.responseJSON.message === "身份认证失败！"
    ) {
      // 清空token
      // 跳转到登录页
      location.href = "/login.html";
    }
  };
});
