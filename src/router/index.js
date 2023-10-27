import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    component:()=>import("@/views/LayoutView.vue"),
    redirect:"/home",
    children:[{
        path:"/home",
        component:()=>import("@/views/home/HomeView.vue")
      },
      {
        path:"/blog",
        component:()=>import("@/views/blog/BlogView.vue")
      },
      {
        path:"/categries",
        component:()=>import("@/views/categries/CategriesView.vue")
      }
    ]
  },
  {
    path:"/edit",
    component:()=>import("@/views/edit/EditView.vue"),
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
