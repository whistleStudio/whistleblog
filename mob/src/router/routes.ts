const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/poem",
    name: "poem",
    component: () => import("@/views/Poem.vue")
  },
  {
    path: "/poem/about", // 新增：about页独立路由
    name: "poemAbout",
    component: () => import("@/views/Poem.vue")
  },
  {
    path: "/music",
    name: "music",
    component: () => import("@/views/Music.vue")
  },
  {
    path: "/essay",
    name: "essay",
    component: () => import("@/views/Essay.vue")
  },
  {
    path: "/essay/:id", // 新增：带title参数的详情页
    name: "EssayView",
    component: () => import("@/views/Essay.vue")
  }
]
export {routes}
