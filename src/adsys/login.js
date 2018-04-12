var LOGIN = LOGIN || {};
var that;
LOGIN = {
  init: function() {
    that = this;
  },
  submit:function(){
    var username = $(".username").val();
    var passwd = $(".password").val();
    $.ajax({
        type: 'post',
        url: "/rest/admin/verify",
        dataType: 'json',
        data: {
          "username":username,
          "password":passwd
        },
        success: function(data) {
          if(!data.success){
            $(".error").text(data.msg).show();
          }else{
            var host = window.location.host;
            var hrefUrl = "http://"+host+'/view/main.html';
            window.location.href = hrefUrl;
          }
        }
    });
  },
}
$(function(){
  $(".submit").click(function(){
    if(!$(".username").val()){
      $(".error").text("用户名不能为空！").show();
      return;
    }
    if(!$(".password").val()){
      $(".error").text("密码不能为空！").show();
      return;
    }
    LOGIN.submit();
  })
});
