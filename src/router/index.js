import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes' 
import { useAuthStore } from '../stored/auth'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/cadastro'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.isAuthenticated) {
    return next('/login'); 
  }

  next();
});

export default router