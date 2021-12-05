// 每次调用请求前会先调用这个函数
$.ajaxPrefilter(function(options) {
    // 在发起真正的请求前，同一拼接请求的路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})