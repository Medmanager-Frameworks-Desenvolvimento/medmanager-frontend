import AuthLayout from '../layouts/auth/AuthLayout.vue'
import LoginView from '../views/auth/LoginView.vue'
import CadastroView from '../views/auth/CadastroView.vue'
import MainLayout from '../layouts/MainLayout.vue'
import DashboardView from '../views/dashboard/DashboardView.vue'

const routes = [
  {
    path: '/',
    component: AuthLayout,
    redirect: '/login', 
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginView
      },
      {
        path: 'cadastro',
        name: 'Cadastro',
        component: CadastroView
      }
    ]
  },
  {
    path: '/',
    component: MainLayout, 
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardView, 
      },
      
    ]
  }
]

export default routes