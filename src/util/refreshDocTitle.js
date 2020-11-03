export default  function refreshDocTitle(title){
    document.title = title;
// 针对 iphone 浏览时标题无法更新的问题解决办法
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger" && ua.indexOf('iphone') > 0) {
        var i = document.createElement('iframe');
        i.src = '/favicon.ico';
        i.style.display = 'none';

        i.onload =function() {
          setTimeout(function(){
              i.remove();
          }, 9)
        } 
        document.body.appendChild(i);
    }
}
