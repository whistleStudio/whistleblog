const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home.vue")
  }
]
export {routes}
