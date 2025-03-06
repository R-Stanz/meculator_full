import { createRouter, createWebHistory } from 'vue-router'
import Calculator from '@/views/Calculator.vue'

const routes = [
        {
                name: 'Home',
                path: '/',
                component: Calculator
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
