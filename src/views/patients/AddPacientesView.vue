<template>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-xl font-extrabold text-[#2b4c5e] mb-6">Adicionar Paciente</h2>

    <div class="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      
      <BaseAlert :message="alertMessage" :type="alertType" />

      <form @submit.prevent="salvarPaciente" class="space-y-8">
 
        <div>
          <label class="block text-sm font-bold text-gray-900 mb-2">
            Nome Completo <span class="text-red-500">*</span>
          </label>
          <input 
            v-model="form.nome" 
            type="text" 
            placeholder="Nome Completo"
            :class="[
              'w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2',
              temErroNoCampo('nome') ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-gray-300 focus:border-[#2b4c5e] focus:ring-[#2b4c5e]'
            ]"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold text-gray-900 mb-2">
              CPF <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="form.cpf" 
              @input="aplicarMascaraCpf"
              type="text" 
              maxlength="14"
              placeholder="XXX.XXX.XXX-XX"
              :class="[
                'w-full max-w-[200px] px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2',
                temErroNoCampo('cpf') ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-gray-300 focus:border-[#2b4c5e] focus:ring-[#2b4c5e]'
              ]"
            />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-900 mb-2">
              Idade <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="form.idade" 
              type="number" 
              placeholder="00"
              :class="[
                'w-full max-w-[120px] px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2',
                temErroNoCampo('idade') ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-gray-300 focus:border-[#2b4c5e] focus:ring-[#2b4c5e]'
              ]"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-900 mb-4">Doença Crônica</label>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" value="Diabetes" v-model="doencasSelecionadas" class="w-4 h-4 text-[#2b4c5e] border-gray-300 rounded focus:ring-[#2b4c5e]">
              <span class="text-sm font-medium text-gray-700">Diabetes</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" value="Hipertensão" v-model="doencasSelecionadas" class="w-4 h-4 text-[#2b4c5e] border-gray-300 rounded focus:ring-[#2b4c5e]">
              <span class="text-sm font-medium text-gray-700">Hipertensão</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" value="Alzheimer" v-model="doencasSelecionadas" class="w-4 h-4 text-[#2b4c5e] border-gray-300 rounded focus:ring-[#2b4c5e]">
              <span class="text-sm font-medium text-gray-700">Alzheimer</span>
            </label>
            <div class="flex items-center gap-3 pt-1">
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" v-model="possuiOutra" class="w-4 h-4 text-[#2b4c5e] border-gray-300 rounded focus:ring-[#2b4c5e]">
                <span class="text-sm font-medium text-gray-700">Outras:</span>
              </label>
              <input 
                v-if="possuiOutra"
                v-model="outraDoencaTexto"
                type="text" 
                class="flex-1 max-w-sm border-b border-gray-400 focus:outline-none focus:border-[#2b4c5e] px-1 text-sm bg-transparent"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-end items-center gap-4 pt-4 border-t border-gray-100">
          <button 
            type="button" 
            @click="$router.push('/pacientes')"
            class="text-sm font-bold text-[#5b8098] hover:text-[#2b4c5e] transition-colors"
          >
            Cancelar
          </button>
          <PrimaryButton text="Salvar" type="submit" />
        </div>

      </form>
    </div>

    <SuccessModal 
      :is-open="isSuccessModalOpen" 
      @close="isSuccessModalOpen = false" 
    />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import PrimaryButton from '../../components/common/PrimaryButton.vue';
import BaseAlert from '../../components/common/BaseAlert.vue'; 
import SuccessModal from '../../components/common/SuccessModal.vue'; 
import PacientesService from '../../services/pacientes';

const router = useRouter();

const form = reactive({
  nome: '',
  cpf: '',
  idade: ''
});

const doencasSelecionadas = ref([]);
const possuiOutra = ref(false);
const outraDoencaTexto = ref('');

const alertMessage = ref('');
const alertType = ref('error');
const camposComErro = ref([]); 

const isSuccessModalOpen = ref(false);

const temErroNoCampo = (campo) => camposComErro.value.includes(campo);

const aplicarMascaraCpf = (event) => {
  let valor = event.target.value.replace(/\D/g, '');
  if (valor.length > 11) valor = valor.slice(0, 11);
  if (valor.length > 9) valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  else if (valor.length > 6) valor = valor.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3");
  else if (valor.length > 3) valor = valor.replace(/(\d{3})(\d{3})/, "$1.$2");
  form.cpf = valor;
};

const validarFormulario = () => {
  camposComErro.value = [];
  alertMessage.value = '';

  if (!form.nome.trim()) camposComErro.value.push('nome');
  
  if (!form.cpf || form.cpf.length !== 14) camposComErro.value.push('cpf');
  
  if (!form.idade || form.idade <= 0) camposComErro.value.push('idade');

  if (camposComErro.value.length > 0) {
    alertType.value = 'error';
    if (camposComErro.value.includes('cpf')) {
      alertMessage.value = 'Por favor, preencha o CPF corretamente (11 dígitos).';
    } else {
      alertMessage.value = 'Por favor, preencha todos os campos obrigatórios corretamente.';
    }
    return false;
  }
  return true;
};

const salvarPaciente = async () => {
  if (!validarFormulario()) return;

  try {
    let doencasFinais = [...doencasSelecionadas.value];
    if (possuiOutra.value && outraDoencaTexto.value.trim() !== '') {
      doencasFinais.push(outraDoencaTexto.value.trim());
    }

    const payload = {
      nome: form.nome,
      cpf: form.cpf,
      idade: parseInt(form.idade),
      doenca_cronica: doencasFinais
    };

    await PacientesService.criar(payload);
    
    alertMessage.value = '';
    
    isSuccessModalOpen.value = true;

    setTimeout(() => {
      router.push('/pacientes');
    }, 2000);

  } catch (error) {
    console.error("Erro ao salvar:", error);
    alertType.value = 'error';
    alertMessage.value = 'Ocorreu um erro ao conectar com o servidor. Tente novamente.';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
</script>