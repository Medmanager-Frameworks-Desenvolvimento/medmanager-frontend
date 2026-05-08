import AuthLayout from '../layouts/AuthLayout.vue'
import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'

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
  }
]

export default routes