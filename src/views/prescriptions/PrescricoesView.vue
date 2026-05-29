<template>
  <div>
    <div class="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 relative z-30">
      <h2 class="text-xl font-extrabold text-[#2b4c5e]">Lista de Prescrições</h2>
      
      <div class="flex items-center gap-4">
        
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Pesquisar"
            class="pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2b4c5e] focus:border-[#2b4c5e] w-full md:w-64 text-gray-600"
          />
          <Search class="w-4 h-4 text-gray-400 absolute right-3 top-3" />
        </div>

        <div class="relative">
          <button 
            @click="isFilterOpen = !isFilterOpen"
            class="flex items-center gap-3 px-5 py-2.5 bg-white border border-[#a8a8a8] rounded-xl text-sm font-medium text-[#a8a8a8] hover:bg-gray-50 hover:border-gray-500 hover:text-gray-500 transition-colors focus:outline-none"
          >
            <ListFilter class="w-4 h-4" stroke-width="2" />
            Filtrar
          </button>
          
          <div v-if="isFilterOpen" class="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg z-20 py-1">
            <button @click="selecionarFiltro('')" :class="['block w-full text-left px-4 py-2 text-sm hover:bg-gray-50', turnoFilter === '' ? 'font-bold text-[#2b4c5e]' : 'text-gray-700']">Todos os Turnos</button>
            <button @click="selecionarFiltro('Manhã')" :class="['block w-full text-left px-4 py-2 text-sm hover:bg-gray-50', turnoFilter === 'Manhã' ? 'font-bold text-[#2b4c5e]' : 'text-gray-700']">Manhã</button>
            <button @click="selecionarFiltro('Tarde')" :class="['block w-full text-left px-4 py-2 text-sm hover:bg-gray-50', turnoFilter === 'Tarde' ? 'font-bold text-[#2b4c5e]' : 'text-gray-700']">Tarde</button>
            <button @click="selecionarFiltro('Noite')" :class="['block w-full text-left px-4 py-2 text-sm hover:bg-gray-50', turnoFilter === 'Noite' ? 'font-bold text-[#2b4c5e]' : 'text-gray-700']">Noite</button>
          </div>
        </div>

        <PrimaryButton text="Adicionar Prescrição" :icon="Plus" @click="$router.push('/prescricoes/nova')" />
      </div>
    </div>

    <div v-if="menuAberto || isFilterOpen" @click="fecharMenus" class="fixed inset-0 z-10"></div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <div 
        v-for="item in prescricoesPaginadas" 
        :key="item.id"
        :class="[
          'bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow relative',
          menuAberto === item.id ? 'z-40' : 'z-10'
        ]"
      >
        <div class="absolute top-4 right-4 flex items-center gap-2">
          <span :class="['text-xs font-bold px-3 py-1 rounded-full text-white shadow-sm', getTurnoClass(item.turno)]">
            {{ item.turno }}
          </span>
          
          <div class="relative">
            <button @click="toggleMenu(item.id)" class="text-gray-400 hover:text-gray-600 focus:outline-none">
              <MoreVertical class="w-5 h-5" />
            </button>

            <div v-if="menuAberto === item.id" class="absolute top-[-8px] left-full ml-1 bg-white border border-gray-300 rounded-xl shadow-xl z-50 flex flex-col w-12 items-center py-2 gap-2">
              <button @click.stop="abrirModalVisualizar(item)" class="text-[#2b4c5e] hover:opacity-70 transition-opacity p-1" title="Visualizar">
                <Eye class="w-5 h-5" />
              </button>
              <div class="w-8 border-t border-gray-200"></div>
              <button @click.stop="editarPrescricao(item)" class="text-[#65a368] hover:opacity-70 transition-opacity p-1" title="Editar">
                <Pencil class="w-[18px] h-[18px]" stroke-width="2.5" />
              </button>
              <div class="w-8 border-t border-gray-200"></div>
              <button @click.stop="excluirPrescricao(item)" class="text-[#e52e2e] hover:opacity-70 transition-opacity p-1" title="Excluir">
                <Trash2 class="w-5 h-5" stroke-width="2" />
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-start gap-4 mb-4 mt-2">
          <div class="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-400 text-gray-500 shrink-0">
            <User class="w-6 h-6" />
          </div>
          <div class="flex-1 pr-16 min-w-0">
            <p class="text-[10px] font-bold text-gray-500 uppercase leading-tight mb-0.5">Paciente:</p>
            <p class="text-sm font-medium text-gray-900 mb-1 leading-tight">{{ item.paciente?.nome }}, {{ item.paciente?.idade }} anos</p>
            <p class="text-[10px] font-bold text-gray-500 uppercase leading-tight mb-0.5">Doença Crônica:</p>
            <p class="text-[13px] text-gray-800 leading-tight truncate">{{ formatarDoencas(item.paciente?.doenca_cronica) }}</p>
          </div>
        </div>

        <hr class="border-gray-200 mb-4" />

        <div class="flex items-start gap-4 mb-4">
          <div :class="[
            'flex items-center justify-center w-12 h-12 rounded-full shrink-0',
            item.tomou_medicacao ? 'bg-[#e6f4ea] text-[#4caf50]' : 'bg-[#fce8e8] text-[#e57373]'
          ]">
            <Pill class="w-6 h-6" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-[10px] font-bold text-gray-500 uppercase leading-tight mb-0.5">Medicamento:</p>
            <p class="text-sm font-medium text-gray-900 mb-1.5 leading-tight">{{ item.medicamento?.nome }}</p>
            <p class="text-[13px] text-gray-700 leading-tight mb-0.5">Dosagem: {{ item.dosagem }}</p>
            <p class="text-[13px] text-gray-700 leading-tight">Quantidade: {{ item.quantidade }} {{ item.unidade_medida || 'unid.' }}</p>
          </div>
        </div>

        <hr class="border-gray-200 mb-4" />

        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-[10px] font-bold text-gray-500 uppercase leading-tight mb-1">Horário:</p>
            <p class="text-[13px] text-gray-700 leading-tight mb-0.5">Turno: {{ item.turno }}</p>
            <p class="text-[13px] text-gray-700 leading-tight">Hora: {{ formatarHora(item.data_hora) }}</p>
          </div>
          
          <div>
            <p class="text-[10px] font-bold text-gray-500 uppercase leading-tight mb-1">Responsável:</p>
            <p class="text-[13px] text-gray-700 leading-tight truncate">Enf. {{ item.enfermeiro?.nome }}</p>
          </div>
        </div>

      </div>
    </div>

    <div v-if="totalPaginas > 1" class="flex justify-center items-center mt-10 gap-2">
      <button 
        @click="irParaPagina(currentPage - 1)" 
        :disabled="currentPage === 1"
        class="px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Anterior
      </button>
      
      <button 
        v-for="pagina in totalPaginas" 
        :key="pagina"
        @click="irParaPagina(pagina)"
        :class="[
          'w-8 h-8 flex items-center justify-center rounded-lg border text-sm font-medium transition-colors',
          currentPage === pagina ? 'bg-[#2b4c5e] text-white border-[#2b4c5e]' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
        ]"
      >
        {{ pagina }}
      </button>
      
      <button 
        @click="irParaPagina(currentPage + 1)" 
        :disabled="currentPage === totalPaginas"
        class="px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Próxima
      </button>
    </div>

    <div v-if="prescricoesFiltradas.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-200 mt-6">
      <p class="text-gray-500">Nenhuma prescrição encontrada.</p>
    </div>

    <ConfirmModal 
      :is-open="isConfirmModalOpen" 
      @close="isConfirmModalOpen = false"
      @confirm="confirmarExclusao"
    />

    <DeletedModal 
      :is-open="isDeletedModalOpen" 
      @close="isDeletedModalOpen = false"
    />

    <ViewPrescricaoModal 
      :is-open="isViewModalOpen"
      :prescricao="prescricaoSelecionada"
      :salvando="salvandoStatus"
      @close="isViewModalOpen = false"
      @save="salvarStatusMedicacao"
    />

    <SuccessModal 
      :is-open="isSuccessModalOpen" 
      title="Status atualizado!"
      @close="isSuccessModalOpen = false" 
    />

  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'; // Adicionado watch
import { useRouter } from 'vue-router';
import { Plus, Search, ListFilter, MoreVertical, User, Pill, Eye, Pencil, Trash2 } from 'lucide-vue-next';
import PrimaryButton from '../../components/common/PrimaryButton.vue';
import ConfirmModal from '../../components/common/ConfirmModal.vue'; 
import DeletedModal from '../../components/common/DeletedModal.vue'; 
import SuccessModal from '../../components/common/SuccessModal.vue';
import ViewPrescricaoModal from '../../components/prescriptions/PrescriptionModal.vue'; 
import PrescricoesService from '../../services/prescricoes';

const router = useRouter();

const prescricoes = ref([]);
const searchQuery = ref('');
const turnoFilter = ref(''); 
const isFilterOpen = ref(false);
const menuAberto = ref(null);

const currentPage = ref(1);
const itemsPerPage = 6;

const carregarPrescricoes = async () => {
  try {
    const resposta = await PrescricoesService.listar();
    prescricoes.value = resposta.data;
  } catch (error) {
    console.error('Erro ao buscar prescrições:', error);
  }
};

onMounted(() => {
  carregarPrescricoes();
});

const prescricoesFiltradas = computed(() => {
  let result = prescricoes.value;
  const busca = searchQuery.value.toLowerCase().trim();

  if (busca) {
    result = result.filter(p => {
      const nomePaciente = p.paciente?.nome?.toLowerCase() || '';
      const nomeMed = p.medicamento?.nome?.toLowerCase() || '';
      return nomePaciente.includes(busca) || nomeMed.includes(busca);
    });
  }

  if (turnoFilter.value) {
    result = result.filter(p => p.turno === turnoFilter.value);
  }

  return result;
});

watch([searchQuery, turnoFilter], () => {
  currentPage.value = 1;
});

const totalPaginas = computed(() => {
  return Math.ceil(prescricoesFiltradas.value.length / itemsPerPage);
});

const prescricoesPaginadas = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return prescricoesFiltradas.value.slice(start, end);
});

const irParaPagina = (pagina) => {
  if (pagina >= 1 && pagina <= totalPaginas.value) {
    currentPage.value = pagina;
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }
};

const selecionarFiltro = (turno) => {
  turnoFilter.value = turno;
  isFilterOpen.value = false;
};

const toggleMenu = (id) => {
  menuAberto.value = menuAberto.value === id ? null : id;
};

const fecharMenus = () => {
  menuAberto.value = null;
  isFilterOpen.value = false;
};

const getTurnoClass = (turno) => {
  switch(turno) {
    case 'Manhã': return 'bg-[#fdeb4e] text-gray-800'; 
    case 'Tarde': return 'bg-orange-400';
    case 'Noite': return 'bg-blue-400';
    default: return 'bg-gray-400';
  }
};

const formatarHora = (dataString) => {
  if (!dataString) return '-';
  const data = new Date(dataString);
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

const formatarDoencas = (doencas) => {
  if (!doencas || doencas.length === 0) return '-';
  if (doencas.length === 1) return doencas[0];
  return `${doencas[0]}...`;
};

const isViewModalOpen = ref(false);
const prescricaoSelecionada = ref(null);
const salvandoStatus = ref(false);
const isSuccessModalOpen = ref(false);

const abrirModalVisualizar = (prescricao) => {
  fecharMenus();
  prescricaoSelecionada.value = prescricao;
  isViewModalOpen.value = true;
};

const salvarStatusMedicacao = async (novoStatus) => {
  if (!prescricaoSelecionada.value) return;

  try {
    salvandoStatus.value = true;
    
    await PrescricoesService.atualizar(prescricaoSelecionada.value.id, {
      tomou_medicacao: novoStatus
    });

    isViewModalOpen.value = false;
    isSuccessModalOpen.value = true;

    await carregarPrescricoes();

    setTimeout(() => {
      isSuccessModalOpen.value = false;
    }, 1500);

  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    alert('Ocorreu um erro ao tentar salvar o status da medicação.');
  } finally {
    salvandoStatus.value = false;
  }
};

const editarPrescricao = (prescricao) => {
  fecharMenus();
  router.push(`/prescricoes/${prescricao.id}/editar`);
};

const isConfirmModalOpen = ref(false);
const isDeletedModalOpen = ref(false); 
const prescricaoParaExcluir = ref(null);

const excluirPrescricao = (prescricao) => {
  fecharMenus();
  prescricaoParaExcluir.value = prescricao;
  isConfirmModalOpen.value = true;
};

const confirmarExclusao = async () => {
  if (!prescricaoParaExcluir.value) return;

  try {
    await PrescricoesService.excluir(prescricaoParaExcluir.value.id);
    
    isConfirmModalOpen.value = false;
    prescricaoParaExcluir.value = null;
    await carregarPrescricoes(); 

    if (prescricoesPaginadas.value.length === 0 && currentPage.value > 1) {
      currentPage.value--;
    }

    isDeletedModalOpen.value = true;
    setTimeout(() => {
      isDeletedModalOpen.value = false;
    }, 1000);

  } catch (error) {
    console.error('Erro ao excluir:', error);
    alert('Ocorreu um erro ao tentar excluir a prescrição.'); 
  }
};
</script>