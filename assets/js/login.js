$(()=>{
  $('.login a').on('click',()=>{
    $('.login').hide()
    $('.reg').show()
  })
  $('.reg a').on('click',()=>{
    $('.reg').hide()
    $('.login').show()
  })
  // 表单验证
const form=layui.form
const layer=layui.layer
form.verify({
  pass: [
    /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
  ],
  repass:function(value){
    const password=$('.reg [name=password]').val()
    if(password!==value){
      return '密码输入不一致'
    }
  }
})
// 注册请求
$('.form_reg').on('submit',function(e){
 e.preventDefault()
 let data={username:$('.reg [name=username]').val(),password:$('.reg [name=password]').val()}
  $.post('/api/reguser',data,(res)=>{
    if(res.status!==0){
      console.log(res.message);
      
      return layer.msg('失败')
    }
    layer.msg('成功')
    $('.a_login').click()
  })
})
// 登录请求
$('.login_form').on('submit',function(e){
  e.preventDefault()
  $.ajax({
    url:'/api/login',
    method:'post',
    data:$(this).serialize(),
    success:function(res){
      if(res.status!==0){
        
        return layer.msg('失败')
      }
      layer.msg('成功')
      console.log(res.token);
      localStorage.setItem('token',res.token)
      location.href='/index.html'
    }
  })
})
})
