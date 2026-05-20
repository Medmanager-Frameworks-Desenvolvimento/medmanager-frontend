<template>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-xl font-extrabold text-[#2b4c5e] mb-6">Adicionar Medicamento</h2>

    <div class="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      
      <BaseAlert :message="alertMessage" :type="alertType" />

      <form @submit.prevent="salvarMedicamento" class="space-y-8">
        
        <div class="space-y-6">
          
          <div class="relative" ref="dropdownRef">
            <label class="block text-sm font-bold text-gray-900 mb-2">
              Nome <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input 
                type="text" 
                v-model="searchNome"
                @input="buscarNomes"
                @focus="isDropdownOpen = true"
                placeholder="Digite um nome" 
                :class="[
                  'w-full px-4 py-2.5 bg-white border rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2',
                  temErroNoCampo('nome') ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-gray-300 focus:border-[#2b4c5e] focus:ring-[#2b4c5e]'
                ]"
              />
            </div>

            <ul 
              v-if="isDropdownOpen && (resultadosCatalogo.length > 0 || carregandoCatalogo)" 
              class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
            >
              <li v-if="carregandoCatalogo" class="px-4 py-3 text-sm text-gray-500 italic">
                Buscando...
              </li>
              <li 
                v-for="item in resultadosCatalogo" 
                :key="item.nome_comercial"
                @click="selecionarNome(item.nome_formatado)"
                class="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer border-b border-gray-50 last:border-0 transition-colors"
              >
                {{ item.nome_formatado }}
              </li>
            </ul>
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
                'flex items-center w-full md:w-2/3 h-[42px] border rounded-lg overflow-hidden transition-colors focus-within:ring-2',
                temErroNoCampo('quantidade') ? 'border-red-400 focus-within:border-red-400 focus-within:ring-red-200' : 'border-gray-300 focus-within:border-[#2b4c5e] focus-within:ring-[#2b4c5e]'
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
                class="flex-1 h-full w-full text-center text-sm text-gray-700 focus:outline-none appearance-none bg-white"
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
                'w-full md:w-2/3 px-4 py-2.5 border rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2',
                temErroNoCampo('validade') ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-gray-300 focus:border-[#2b4c5e] focus:ring-[#2b4c5e]'
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
import { ref, reactive, onMounted, onUnmounted } from 'vue';
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

const searchNome = ref('');
const resultadosCatalogo = ref([]);
const isDropdownOpen = ref(false);
const carregandoCatalogo = ref(false);
const dropdownRef = ref(null);

let timeoutBusca = null;

const buscarNomes = () => {
  formulario.nome = searchNome.value;

  if (searchNome.value.length < 3) {
    resultadosCatalogo.value = [];
    isDropdownOpen.value = false;
    return;
  }

  clearTimeout(timeoutBusca);
  timeoutBusca = setTimeout(async () => {
    carregandoCatalogo.value = true;
    isDropdownOpen.value = true;
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
  searchNome.value = nomeFormatado; 
  formulario.nome = nomeFormatado;  
  isDropdownOpen.value = false;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};
onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));

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