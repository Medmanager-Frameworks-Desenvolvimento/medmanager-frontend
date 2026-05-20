<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-extrabold text-[#2b4c5e]">Lista de Enfermeiros</h2>
      <PrimaryButton text="Adicionar Enfermeiro" :icon="Plus" @click="$router.push('/enfermeiros/novo')" />
    </div>

    <DataTable 
      :columns="colunasTabela" 
      :items="enfermeirosFiltrados"
      v-model:searchQuery="filtroTexto"
    >
      <template #actions="{ item }">
        <TableActions 
          @view="abrirModalVisualizar(item)"
          @edit="editarEnfermeiro(item)"
          @delete="excluirEnfermeiro(item)"
        />
      </template>
    </DataTable>

    <BaseModal :is-open="isModalOpen" @close="isModalOpen = false">
      <div v-if="enfermeiroSelecionado">
        <div class="flex items-center gap-3 mb-6">
          <Eye class="w-6 h-6 text-[#2b4c5e]" stroke-width="2" />
          <h3 class="text-lg font-bold text-gray-900">Visualizar Enfermeiro</h3>
        </div>
        <div class="space-y-5 text-sm text-gray-800">
          <div>
            <p class="font-bold mb-0.5">Nome Completo:</p>
            <p>{{ enfermeiroSelecionado.nome }}</p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="font-bold mb-0.5">CPF:</p>
              <p>{{ enfermeiroSelecionado.cpf }}</p>
            </div>
            <div>
              <p class="font-bold mb-0.5">Telefone:</p>
              <p>{{ enfermeiroSelecionado.telefone }}</p>
            </div>
          </div>
          <div>
            <p class="font-bold mb-0.5">E-mail:</p>
            <p>{{ enfermeiroSelecionado.email }}</p>
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
import EnfermeirosService from '../../services/enfermeiros';

const router = useRouter();

const colunasTabela = [
  { key: 'nome', label: 'Nome' },
  { key: 'cpf', label: 'CPF' },
  { key: 'email', label: 'E-mail' },
  { key: 'telefone', label: 'Telefone' } 
];

const enfermeiros = ref([]);
const filtroTexto = ref(''); 

const carregarEnfermeiros = async () => {
  try {
    const resposta = await EnfermeirosService.listar();
    enfermeiros.value = resposta.data;
  } catch (error) {
    console.error('Erro ao buscar enfermeiros:', error);
  }
};

onMounted(() => {
  carregarEnfermeiros();
});

const enfermeirosFiltrados = computed(() => {
  const busca = filtroTexto.value.toLowerCase().trim();
  
  if (!busca) return enfermeiros.value;

  return enfermeiros.value.filter(e => {
    return (e.nome && e.nome.toLowerCase().includes(busca)) || 
           (e.cpf && e.cpf.includes(busca));
  });
});

const isModalOpen = ref(false);
const enfermeiroSelecionado = ref(null);

const abrirModalVisualizar = (enfermeiro) => {
  enfermeiroSelecionado.value = enfermeiro;
  isModalOpen.value = true;
};

const editarEnfermeiro = (enfermeiro) => {
  router.push(`/enfermeiros/${enfermeiro.id}/editar`);
};

const isConfirmModalOpen = ref(false);
const isDeletedModalOpen = ref(false); 
const enfermeiroParaExcluir = ref(null);

const excluirEnfermeiro = (enfermeiro) => {
  enfermeiroParaExcluir.value = enfermeiro;
  isConfirmModalOpen.value = true;
};

const confirmarExclusao = async () => {
  if (!enfermeiroParaExcluir.value) return;

  try {
    await EnfermeirosService.excluir(enfermeiroParaExcluir.value.id);
    
    isConfirmModalOpen.value = false;
    enfermeiroParaExcluir.value = null;
    carregarEnfermeiros(); 

    isDeletedModalOpen.value = true;

    setTimeout(() => {
      isDeletedModalOpen.value = false;
    }, 1000);

  } catch (error) {
    console.error('Erro ao excluir:', error);
    alert('Ocorreu um erro ao tentar excluir o enfermeiro.'); 
  }
};
</script>