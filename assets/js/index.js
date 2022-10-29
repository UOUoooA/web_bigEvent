$(()=>{
  getUserInfo()
  const layer=layui.layer

  $('.btnLoginOut').on('click',function(){
    layer.confirm('确认退出码？', {icon: 3, title:'提示'}, function(index){
      //do something
      localStorage.removeItem('token')
      location.href='/login.html'
      layer.close(index);
    });
    
  })
})

function getUserInfo(){
  $.ajax({
    method:'GET',
    url:'/my/userinfo',
  // 成功的回调
    success:function(res){
    console.log(res);
    
     if(res.status!=1){
      renderAvantar(res.data)

     }
    },
    // 防止不登陆直接搜索
    complete:function(res){
      console.log(res);
      
      if(res.responseJSON.status==1||res.responseJSON.message!="获取用户基本信息成功！"){
      localStorage.removeItem('token')
      location.href='/login.html'
    }
    }
    
  })
}
// 渲染头像信息
function renderAvantar(user){
  let name=user.nickname||user.username
  $('#welcome').html(`欢迎&nbsp&nbsp${name}`)
  if(user.user_pic!==null){
    $('.layui-nav-img').attr('src',user.user_pic)
    $('.layui-nav-img').show()
    $('.text-avatar').hide()
  }else{
    let firstName=name[0].toUpperCase()
    $('.text-avatar').html(firstName)
    $('.layui-nav-img').hide()
    $('.text-avatar').show()
  }
}