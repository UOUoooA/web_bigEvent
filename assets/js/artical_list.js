$(()=>{
  let layer =layui.layer
  let form =layui.form
  let laypage = layui.laypage;
  let q={
    pagenum:1,
    pagesize:2,
    cate_id:'',
    state:''
  }
  inniTable()
  innitCate()
  
  function inniTable(){
    $.ajax({
      type:'get',
      url:'/my/article/list',
      data:q,
      success:function(res){
        if(res.status!==0){
          return layer.msg('失败')
        }
        console.log(res);
      let htmlStr =  template('tpl-table',res)
      $('.table-tb').html(htmlStr)
      renderPage(res.total)
      console.log(res.total);
      }
    })
  }

 function innitCate(){
   $.ajax({
     type:'get',
     url:'/my/article/cates',
     success:function(res){
       if(res.status!==0){
         layer.msg('失败')
       }
      let cateStr = template('tpl-cate',res)
       $('[name=cate_id]').html(cateStr)
       form.render()
     }
   })
 }

 $('.search-form').on('submit',function(e){
  e.preventDefault()
  let cid=$('[name=cate_id]').val()
  let sta=$('[name=state]').val()
  q.cate_id=cid
  q.state=sta
  inniTable()
 })

 function renderPage(totalPage){
  laypage.render({
    elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
    ,count: totalPage, //数据总数，从服务端得到
    limit:q.pagesize,
    curr:q.pageNum,
    jump:function(obj,first){
      q.pageNum=obj.curr
      if(!first){
        inniTable()
      }
    }
  });
   
 }
 $('tbody').on('click','.del-btn',function(e){
   e.preventDefault()
   let len=$('.del-btn').length
   let id=$(this).attr('data-id')
   layer.confirm('是否删除?', {icon: 3, title:'提示'}, function(index){
    $.ajax({
      type:'get',
      url:'/my/article/delete/'+id,
      success:function(res){
        if(res.status!==0){
          return layer.msg('erro')
        }
        layer.msg('删除成功')
        if(len==1){
          q.pageNum = q.pageNum==1?1:q.pageNum-1
        }
        inniTable()
      }
    })
    
    layer.close(index);
  });
 })

 
})