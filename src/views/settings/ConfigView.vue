<template>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-xl font-extrabold text-[#2b4c5e] mb-6">Perfil do Administrador</h2>

    <div class="bg-white p-8 rounded-xl border border-gray-200 shadow-sm relative">
      
      <BaseAlert :message="alertMessage" :type="alertType" />

      <div v-if="carregandoDados" class="text-center py-12 text-gray-500">
        Carregando dados do perfil...
      </div>

      <form v-else @submit.prevent="salvarPerfil" class="space-y-6">
        
        <div>
          <label class="block text-sm font-bold text-gray-900 mb-2">
            Nome Completo <span class="text-red-500">*</span>
          </label>
          <input 
            v-model="form.nome" 
            type="text" 
            placeholder="Seu nome"
            :class="[
              'w-full max-w-md px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors',
              temErroNoCampo('nome') ? 'border-red-400 focus:ring-red-200 bg-red-50' : 'border-gray-300 focus:border-[#2b4c5e] focus:ring-[#2b4c5e] bg-white'
            ]"
          />
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-900 mb-2">
            E-mail Profissional <span class="text-red-500">*</span>
          </label>
          <input 
            v-model="form.email" 
            type="email" 
            placeholder="exemplo@gmail.com"
            :class="[
              'w-full max-w-md px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors',
              temErroNoCampo('email') ? 'border-red-400 focus:ring-red-200 bg-red-50' : 'border-gray-300 focus:border-[#2b4c5e] focus:ring-[#2b4c5e] bg-white'
            ]"
          />
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-900 mb-2">
            Senha
          </label>
          <div class="relative w-full max-w-[280px]">
            <input 
              v-model="form.senha" 
              :type="mostrarSenha ? 'text' : 'password'" 
              placeholder="••••••••"
              :class="[
                'w-full pl-4 pr-10 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors',
                temErroNoCampo('senha') ? 'border-red-400 focus:ring-red-200 bg-red-50' : 'border-gray-300 focus:border-[#2b4c5e] focus:ring-[#2b4c5e] bg-white'
              ]"
            />
            <button 
              type="button"
              @click="mostrarSenha = !mostrarSenha"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <Eye v-if="!mostrarSenha" class="w-4 h-4" />
              <EyeOff v-else class="w-4 h-4" />
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-1">Preencha apenas se desejar alterar a senha atual.</p>
        </div>

        <div class="flex justify-end items-center gap-4 pt-8 mt-4 border-t border-gray-100">
          <button 
            type="button" 
            @click="cancelarEdicao"
            class="text-sm font-bold text-[#5b8098] hover:text-[#2b4c5e] transition-colors"
          >
            Cancelar
          </button>
          
          <PrimaryButton 
            text="Editar" 
            type="submit" 
            :disabled="salvando"
          />
        </div>

      </form>
    </div>

    <SuccessModal 
      :is-open="isSuccessModalOpen" 
      title="Perfil atualizado!"
      @close="isSuccessModalOpen = false" 
    />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useAuthStore } from '../../stored/auth'; 
import { Eye, EyeOff } from 'lucide-vue-next';
import PrimaryButton from '../../components/common/PrimaryButton.vue';
import BaseAlert from '../../components/common/BaseAlert.vue'; 
import SuccessModal from '../../components/common/SuccessModal.vue'; 

const authStore = useAuthStore();

const form = reactive({
  nome: '',
  email: '',
  senha: ''
});

const mostrarSenha = ref(false);
const alertMessage = ref('');
const alertType = ref('error');
const camposComErro = ref([]); 
const carregandoDados = ref(false);
const salvando = ref(false);
const isSuccessModalOpen = ref(false);

const temErroNoCampo = (campo) => camposComErro.value.includes(campo);

const carregarPerfil = () => {
  carregandoDados.value = true;
  if (authStore.admin) {
    form.nome = authStore.admin.nome;
    form.email = authStore.admin.email;
  }
  carregandoDados.value = false;
};

onMounted(() => {
  carregarPerfil();
});

const cancelarEdicao = () => {
  carregarPerfil();
  form.senha = '';
  camposComErro.value = [];
  alertMessage.value = '';
};

const validarFormulario = () => {
  camposComErro.value = [];
  alertMessage.value = '';

  if (!form.nome.trim()) camposComErro.value.push('nome');
  if (!form.email.trim() || !form.email.includes('@')) camposComErro.value.push('email');

  if (form.senha && form.senha.length < 6) {
    camposComErro.value.push('senha');
    alertMessage.value = 'A nova senha deve ter pelo menos 6 caracteres.';
    return false;
  }

  if (camposComErro.value.length > 0) {
    alertType.value = 'error';
    alertMessage.value = 'Por favor, preencha corretamente os campos destacados.';
    return false;
  }
  return true;
};

const salvarPerfil = async () => {
  if (!validarFormulario()) return;

  try {
    salvando.value = true;
    
    const payload = {
      nome: form.nome,
      email: form.email
    };
    
    if (form.senha.trim()) {
      payload.senha = form.senha;
    }

    await authStore.updateProfile(payload);
    
    alertMessage.value = '';
    isSuccessModalOpen.value = true;
    form.senha = ''; 
    
    setTimeout(() => {
      isSuccessModalOpen.value = false;
    }, 2000);

  } catch (error) {
    console.error("Erro ao editar perfil:", error);
    alertType.value = 'error';
    if (error.response && error.response.data && error.response.data.message) {
      const msg = error.response.data.message;
      alertMessage.value = Array.isArray(msg) ? msg[0] : msg;
    } else {
      alertMessage.value = 'Ocorreu um erro ao tentar salvar as configurações.';
    }
  } finally {
    salvando.value = false;
  }
};
</script>