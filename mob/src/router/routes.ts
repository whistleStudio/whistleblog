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
    path: "/music",
    name: "music",
    component: () => import("@/views/Music.vue")
  },
  {
    path: "/essay",
    name: "essay",
    component: () => import("@/views/Essay.vue")
  }
]
export {routes}
