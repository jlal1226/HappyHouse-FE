import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BoardListView from '@/views/BoardListView.vue'
import HouseDealView from '@/views/HouseDealView.vue'
import InterestView from '@/views/InterestView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/board',
    name: 'board',
    component: BoardListView
  },
  {
    path: '/deal',
    name : 'deal',
    component : HouseDealView
  },
  {
    path : '/interest',
    name : 'interest',
    component : InterestView


  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
