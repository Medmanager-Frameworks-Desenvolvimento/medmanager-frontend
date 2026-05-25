<template>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-xl font-extrabold text-[#2b4c5e] mb-6">Adicionar Enfermeiro</h2>

    <div class="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      
      <BaseAlert :message="alertMessage" :type="alertType" />

      <form @submit.prevent="salvarEnfermeiro" class="space-y-8">
 
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
              Telefone <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="form.telefone" 
              @input="aplicarMascaraTelefone"
              type="text" 
              maxlength="16"
              placeholder="(00) 0 0000-0000"
              :class="[
                'w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2',
                temErroNoCampo('telefone') ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-gray-300 focus:border-[#2b4c5e] focus:ring-[#2b4c5e]'
              ]"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-900 mb-2">
            E-mail <span class="text-red-500">*</span>
          </label>
          <input 
            v-model="form.email" 
            type="email" 
            placeholder="xxxx@mail.com"
            :class="[
              'w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2',
              temErroNoCampo('email') ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-gray-300 focus:border-[#2b4c5e] focus:ring-[#2b4c5e]'
            ]"
          />
        </div>

        <div class="flex justify-end items-center gap-4 pt-4 border-t border-gray-100 mt-6">
          <button 
            type="button" 
            @click="$router.push('/enfermeiros')"
            class="text-sm font-bold text-[#5b8098] hover:text-[#2b4c5e] transition-colors"
          >
            Cancelar
          </button>
          <PrimaryButton text="Salvar" type="submit" :disabled="salvando" />
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
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import PrimaryButton from '../../components/common/PrimaryButton.vue';
import BaseAlert from '../../components/common/BaseAlert.vue'; 
import SuccessModal from '../../components/common/SuccessModal.vue'; 
import EnfermeirosService from '../../services/enfermeiros';

const router = useRouter();

const form = reactive({
  nome: '',
  cpf: '',
  telefone: '',
  email: ''
});

const alertMessage = ref('');
const alertType = ref('error');
const camposComErro = ref([]); 
const salvando = ref(false);

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

const aplicarMascaraTelefone = (event) => {
  let valor = event.target.value.replace(/\D/g, '');
  if (valor.length > 11) valor = valor.slice(0, 11);
  if (valor.length > 10) {
    valor = valor.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
  } else if (valor.length > 6) {
    valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else if (valor.length > 2) {
    valor = valor.replace(/(\d{2})(\d{0,5})/, "($1) $2");
  }
  form.telefone = valor;
};

const validarEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validarFormulario = () => {
  camposComErro.value = [];
  alertMessage.value = '';

  if (!form.nome.trim()) camposComErro.value.push('nome');
  
  if (!form.cpf || form.cpf.length !== 14) camposComErro.value.push('cpf');
  
  if (!form.telefone || form.telefone.length < 14) camposComErro.value.push('telefone');

  if (!form.email || !validarEmail(form.email)) camposComErro.value.push('email');

  if (camposComErro.value.length > 0) {
    alertType.value = 'error';
    if (camposComErro.value.includes('cpf')) {
      alertMessage.value = 'Por favor, preencha o CPF corretamente (11 dígitos).';
    } else if (camposComErro.value.includes('email')) {
      alertMessage.value = 'Por favor, insira um e-mail válido.';
    } else {
      alertMessage.value = 'Por favor, preencha todos os campos obrigatórios corretamente.';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return false;
  }
  return true;
};

const salvarEnfermeiro = async () => {
  if (!validarFormulario()) return;

  try {
    salvando.value = true;
    
    const payload = {
      nome: form.nome,
      cpf: form.cpf,
      telefone: form.telefone,
      email: form.email
    };

    await EnfermeirosService.criar(payload);
    
    alertMessage.value = '';
    isSuccessModalOpen.value = true;

    setTimeout(() => {
      router.push('/enfermeiros');
    }, 1500);

  } catch (error) {
    console.error("Erro ao salvar:", error);
    alertType.value = 'error';

    if (error.response && error.response.data && error.response.data.message) {
      alertMessage.value = error.response.data.message;
    } else {
      alertMessage.value = 'Ocorreu um erro ao conectar com o servidor. Tente novamente.';
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } finally {
    salvando.value = false;
  }
};
</script>