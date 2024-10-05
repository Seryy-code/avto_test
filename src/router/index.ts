import { createRouter, createWebHistory } from 'vue-router'
import TableView from '../views/TableView.vue'
import AboutView from '../views/AboutView.vue'
import ArchiveView from '@/views/ArchiveView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'table',
      component: TableView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/archive',
      name: 'archive',
      component: ArchiveView
    }
  ]
})

export default router
