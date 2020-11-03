// {/* <script type="text/javascript">  */}
//
// 			if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
// 				window.onresize=window.onload=function(){
// 					document.documentElement.style.fontSize=375/3.2+"px";
// 					//1rem=100px
// 				}
// 			} else{
// 				window.onresize=window.onload=function(){
// 					var width=document.getElementsByTagName("body")[0].clientWidth;
// 					document.documentElement.style.fontSize=width/3.2+"px";
// 					//1rem=100px
// 				}
// 			}
	// </script>



// 1 rem=100px ,以375宽度基准
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
