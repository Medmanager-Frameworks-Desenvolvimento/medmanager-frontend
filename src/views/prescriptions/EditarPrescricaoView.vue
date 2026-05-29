<template>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-xl font-extrabold text-[#2b4c5e] mb-6">Editar Prescrição</h2>

    <div class="bg-white p-8 rounded-xl border border-gray-200 shadow-sm relative">
      
      <BaseAlert :message="alertMessage" :type="alertType" />

      <div v-if="carregandoDados" class="text-center py-12 text-gray-500">
        Carregando dados da prescrição...
      </div>

      <div v-if="dropdownAberto" @click="fecharDropdowns" class="fixed inset-0 z-10"></div>

      <form v-if="!carregandoDados" @submit.prevent="salvarEdicao" class="space-y-6 relative z-20">
 
        <div class="relative">
          <label class="block text-sm font-bold text-gray-900 mb-2">
            Paciente <span class="text-red-500">*</span>
          </label>
          <div 
            @click="abrirDropdown('paciente')" 
            :class="[
              'w-full px-4 py-2.5 border rounded-lg text-sm flex justify-between items-center cursor-pointer transition-colors',
              temErroNoCampo('id_paciente') ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
            ]"
          >
            <span :class="form.id_paciente ? 'text-gray-900' : 'text-gray-400'">
              {{ getNome(pacientes, form.id_paciente) || 'Selecionar Paciente' }}
            </span>
            <ChevronDown class="w-4 h-4 text-gray-400" />
          </div>

          <div v-if="dropdownAberto === 'paciente'" class="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-30">
            <div class="p-2 border-b border-gray-100">
              <input v-model="buscas.paciente" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#2b4c5e]" placeholder="Pesquisar paciente..." autofocus />
            </div>
            <ul class="max-h-48 overflow-y-auto py-1">
              <li v-for="item in pacientesFiltrados" :key="item.id" @click="selecionarOpcao('id_paciente', item.id)" class="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer text-gray-700">
                {{ item.nome }} ({{ item.cpf }})
              </li>
              <li v-if="pacientesFiltrados.length === 0" class="px-4 py-2 text-sm text-gray-500 text-center">Nenhum paciente encontrado</li>
            </ul>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          
          <div class="relative">
            <label class="block text-sm font-bold text-gray-900 mb-2">
              Medicamento <span class="text-red-500">*</span>
            </label>
            <div 
              @click="abrirDropdown('medicamento')" 
              :class="[
                'w-full px-4 py-2.5 border rounded-lg text-sm flex justify-between items-center cursor-pointer transition-colors',
                temErroNoCampo('id_medicamento') ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
              ]"
            >
              <span :class="form.id_medicamento ? 'text-gray-900' : 'text-gray-400'">
                {{ getNome(medicamentos, form.id_medicamento) || 'Selecionar Medicamento' }}
              </span>
              <ChevronDown class="w-4 h-4 text-gray-400" />
            </div>

            <div v-if="dropdownAberto === 'medicamento'" class="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-30">
              <div class="p-2 border-b border-gray-100">
                <input v-model="buscas.medicamento" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#2b4c5e]" placeholder="Pesquisar medicamento..." autofocus />
              </div>
              <ul class="max-h-48 overflow-y-auto py-1">
                <li v-for="item in medicamentosFiltrados" :key="item.id" @click="selecionarOpcao('id_medicamento', item.id)" class="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer text-gray-700">
                  {{ item.nome }} <span class="text-xs text-gray-400 ml-1">(Estoque: {{ item.quantidade }})</span>
                </li>
                <li v-if="medicamentosFiltrados.length === 0" class="px-4 py-2 text-sm text-gray-500 text-center">Nenhum medicamento encontrado</li>
              </ul>
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-900 mb-2">
              Dosagem <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="form.dosagem" 
              type="text" 
              placeholder="Ex: 500mg, 10ml"
              :class="[
                'w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2',
                temErroNoCampo('dosagem') ? 'border-red-400 focus:ring-red-200 bg-red-50' : 'border-gray-300 focus:border-[#2b4c5e] focus:ring-[#2b4c5e]'
              ]"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold text-gray-900 mb-2">
              Quantidade <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="form.quantidade" 
              type="number" 
              placeholder="0"
              :class="[
                'w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2',
                temErroNoCampo('quantidade') ? 'border-red-400 focus:ring-red-200 bg-red-50' : 'border-gray-300 focus:border-[#2b4c5e] focus:ring-[#2b4c5e]'
              ]"
            />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-900 mb-2">
              Unidade de Medida <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="form.unidade_medida" 
              type="text" 
              placeholder="Ex: comprimidos, gotas, ampolas"
              :class="[
                'w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2',
                temErroNoCampo('unidade_medida') ? 'border-red-400 focus:ring-red-200 bg-red-50' : 'border-gray-300 focus:border-[#2b4c5e] focus:ring-[#2b4c5e]'
              ]"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold text-gray-900 mb-2">
              Turno <span class="text-red-500">*</span>
            </label>
            <select 
              v-model="form.turno"
              :class="[
                'w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 appearance-none bg-white',
                temErroNoCampo('turno') ? 'border-red-400 focus:ring-red-200 bg-red-50' : 'border-gray-300 focus:border-[#2b4c5e] focus:ring-[#2b4c5e]',
                !form.turno ? 'text-gray-400' : 'text-gray-900'
              ]"
            >
              <option value="" disabled selected>Selecionar Turno</option>
              <option value="Manhã" class="text-gray-900">Manhã</option>
              <option value="Tarde" class="text-gray-900">Tarde</option>
              <option value="Noite" class="text-gray-900">Noite</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-900 mb-2">
              Horário <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="form.horario" 
              type="time" 
              :class="[
                'w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2',
                temErroNoCampo('horario') ? 'border-red-400 focus:ring-red-200 bg-red-50' : 'border-gray-300 focus:border-[#2b4c5e] focus:ring-[#2b4c5e]'
              ]"
            />
          </div>
        </div>

        <div class="relative">
          <label class="block text-sm font-bold text-gray-900 mb-2">
            Responsável <span class="text-red-500">*</span>
          </label>
          <div 
            @click="abrirDropdown('enfermeiro')" 
            :class="[
              'w-full px-4 py-2.5 border rounded-lg text-sm flex justify-between items-center cursor-pointer transition-colors',
              temErroNoCampo('id_enfermeiro') ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
            ]"
          >
            <span :class="form.id_enfermeiro ? 'text-gray-900' : 'text-gray-400'">
              {{ getNome(enfermeiros, form.id_enfermeiro) || 'Selecionar Responsável' }}
            </span>
            <ChevronDown class="w-4 h-4 text-gray-400" />
          </div>

          <div v-if="dropdownAberto === 'enfermeiro'" class="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-30">
            <div class="p-2 border-b border-gray-100">
              <input v-model="buscas.enfermeiro" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#2b4c5e]" placeholder="Pesquisar enfermeiro..." autofocus />
            </div>
            <ul class="max-h-48 overflow-y-auto py-1">
              <li v-for="item in enfermeirosFiltrados" :key="item.id" @click="selecionarOpcao('id_enfermeiro', item.id)" class="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer text-gray-700">
                Enf. {{ item.nome }}
              </li>
              <li v-if="enfermeirosFiltrados.length === 0" class="px-4 py-2 text-sm text-gray-500 text-center">Nenhum responsável encontrado</li>
            </ul>
          </div>
        </div>

        <div class="flex justify-end items-center gap-4 pt-6 border-t border-gray-100">
          <button 
            type="button" 
            @click="$router.push('/prescricoes')"
            class="text-sm font-bold text-[#5b8098] hover:text-[#2b4c5e] transition-colors"
          >
            Cancelar
          </button>
          <PrimaryButton text="Editar" type="submit" :disabled="salvando" />
        </div>

      </form>
    </div>

    <SuccessModal 
      :is-open="isSuccessModalOpen" 
      title="Editado com sucesso!"
      @close="isSuccessModalOpen = false" 
    />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ChevronDown } from 'lucide-vue-next';
import PrimaryButton from '../../components/common/PrimaryButton.vue';
import BaseAlert from '../../components/common/BaseAlert.vue'; 
import SuccessModal from '../../components/common/SuccessModal.vue'; 
import PacientesService from '../../services/pacientes';
import MedicamentosService from '../../services/medicamentos';
import EnfermeirosService from '../../services/enfermeiros';
import PrescricoesService from '../../services/prescricoes';

const router = useRouter();
const route = useRoute(); 
const prescricaoId = route.params.id; 

const pacientes = ref([]);
const medicamentos = ref([]);
const enfermeiros = ref([]);

const form = reactive({
  id_paciente: null,
  id_medicamento: null,
  id_enfermeiro: null,
  dosagem: '',
  quantidade: '',
  unidade_medida: '',
  turno: '',
  horario: ''
});

const dropdownAberto = ref(null);
const buscas = reactive({
  paciente: '',
  medicamento: '',
  enfermeiro: ''
});

const abrirDropdown = (tipo) => {
  dropdownAberto.value = dropdownAberto.value === tipo ? null : tipo;
  buscas[tipo] = ''; 
};

const fecharDropdowns = () => {
  dropdownAberto.value = null;
};

const selecionarOpcao = (campo, id) => {
  form[campo] = id;
  fecharDropdowns();
};

const getNome = (lista, id) => {
  const item = lista.find(i => i.id === id);
  return item ? item.nome : '';
};

const pacientesFiltrados = computed(() => {
  if (!buscas.paciente) return pacientes.value;
  return pacientes.value.filter(p => p.nome.toLowerCase().includes(buscas.paciente.toLowerCase()) || p.cpf.includes(buscas.paciente));
});

const medicamentosFiltrados = computed(() => {
  if (!buscas.medicamento) return medicamentos.value;
  return medicamentos.value.filter(m => m.nome.toLowerCase().includes(buscas.medicamento.toLowerCase()));
});

const enfermeirosFiltrados = computed(() => {
  if (!buscas.enfermeiro) return enfermeiros.value;
  return enfermeiros.value.filter(e => e.nome.toLowerCase().includes(buscas.enfermeiro.toLowerCase()));
});

const alertMessage = ref('');
const alertType = ref('error');
const camposComErro = ref([]); 
const carregandoDados = ref(true);
const salvando = ref(false);
const isSuccessModalOpen = ref(false);

const temErroNoCampo = (campo) => camposComErro.value.includes(campo);

const carregarDadosFormulario = async () => {
  try {
    carregandoDados.value = true;

    const [resPacientes, resMed, resEnf] = await Promise.all([
      PacientesService.listar(),
      MedicamentosService.listar(),
      EnfermeirosService.listar()
    ]);
    pacientes.value = resPacientes.data;
    medicamentos.value = resMed.data;
    enfermeiros.value = resEnf.data;
    
    const resPrescricao = await PrescricoesService.buscarPorId(prescricaoId);
    const dados = resPrescricao.data;

    form.id_paciente = dados.id_paciente;
    form.id_medicamento = dados.id_medicamento;
    form.id_enfermeiro = dados.id_enfermeiro;
    form.dosagem = dados.dosagem;
    form.quantidade = dados.quantidade;
    form.unidade_medida = dados.unidade_medida;
    form.turno = dados.turno;

    if (dados.data_hora) {
      const dataObj = new Date(dados.data_hora);
      const horas = String(dataObj.getHours()).padStart(2, '0');
      const minutos = String(dataObj.getMinutes()).padStart(2, '0');
      form.horario = `${horas}:${minutos}`;
    }

  } catch (error) {
    console.error("Erro ao carregar dados integrados:", error);
    alertType.value = 'error';
    alertMessage.value = 'Não foi possível carregar os dados. Recarregue a página.';
  } finally {
    carregandoDados.value = false;
  }
};

onMounted(() => {
  carregarDadosFormulario();
});

const validarFormulario = () => {
  camposComErro.value = [];
  alertMessage.value = '';

  if (!form.id_paciente) camposComErro.value.push('id_paciente');
  if (!form.id_medicamento) camposComErro.value.push('id_medicamento');
  if (!form.id_enfermeiro) camposComErro.value.push('id_enfermeiro');
  if (!form.dosagem.trim()) camposComErro.value.push('dosagem');
  if (!form.quantidade || form.quantidade <= 0) camposComErro.value.push('quantidade');
  if (!form.unidade_medida.trim()) camposComErro.value.push('unidade_medida');
  if (!form.turno) camposComErro.value.push('turno');
  if (!form.horario) camposComErro.value.push('horario');

  if (camposComErro.value.length > 0) {
    alertType.value = 'error';
    alertMessage.value = 'Por favor, preencha todos os campos obrigatórios corretamente.';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return false;
  }
  return true;
};

const salvarEdicao = async () => {
  if (!validarFormulario()) return;

  try {
    salvando.value = true;
    
    const dataAtual = new Date();
    const [horas, minutos] = form.horario.split(':');
    dataAtual.setHours(parseInt(horas), parseInt(minutos), 0, 0);

    const payload = {
      id_paciente: form.id_paciente,
      id_medicamento: form.id_medicamento,
      id_enfermeiro: form.id_enfermeiro,
      dosagem: form.dosagem,
      quantidade: parseInt(form.quantidade),
      unidade_medida: form.unidade_medida,
      turno: form.turno,
      data_hora: dataAtual.toISOString() 
    };

    await PrescricoesService.atualizar(prescricaoId, payload);
    
    alertMessage.value = '';
    isSuccessModalOpen.value = true;

    setTimeout(() => {
      router.push('/prescricoes');
    }, 1500);

  } catch (error) {
    console.error("Erro ao salvar prescrição:", error);
    alertType.value = 'error';
    
    if (error.response && error.response.data && error.response.data.message) {
      const msg = error.response.data.message;
      alertMessage.value = Array.isArray(msg) ? msg[0] : msg;
    } else {
      alertMessage.value = 'Ocorreu um erro interno no servidor (500). Verifique os dados.';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } finally {
    salvando.value = false;
  }
};
</script>