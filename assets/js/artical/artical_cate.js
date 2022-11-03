$(()=>{
  let layer=layui.layer
  let form=layui.form

  innitArtical()

 function innitArtical(){
  $.ajax({
    method:'get',
    url:'/my/article/cates',
    success:function(res){
      if(res.status!==0){
        return layer.msg('获取文章分类失败')
      }
    const htmlStr =  template('tml_artical',res)
    $('tbody').html(htmlStr)
    }
  })
 }

let open=null
  $('.btn_cate').on('click',function(){
    open = layer.open({
      type:1,
      area: ['500px', '250px'],
      title:'添加分类'
      ,content:$('#tanchu').html()
    })     
  })

  $('body').on('submit','.tanchuForm',function(e){
    e.preventDefault()
    $.ajax({
      url:'/my/article/addcates',
      type:'POST',
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layer.msg('更新失败')
        }
        console.log(res);
        innitArtical()
        layer.close(open)
      }
    })
  })

  let editIndex=null
  $('html').on('click','.editBtn',function()
  {
    editIndex = layer.open({
      type:1,
      area: ['500px', '250px'],
      title:'添加分类'
      ,content:$('#xiugai').html()
    })     
    let id=$(this).attr('data-id')
    $.ajax({
      type:'GET',
      url:`/my/article/cates/${id}`,
      success:function(res){
        console.log(id);
        
        form.val('xiugaiForm',res.data)
      }
    })
  })

  

  $('body').on('submit','.xiugaiForm',function(e){
    e.preventDefault()
    $.ajax({
      type:'POST',
      url:'/my/article/updatecate',
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layer.msg('erro')
        }
        layer.msg('成功')
        layer.close(editIndex)
        innitArtical()
      }
    })
    
  })
  let delIndex=null
  $('body').on('click','.del-btn',function(){
    let id=$(this).attr('data-id')
    console.log(id);
    layer.confirm('是否删除', {icon: 3, title:'提示'}, function(index){
      //do something
      $.ajax({
        type:'get',
        url:`/my/article/deletecate/${id}`,
        success:function(res){
          if(res.status!==0){
            return layer.msg('erro')
          }
          layer.msg('ok')
          innitArtical()
        }
        
      })
      layer.close(index);
    });
   
  })
})