
$(()=>{
  let layer=layui.layer
  let form=layui.form
  form.verify({
    nickname:function(value){
      if(value.length>6){
        return '昵称不能多于六位'
      }
    }
  })

  innitUserInfo()


  function innitUserInfo(){
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      success:function(res){
        if(res.status!==0){
          return layer.msg('获取用户信息失败')
        }else{
          console.log(res);
          form.val("userForm",res.data)
        }
      }
    })
  }

  $('.reset').on('click',function(e){
    e.preventDefault()
    innitUserInfo()
  })

  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      method:'POST',
      url:'/my/userinfo',
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layer.msg('更新失败')
        }else{
          window.parent.getUserInfo()
        }
      }
    })
  })
})



