$(()=>{
  let form=layui.form
  let layer=layui.layer
  form.verify({
    pass: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    sameOne:function(value){
      if(value ==$('[name=oldPwd]').val()){
        return '新密码不能和原密码相同'
      }
    },
    sameTwo:function(value){
      if(value!==$('[name=newPwd]').val()){
        return '两次密码输入不一致'
      }
    }
  })

  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      method:'POST',
      url:'/my/updatepwd',
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          layer.msg('修改密码失败')
        }
        console.log(res);
        
        layer.msg('修改密码成功')
        $('.layui-form')[0].reset()
      }
    })
  })
})