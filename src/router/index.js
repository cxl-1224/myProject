import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: '/recommend',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: "recommend",
        // alias: 'recommend',
        name: "Recommend",
        component: () => import('../views/Recommend.vue'),

      },

      {
        path: "search",
        name: "Search",
        component: () => import('../views/Search.vue'),

      },

      {
        path: "hotList",
        name: "HotList",
        component: () => import('../views/HotList.vue'),

      },
    ]
  },
  {
    path: "/playList",
    name: 'PlayList',
    component: () => import('../views/PlayList.vue'),
  },
  { path: '*', redirect: '/recommend' }

]

const router = new VueRouter({
  routes
})

export default router
