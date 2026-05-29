<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-extrabold text-[#2b4c5e]">Lista de Pacientes</h2>
      <PrimaryButton text="Adicionar Paciente" :icon="Plus" @click="$router.push('/pacientes/novo')" />
    </div>

    <DataTable 
      :columns="colunasTabela" 
      :items="pacientesFiltrados"
      v-model:searchQuery="filtroTexto"
    >
      <template #cell-doenca_cronica="{ item }">
        <span>{{ formatarDoencas(item.doenca_cronica) }}</span>
      </template>

      <template #actions="{ item }">
        <TableActions 
          @view="abrirModalVisualizar(item)"
          @edit="editarPaciente(item)"
          @delete="excluirPaciente(item)"
        />
      </template>
    </DataTable>

    <BaseModal :is-open="isModalOpen" @close="isModalOpen = false">
      <div v-if="pacienteSelecionado">
        <div class="flex items-center gap-3 mb-6">
          <Eye class="w-6 h-6 text-[#2b4c5e]" stroke-width="2" />
          <h3 class="text-lg font-bold text-gray-900">Visualizar Paciente</h3>
        </div>
        <div class="space-y-5 text-sm text-gray-800">
          <div>
            <p class="font-bold mb-0.5">Nome Completo:</p>
            <p>{{ pacienteSelecionado.nome }}</p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="font-bold mb-0.5">CPF:</p>
              <p>{{ pacienteSelecionado.cpf }}</p>
            </div>
            <div>
              <p class="font-bold mb-0.5">Idade:</p>
              <p>{{ pacienteSelecionado.idade }} anos</p>
            </div>
          </div>
          <div>
            <p class="font-bold mb-0.5">Doença Crônica:</p>
            <ul 
              v-if="pacienteSelecionado.doenca_cronica && pacienteSelecionado.doenca_cronica.length > 0"
              class="max-h-16 overflow-y-auto pr-2"
            >
              <li v-for="(doenca, index) in pacienteSelecionado.doenca_cronica" :key="index" class="mb-1">
                {{ doenca }}
              </li>
            </ul>
            <p v-else>-</p>
          </div>
        </div>
      </div>
    </BaseModal>
    
    <ConfirmModal 
      :is-open="isConfirmModalOpen" 
      @close="isConfirmModalOpen = false"
      @confirm="confirmarExclusao"
    />

    <DeletedModal 
      :is-open="isDeletedModalOpen" 
      @close="isDeletedModalOpen = false"
    />

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Plus, Eye } from 'lucide-vue-next';
import PrimaryButton from '../../components/common/PrimaryButton.vue';
import DataTable from '../../components/common/DataTable.vue';
import TableActions from '../../components/common/TableActions.vue';
import BaseModal from '../../components/common/BaseModal.vue';
import ConfirmModal from '../../components/common/ConfirmModal.vue'; 
import DeletedModal from '../../components/common/DeletedModal.vue'; 
import PacientesService from '../../services/pacientes';

const router = useRouter();

const colunasTabela = [
  { key: 'nome', label: 'Nome' },
  { key: 'cpf', label: 'CPF' },
  { key: 'idade', label: 'Idade' },
  { key: 'doenca_cronica', label: 'Doença Crônica' } 
];

const pacientes = ref([]);
const filtroTexto = ref(''); 

const carregarPacientes = async () => {
  try {
    const resposta = await PacientesService.listar();
    pacientes.value = resposta.data;
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
  }
};

onMounted(() => {
  carregarPacientes();
});

const pacientesFiltrados = computed(() => {
  const busca = filtroTexto.value.toLowerCase().trim();
  
  if (!busca) return pacientes.value;

  return pacientes.value.filter(p => {
    return (p.nome && p.nome.toLowerCase().includes(busca)) || 
           (p.cpf && p.cpf.includes(busca));
  });
});

const formatarDoencas = (doencas) => {
  if (!doencas || doencas.length === 0) return '-';
  if (doencas.length === 1) return doencas[0];
  return `${doencas[0]}...`;
};

const isModalOpen = ref(false);
const pacienteSelecionado = ref(null);

const abrirModalVisualizar = (paciente) => {
  pacienteSelecionado.value = paciente;
  isModalOpen.value = true;
};

const editarPaciente = (paciente) => {
  router.push(`/pacientes/${paciente.id}/editar`);
};

const isConfirmModalOpen = ref(false);
const isDeletedModalOpen = ref(false); 
const pacienteParaExcluir = ref(null);

const excluirPaciente = (paciente) => {
  pacienteParaExcluir.value = paciente;
  isConfirmModalOpen.value = true;
};

const confirmarExclusao = async () => {
  if (!pacienteParaExcluir.value) return;

  try {
    await PacientesService.excluir(pacienteParaExcluir.value.id);
    
    isConfirmModalOpen.value = false;
    pacienteParaExcluir.value = null;
    carregarPacientes(); 

    isDeletedModalOpen.value = true;

    setTimeout(() => {
      isDeletedModalOpen.value = false;
    }, 1000);

  } catch (error) {
    console.error('Erro ao excluir:', error);
    alert('Ocorreu um erro ao tentar excluir o paciente.'); 
  }
};
</script>