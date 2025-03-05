import { createRouter, createWebHistory } from 'vue-router'
import Tables from '@/views/Tables.vue'

const routes = [
        {
                name: 'Tables',
                path: '/',
                component: Tables
        },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
	console.log('Global Guard')

	next()
})

export default router
