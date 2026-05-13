<template>
  <form @submit.prevent="handleCadastro">
    
    <BaseAlert :message="globalError" type="error" />
    <BaseAlert :message="successMessage" type="success" />
    
    <BaseInput 
      id="name" 
      label="Nome Completo" 
      placeholder="Digite seu nome completo"
      v-model="formData.name" 
      :errorMessage="errors.name"
    >
      <template #icon><User class="w-5 h-5" /></template>
    </BaseInput>

    <BaseInput 
      id="email" 
      label="E-mail Profissional" 
      type="email" 
      placeholder="exemplo@clinica.com"
      v-model="formData.email" 
      :errorMessage="errors.email"
    >
      <template #icon><Mail class="w-5 h-5" /></template>
    </BaseInput>

    <BaseInput 
      id="password" 
      label="Senha" 
      type="password" 
      placeholder="Crie uma senha forte"
      v-model="formData.password" 
      :errorMessage="errors.password"
    >
      <template #icon><Lock class="w-5 h-5" /></template>
    </BaseInput>

    <BaseButton type="submit">CRIAR CONTA</BaseButton>

    <p class="text-center text-sm text-gray-600 mt-4">
      Já tem uma conta? 
      <router-link to="/login" class="text-[#2b4c5e] font-bold hover:underline">
        Faça Login
      </router-link>
    </p>

  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stored/auth'; 
import BaseInput from '../../components/auth/BaseInput.vue';
import BaseButton from '../../components/auth/BaseButton.vue';
import BaseAlert from '../../components/auth/BaseAlert.vue';
import { User, Mail, Lock } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();

const formData = reactive({ name: '', email: '', password: '' });
const errors = reactive({ name: '', email: '', password: '' });

const globalError = ref('');
const successMessage = ref('');

const validatePassword = (password) => {
  if (!password) return 'A senha é obrigatória.';
  if (password.length < 6) return 'A senha deve ter no mínimo 6 caracteres.';
  if (!/[A-Z]/.test(password)) return 'A senha deve conter pelo menos uma letra maiúscula.';
  if (!/[0-9]/.test(password)) return 'A senha deve conter pelo menos um número.';
  if (!/[!@#$%^&*(),.?":{}|<>\-_]/.test(password)) return 'A senha deve conter pelo menos um símbolo especial.';
  
  return ''; 
};

const handleCadastro = async () => {
  errors.name = ''; 
  errors.email = ''; 
  errors.password = '';
  globalError.value = ''; 
  successMessage.value = '';

  if (!formData.name) errors.name = 'O nome é obrigatório.';
  if (!formData.email) errors.email = 'O e-mail é obrigatório.';
  
  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;

  if (!errors.name && !errors.email && !errors.password) {
    try {
      await authStore.signup(formData.name, formData.email, formData.password);

      successMessage.value = 'Cadastro realizado com sucesso! Redirecionando...';
      
      setTimeout(() => {
        router.push('/login');
      }, 3000);

    } catch (error) {
      globalError.value = error.response?.data?.message || 'Erro ao realizar o cadastro.';
    }
  }
};
</script>