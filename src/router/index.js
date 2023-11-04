import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    component:()=>import("@/views/LoadingView.vue")
  },
  {
    path:"/win",
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
      },
    ],
  },
  {
    path:"/mobile",
    component:()=>import("@/views/mobile/MobileLayout.vue"),
    redirect:"/mobile/home",
    children:[{
        path:"/mobile/home",
        component:()=>import("@/views/mobile/MobileHome.vue")
      },
      {
        path:"/mobile/blog",
        component:()=>import("@/views/mobile/MobileBlog.vue")
      },
    ]
  },
  {
    path:"/edit",
    component:()=>import("@/views/edit/EditView.vue"),
  },
  {
    path:"/loading",
    component:()=>import("@/views/LoadingView.vue"),
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
