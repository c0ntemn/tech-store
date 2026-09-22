import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CatalogView from '@/views/CatalogView.vue'
import ContactsView from '@/views/ContactsView.vue'
import ProductView from '@/views/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogView,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactsView,
    },
    {
      path: '/product/[:id]',
      name: 'product',
      component: ProductView,
    },
  ],
})

export default router
