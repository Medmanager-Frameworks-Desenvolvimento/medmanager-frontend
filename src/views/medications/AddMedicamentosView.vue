<template>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-xl font-extrabold text-[#2b4c5e] mb-6">Adicionar Medicamento</h2>

    <div class="bg-white p-8 rounded-xl border border-gray-200 shadow-sm relative">
      
      <BaseAlert :message="alertMessage" :type="alertType" />

      <div v-if="dropdownAberto" @click="fecharDropdowns" class="fixed inset-0 z-10"></div>

      <form @submit.prevent="salvarMedicamento" class="space-y-8 relative z-20">
        
        <div class="space-y-6">
          
          <div class="relative">
            <label class="block text-sm font-bold text-gray-900 mb-2">
              Nome <span class="text-red-500">*</span>
            </label>
            <div 
              @click="abrirDropdown('nome')" 
              :class="[
                'w-full px-4 py-2.5 border rounded-lg text-sm flex justify-between items-center cursor-pointer transition-colors',
                temErroNoCampo('nome') ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
              ]"
            >
              <span :class="formulario.nome ? 'text-gray-900' : 'text-gray-400'">
                {{ formulario.nome || 'Selecionar Medicamento' }}
              </span>
              <ChevronDown class="w-4 h-4 text-gray-400" />
            </div>

            <div v-if="dropdownAberto === 'nome'" class="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-30">
              <div class="p-2 border-b border-gray-100">
                <input 
                  v-model="searchNome" 
                  @input="buscarNomes"
                  type="text" 
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#2b4c5e]" 
                  placeholder="Pesquisar catálogo..." 
                  autofocus 
                />
              </div>
              <ul class="max-h-48 overflow-y-auto py-1">
                <li v-if="carregandoCatalogo" class="px-4 py-3 text-sm text-gray-500 italic text-center">
                  Buscando...
                </li>
                <li 
                  v-else-if="resultadosCatalogo.length > 0"
                  v-for="item in resultadosCatalogo" 
                  :key="item.nome_comercial" 
                  @click="selecionarNome(item.nome_formatado)" 
                  class="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer text-gray-700 border-b border-gray-50 last:border-0 transition-colors"
                >
                  {{ item.nome_formatado }}
                </li>
                <li v-else-if="searchNome.length >= 3 && !carregandoCatalogo" class="px-4 py-3 text-sm text-gray-500 text-center">
                  Nenhum medicamento encontrado.
                </li>
                <li v-else class="px-4 py-3 text-sm text-gray-400 text-center">
                  Digite pelo menos 3 letras para buscar.
                </li>
              </ul>
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-900 mb-2">
              Descrição
            </label>
            <input 
              type="text" 
              v-model="formulario.descricao"
              placeholder="Descrição" 
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-[#2b4c5e] focus:ring-[#2b4c5e]"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          <div>
            <label class="block text-sm font-bold text-gray-900 mb-2">
              Quantidade <span class="text-red-500">*</span>
            </label>
            <div 
              :class="[
                'flex items-center w-full md:w-2/3 h-[42px] border rounded-lg overflow-hidden transition-colors focus-within:ring-2 bg-white',
                temErroNoCampo('quantidade') ? 'border-red-400 focus-within:border-red-400 focus-within:ring-red-200 bg-red-50' : 'border-gray-300 focus-within:border-[#2b4c5e] focus-within:ring-[#2b4c5e]'
              ]"
            >
              <button 
                type="button" 
                @click="diminuirQuantidade"
                class="px-4 h-full bg-white text-gray-500 hover:bg-gray-100 border-r border-gray-200 transition-colors flex items-center justify-center outline-none"
              >
                <Minus class="w-4 h-4" />
              </button>
              <input 
                type="number" 
                v-model="formulario.quantidade"
                class="flex-1 h-full w-full text-center text-sm text-gray-700 focus:outline-none appearance-none bg-transparent"
                min="0"
              />
              <button 
                type="button" 
                @click="aumentarQuantidade"
                class="px-4 h-full bg-white text-gray-500 hover:bg-gray-100 border-l border-gray-200 transition-colors flex items-center justify-center outline-none"
              >
                <Plus class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-900 mb-2">
              Validade <span class="text-red-500">*</span>
            </label>
            <input 
              type="date" 
              v-model="formulario.validade"
              :class="[
                'w-full md:w-2/3 px-4 py-2.5 border rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 bg-white',
                temErroNoCampo('validade') ? 'border-red-400 focus:border-red-400 focus:ring-red-200 bg-red-50' : 'border-gray-300 focus:border-[#2b4c5e] focus:ring-[#2b4c5e]'
              ]"
            />
          </div>

        </div>

        <div class="flex justify-end items-center gap-4 pt-4 border-t border-gray-100 mt-6">
          <button 
            type="button" 
            @click="$router.push('/medicamentos')"
            class="text-sm font-bold text-[#5b8098] hover:text-[#2b4c5e] transition-colors"
          >
            Cancelar
          </button>
          
          <PrimaryButton 
            text="Salvar" 
            type="submit" 
            :disabled="salvando"
          />
        </div>

      </form>
    </div>

    <SuccessModal 
      :is-open="isSuccessModalOpen" 
      title="Salvo com sucesso!"
      @close="isSuccessModalOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ChevronDown, Plus, Minus } from 'lucide-vue-next';
import PrimaryButton from '../../components/common/PrimaryButton.vue';
import BaseAlert from '../../components/common/BaseAlert.vue';
import SuccessModal from '../../components/common/SuccessModal.vue';
import MedicamentosService from '../../services/medicamentos';

const router = useRouter();

const formulario = reactive({
  nome: '',
  descricao: '',
  quantidade: '', 
  validade: ''
});

const alertMessage = ref('');
const alertType = ref('error');
const camposComErro = ref([]);
const salvando = ref(false);

const temErroNoCampo = (campo) => camposComErro.value.includes(campo);

// Lógica de Dropdown
const dropdownAberto = ref(null);
const searchNome = ref('');
const resultadosCatalogo = ref([]);
const carregandoCatalogo = ref(false);

const abrirDropdown = (tipo) => {
  dropdownAberto.value = dropdownAberto.value === tipo ? null : tipo;
  // Se abrir o dropdown de novo, foca a atenção na pesquisa
  if (dropdownAberto.value) {
    searchNome.value = '';
    resultadosCatalogo.value = [];
  }
};

const fecharDropdowns = () => {
  dropdownAberto.value = null;
};

const formatarNome = (texto) => {
  if (!texto) return '';
  return texto
    .toLowerCase()
    .split(' ')
    .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(' ');
};

const diminuirQuantidade = () => {
  let valorAtual = Number(formulario.quantidade) || 0; 
  if (valorAtual > 0) {
    formulario.quantidade = valorAtual - 1;
  } else {
    formulario.quantidade = 0;
  }
};

const aumentarQuantidade = () => {
  let valorAtual = Number(formulario.quantidade) || 0;
  formulario.quantidade = valorAtual + 1;
};

// Busca assíncrona na API
let timeoutBusca = null;

const buscarNomes = () => {
  if (searchNome.value.length < 3) {
    resultadosCatalogo.value = [];
    return;
  }

  clearTimeout(timeoutBusca);
  timeoutBusca = setTimeout(async () => {
    carregandoCatalogo.value = true;
    try {
      const response = await MedicamentosService.buscarCatalogo(searchNome.value);
      resultadosCatalogo.value = response.data.map(item => ({
        ...item,
        nome_formatado: formatarNome(item.nome_comercial)
      }));
    } catch (error) {
      console.error('Erro ao buscar catálogo:', error);
      resultadosCatalogo.value = [];
    } finally {
      carregandoCatalogo.value = false;
    }
  }, 300);
};

const selecionarNome = (nomeFormatado) => {
  formulario.nome = nomeFormatado;  
  fecharDropdowns();
};

const isSuccessModalOpen = ref(false);

const validarFormulario = () => {
  camposComErro.value = [];
  alertMessage.value = '';

  if (!formulario.nome || formulario.nome.trim() === '') camposComErro.value.push('nome');
  if (formulario.quantidade === null || formulario.quantidade === '') camposComErro.value.push('quantidade');
  if (!formulario.validade) camposComErro.value.push('validade');

  if (camposComErro.value.length > 0) {
    alertType.value = 'error';
    alertMessage.value = 'Por favor, preencha todos os campos obrigatórios corretamente.';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return false;
  }

  return true;
};

const salvarMedicamento = async () => {
  if (!validarFormulario()) return;

  try {
    salvando.value = true;
    
    await MedicamentosService.criar({
      nome: formulario.nome,
      descricao: formulario.descricao,
      quantidade: Number(formulario.quantidade),
      validade: formulario.validade
    });
    
    alertMessage.value = '';
    isSuccessModalOpen.value = true;

    setTimeout(() => {
      router.push('/medicamentos');
    }, 2000);

  } catch (error) {
    console.error('Erro ao salvar medicamento:', error);
    alertType.value = 'error';
    alertMessage.value = 'Ocorreu um erro ao conectar com o servidor. Tente novamente.';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } finally {
    salvando.value = false;
  }
};
</script>