<template>
  <form @submit.prevent="handleLogin">
    
    <BaseAlert :message="globalError" type="error" />
    <BaseAlert :message="successMessage" type="success" />
    
    <BaseInput 
      id="email" 
      label="E-mail Profissional" 
      type="email" 
      placeholder="exemplo@mail.com"
      v-model="formData.email" 
      :errorMessage="errors.email"
    >
      <template #icon><Mail class="w-5 h-5" /></template>
    </BaseInput>

    <BaseInput 
      id="password" 
      label="Senha" 
      type="password" 
      placeholder="Digite sua senha"
      v-model="formData.password" 
      :errorMessage="errors.password"
    >
      <template #icon><Lock class="w-5 h-5" /></template>
    </BaseInput>

    <BaseButton type="submit">LOGIN</BaseButton>

  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseInput from '../../components/auth/BaseInput.vue';
import BaseButton from '../../components/auth/BaseButton.vue';
import BaseAlert from '../../components/common/BaseAlert.vue';
import { Mail, Lock } from 'lucide-vue-next';
import { useAuthStore } from '../../stored/auth'; 

const router = useRouter();
const authStore = useAuthStore(); 

const formData = reactive({ email: '', password: '' });
const errors = reactive({ email: '', password: '' });

const globalError = ref('');
const successMessage = ref('');

const handleLogin = async () => {
  errors.email = ''; errors.password = '';
  globalError.value = ''; successMessage.value = '';

  if (!formData.email) errors.email = 'O e-mail é obrigatório.';
  if (!formData.password) errors.password = 'A senha é obrigatória.';

  if (formData.email && formData.password) {
    try {
      await authStore.login(formData.email, formData.password);
      
      successMessage.value = 'Login aprovado! Entrando no sistema...';
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);

    } catch (error) {
      globalError.value = error.response?.data?.message || 'E-mail ou senha incorretos.';
    }
  }
};
</script>