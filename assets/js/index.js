// 入口函数
$(function () {
  getUserInfo();
  // 定义函数 当页面加载完毕后就调用这个函数
  function getUserInfo() {
    // 发起ajax请求
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      // headers救赎请求头配置对象
      // headers: {
      //   Authorization: localStorage.getItem("token") || "",
      // },
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("获取信息失败！");
        }
        // 调用renderAvatar渲染用户头像
        renderAvatar(res.data);
      },
      // complete里的回调函数，不管成功还是失败都会执行的函数
   
    });
  }

  // 渲染用户头像.
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
  // 退出登录
  $("#btnLogout").on("click", function () {
    // 询问是否要退出
    layui.layer.confirm(
      "您确认要退出登录吗？",
      { icon: 3, title: "提示" },
      function (index) {
        // 如果确认退出 就会执行回调函数里面的代码
        // 退出需要做的：清除token  跳转到login
        localStorage.removeItem("token");
        location.href = "/login.html";

        layui.layer.close(index);
      }
    );
  });
});
