$.ajaxPrefilter(function(options){
 options.url='http://big-event-api-t.itheima.net'+options.url
//  options.url='http://api-breakingnews-web.itheima.net'+options.url
 
 if(options.url.indexOf('/my/')!==-1){
 options.headers={
  Authorization: localStorage.getItem('token') ||''
 }
}

})