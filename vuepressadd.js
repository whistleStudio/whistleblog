{/* <script> */}
function sendHeight() {
  // 获取页面内容高度
  var height = document.documentElement.scrollHeight || document.body.scrollHeight;
  // 通知父页面
  window.parent.postMessage(height, '*'); // 推荐 origin 用实际父页面地址替换掉 '*'
}

// 监听页面加载和窗口变化
window.addEventListener('DOMContentLoaded', sendHeight);
window.addEventListener('resize', sendHeight);

// 如果内容有异步渲染（如图片、懒加载），可定时上报高度
let lastHeight = 0;
setInterval(() => {
  const h = document.documentElement.scrollHeight || document.body.scrollHeight;
  if (h !== lastHeight) {
    sendHeight();
    lastHeight = h;
  }
}, 800);
// </script>