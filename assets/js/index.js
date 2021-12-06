// 定义函数 当页面加载完毕后就调用这个函数
function getUserInfo() {
  // 发起ajax请求
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers救赎请求头配置对象
    headers: {
      Authorization: localStorage.getItem("token") || "",
    },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("获取信息失败！");
      }
      // 调用renderAvatar渲染用户头像
      renderAvatar(res.data);
    },
  });
}

// 渲染用户头像
function renderAvatar(user) {
  // 获取用户的名称
  var name = user.nickname || user.username;
  // 设置欢迎的文本
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
  // 按需渲染用户头像
  if (user.user_pic !== null) {
    // 有图片头像
    $(".layui-nav-img").Authorization("src", user.user_pic).show();
  } else {
    // 没有图片头像 渲染文本头像
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
