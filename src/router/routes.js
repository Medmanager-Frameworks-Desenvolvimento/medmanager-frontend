import AuthLayout from '../layouts/auth/AuthLayout.vue'
import LoginView from '../views/auth/LoginView.vue'
import CadastroView from '../views/auth/CadastroView.vue'
import MainLayout from '../layouts/MainLayout.vue'
import DashboardView from '../views/dashboard/DashboardView.vue'
import PacientesView from '../views/patients/PacientesView.vue'
import AddPacientesView from '../views/patients/AddPacientesView.vue'
import EditarPacienteView from '../views/patients/EditarPacienteView.vue'
import MedicamentosView from '../views/medications/MedicamentosView.vue'
import AddMedicamentosView from '../views/medications/AddMedicamentosView.vue'
import EditarMedicamentoView from '../views/medications/EditarMedicamentoView.vue'
import EnfermeirosView from '../views/nurses/EnfermeirosView.vue'
import AddEnfermeirosView from '../views/nurses/AddEnfermeirosView.vue'
import EditarEnfermeiroView from '../views/nurses/EditarEnfermeiroView.vue'
import PrescricoesView from '../views/prescriptions/PrescricoesView.vue'
import AddPrescricaoView from '../views/prescriptions/AddPrescricaoView.vue'
import EditarPrescricaoView from '../views/prescriptions/EditarPrescricaoView.vue'

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
      },
      {
        path: 'medicamentos',
        name: 'Medicamentos',
        component: MedicamentosView
      },
      {
        path: 'medicamentos/novo',
        name: 'AdicionarMedicamento',
        component: AddMedicamentosView
      }, 
      {
        path: 'medicamentos/:id/editar', 
        name: 'EditarMedicamento', 
        component: EditarMedicamentoView
      },
      {
        path: 'enfermeiros',
        name: 'Enfermeiros',
        component: EnfermeirosView
      },
      {
        path: 'enfermeiros/novo',
        name: 'AdicionarEnfermeiro',
        component: AddEnfermeirosView
      },
      {
        path: 'enfermeiros/:id/editar',
        name: 'EditarEnfermeiro',
        component: EditarEnfermeiroView
      },
      {
        path: 'prescricoes',
        name: 'Prescricoes',
        component: PrescricoesView
      },
      {
        path: 'prescricoes/nova',
        name: 'AdicionarPrescricao',
        component: AddPrescricaoView
      },
      {
        path: 'prescricoes/:id/editar',
        name: 'EditarPrescricao',
        component: EditarPrescricaoView
      }
    ]
  }
]

export default routes