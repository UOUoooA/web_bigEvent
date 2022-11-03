$(()=>{
  let layer=layui.layer
  let form=layui.form
  innitCate()
  initEditor()
  function innitCate(){
    $.ajax({
      type:'get',
      url:'/my/article/cates',
      success:function(res){
        if(res.status!==0){
          layer.msg('失败')
        }
        console.log(res);
        
       let cateStr = template('tpl-cate',res)
        $('[name=cate_id]').html(cateStr)
        form.render()
      }
    })
  }
     // 1. 初始化图片裁剪器
     var $image = $('#image')
     
     // 2. 裁剪选项
     var options = {
       aspectRatio: 400 / 280,
       preview: '.img-preview'
     }
     
     // 3. 初始化裁剪区域
     $image.cropper(options)


     $('.chooseBtn').on('click',function(){
       $('[type=file]').click()
     })

     $('[type=file]').on('change',function(e){
      const file =e.target.files
      if(file.length==0){
        return
      }
      var newImgURL = URL.createObjectURL(file[0])
      $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)  
     })
     let saveState='已发布'
     $('.save2').on('click',function(){
       saveState='草稿'
     })
     $('.dataForm').on('submit',function(e){
       e.preventDefault()
       let formData=new FormData($(this)[0])
       formData.append('state',saveState)

       $image
  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作

    formData.append('cover_img',blob)
    pubArtical(formData)
  })
  // 发布请求函数
 
     })
     function pubArtical(fd){
      console.log(fd);

       $.ajax({
         type:'post',
         url:'/my/article/add',
         data:fd,
         contentType:false,
         processData:false,
         success:function(res){
           console.log(123);
           
           if(res.status!==0){
           return layer.msg('发布失败')
           }
           layer.msg('发布成功')
           location.href='/artical_list.html'
          }
       })
     }
})