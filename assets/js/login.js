$(function () {
  // 切换两个登录和注册的盒子
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
});
// 表单验证
// 从layui中获取form对象
var form = layui.form;
// 从layui中获取layer对象
var layer = layui.layer;
// 通过form.verify()函数自定义校验规则
form.verify({
  // 自定义pwd校验规则
  // 后面的规则可以是数组格式，也可以是函数
  pwd: [/^[\S]{6,12}$/, "密码必须是6到12位，且不能出现空格"],
  repwd: function (value) {
    // 拿到密码框的内容进行比较
    var pwd = $(".reg-box [name=password]").val();
    if (pwd !== value) {
      return "两次密码不一致！";
    }
  },
});
// 监听注册表单的提交事件
$("#form_reg").on("submit", function (e) {
  // 阻止表单默认行为
  e.preventDefault();
  // 发起请求\
  var data = {
    username: $("#form_reg [name=username]").val(),
    password: $("#form_reg [name=password]").val(),
  };
  // console.log(data)
  $.post("/api/reguser", data, function (res) {
    // 没有注册成功
    if (res.status !== 0) {
      // console.log('111')
      return layer.msg(res.message);
    }
    layer.msg("注册成功，请登录！", function () {
      // 注册成功后切换回登录表单
      $("#link_login").click();
    });
  });
});
// 监听登录表单的提交事件
$("#form_login").on("submit", function (e) {
  // 阻止默认行为
  e.preventDefault();
  $.ajax({
    url: "/api/login",
    method: "POST",
    // 快速获取表单中的数据
    data: $(this).serialize(),
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("登录失败");
      }
      //登录成功
      layer.msg("登录成功！");
      // 将登录成功得到的token字符串保存到localStorage中
      localStorage.setItem("token", res.token);
      // 跳转到后台主页
      location.href = "/index.html";
    },
  });
});
