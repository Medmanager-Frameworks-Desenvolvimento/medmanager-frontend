<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-extrabold text-[#2b4c5e]">Lista de Medicamentos</h2>
      <PrimaryButton text="Adicionar Medicamento" :icon="Plus" @click="$router.push('/medicamentos/novo')" />
    </div>

    <DataTable 
      :columns="colunasTabela" 
      :items="medicamentosFiltrados"
      v-model:searchQuery="filtroTexto"
    >
      <template #cell-descricao="{ item }">
        <span>{{ item.descricao || '-' }}</span>
      </template>

      <template #cell-validade="{ item }">
        <span>{{ formatarData(item.validade) }}</span>
      </template>

      <template #actions="{ item }">
        <TableActions 
          @view="abrirModalVisualizar(item)"
          @edit="editarMedicamento(item)"
          @delete="excluirMedicamento(item)"
        />
      </template>
    </DataTable>

    <BaseModal :is-open="isModalOpen" @close="isModalOpen = false">
      <div v-if="medicamentoSelecionado">
        <div class="flex items-center gap-3 mb-6">
          <Eye class="w-6 h-6 text-[#2b4c5e]" stroke-width="2" />
          <h3 class="text-lg font-bold text-gray-900">Visualizar Medicamento</h3>
        </div>
        <div class="space-y-5 text-sm text-gray-800">
          <div>
            <p class="font-bold mb-0.5">Nome do Medicamento:</p>
            <p>{{ medicamentoSelecionado.nome }}</p>
          </div>
          <div>
            <p class="font-bold mb-0.5">Descrição:</p>
            <p>{{ medicamentoSelecionado.descricao || '-' }}</p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="font-bold mb-0.5">Quantidade:</p>
              <p>{{ medicamentoSelecionado.quantidade }}</p>
            </div>
            <div>
              <p class="font-bold mb-0.5">Validade:</p>
              <p>{{ formatarData(medicamentoSelecionado.validade) }}</p>
            </div>
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
import MedicamentosService from '../../services/medicamentos'; 

const router = useRouter();

const colunasTabela = [
  { key: 'nome', label: 'Nome' },
  { key: 'descricao', label: 'Descrição' },
  { key: 'quantidade', label: 'Quantidade' },
  { key: 'validade', label: 'Validade' } 
];

const medicamentos = ref([]);
const filtroTexto = ref(''); 

const carregarMedicamentos = async () => {
  try {
    const resposta = await MedicamentosService.listar();
    medicamentos.value = resposta.data;
  } catch (error) {
    console.error('Erro ao buscar medicamentos:', error);
  }
};

onMounted(() => {
  carregarMedicamentos();
});

const medicamentosFiltrados = computed(() => {
  const busca = filtroTexto.value.toLowerCase().trim();
  
  if (!busca) return medicamentos.value;

  return medicamentos.value.filter(m => {
    return (m.nome && m.nome.toLowerCase().includes(busca)) || 
           (m.descricao && m.descricao.toLowerCase().includes(busca));
  });
});

const formatarData = (data) => {
  if (!data) return '-';
  if (data.includes('/')) return data;
  
  const dataObj = new Date(data);

  const dia = String(dataObj.getDate() + 1).padStart(2, '0');
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
  const ano = dataObj.getFullYear();
  
  return `${dia}/${mes}/${ano}`;
};

const isModalOpen = ref(false);
const medicamentoSelecionado = ref(null);

const abrirModalVisualizar = (medicamento) => {
  medicamentoSelecionado.value = medicamento;
  isModalOpen.value = true;
};

const editarMedicamento = (medicamento) => {
  router.push(`/medicamentos/${medicamento.id}/editar`);
};

const isConfirmModalOpen = ref(false);
const isDeletedModalOpen = ref(false); 
const medicamentoParaExcluir = ref(null);

const excluirMedicamento = (medicamento) => {
  medicamentoParaExcluir.value = medicamento;
  isConfirmModalOpen.value = true;
};

const confirmarExclusao = async () => {
  if (!medicamentoParaExcluir.value) return;

  try {
    await MedicamentosService.excluir(medicamentoParaExcluir.value.id);
    
    isConfirmModalOpen.value = false;
    medicamentoParaExcluir.value = null;
    carregarMedicamentos(); 

    isDeletedModalOpen.value = true;

    setTimeout(() => {
      isDeletedModalOpen.value = false;
    }, 1000);

  } catch (error) {
    console.error('Erro ao excluir:', error);
    alert('Ocorreu um erro ao tentar excluir o medicamento.'); 
  }
};
</script>