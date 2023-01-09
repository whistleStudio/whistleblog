### [09221728] 1st commit

### [09231728]

1 首页样式大概想通了

### [09252100]

1 首页布局基本OK

2 audio标签获取 要用.value[0], play()受chrome浏览器限制autoplay要在用户点击后才能正常播放

### [09261726]

1 添加了vue-router

### [09262126]

1 poem页导航

### [09281735]

-  server

1 目录结构规划

2 Poem路由 - getMenu

3 db whistleblog建立

- client

1 poem页getMenu相关逻辑

### [09291736]

- client

1 poem页作者，类目，诗歌选择切换相关逻辑；基本上OK了，就差个about

2 music页 grid布局左边打散歌名

- server

1 poem- getPoem

2 dbMap.json 内容扩充

### [09301725]

- client

1 music 样式结构OK

- server

1 数据库music创建

### [10022213]

- client 

1 music - onBeforeMount getMusicList请求

- server

1 musicApi - getMusicList

...

...

### [10102309]

- client

1 essay页布局

### [10111726]

- client

1 essay - 目录展开演示；文章方块分布微调左右顶边

### [10181739]

- client,server

【学习】vue里dom注册的事件，传入的参数在注册时就已经确定，事件触发，并不会重新调用重新传参；若参数是变量，也需要响应式；

1 essay - 分页请求，关键词搜索请求

### [10191732]

- client

1 essay - iframe跨域消息通信，解决高度自适应；自动化脚本formatHtml.js解决typora导出html文件格式问题

2 essay - 目录也改用动态请求

- server

1 essayApi - getCate

2  增加homeApi, 分发首页数据

### [10201741]

- client

1 home页动态请求完成

2 【修复】poem页激活文章下划线显示BUG

- server

1 新增若干篇poem

### [10211711]

服务器发布

- client

1 【修复】public目录静态文件引用时，不能直使用文件名，要加上`/` ，否则发布时会404；poem页目录格式调整

- server

1 首页请求，静态文件引用中间件

### [10271731]

- mob

开始写移动端页面，vite基本配置OK，home基本样式内容OK

### [10281724]

- mob

移动端peom music页OK

### [10290104]

- mob

移动端 essay页OK

- 新增mobsv
- 服务器部署完毕

### [202301091719]

文档资料内容更新完毕

【增加】poem页about相关内容

【修复】essay页列表条目内容超出问题