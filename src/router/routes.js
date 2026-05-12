import AuthLayout from '../layouts/AuthLayout.vue'
import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'
import MainLayout from '../layouts/MainLayout.vue'
import DashboardView from '../views/DashboardView.vue'

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