import AuthLayout from '../layouts/auth/AuthLayout.vue'
import LoginView from '../views/auth/LoginView.vue'
import CadastroView from '../views/auth/CadastroView.vue'
import MainLayout from '../layouts/MainLayout.vue'
import DashboardView from '../views/dashboard/DashboardView.vue'
import PacientesView from '../views/patients/PacientesView.vue'
import AddPacientesView from '../views/patients/AddPacientesView.vue'
import EditarPacienteView from '../views/patients/EditarPacienteView.vue'

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
        name: 'Dashboard', 
        component: DashboardView, 
      },
      {
        path: 'pacientes',
        name: 'Pacientes', 
        component: PacientesView, 
      },
      {
        path: 'pacientes/novo', 
        name: 'AdicionarPaciente', 
        component: AddPacientesView
      },
      {
        path: 'pacientes/:id/editar', 
        name: 'EditarPaciente', 
        component: EditarPacienteView
      }
    ]
  }
]

export default routes