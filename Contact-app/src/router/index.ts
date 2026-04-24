import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ContactsView from '../views/ContactsView.vue'
import ContactDetailView from '../views/ContactDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
    { path: '/contacts', component: ContactsView, meta: { requiresAuth: true } },
    { path: '/contacts/:id', component: ContactDetailView, meta: { requiresAuth: true } },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
