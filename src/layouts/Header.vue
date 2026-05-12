<template>
  <header class="h-20 bg-[#F4F6F8] px-8 flex items-center justify-between border-b border-gray-200">
    
    <div class="flex items-center">
      <div class="relative w-12 h-12 text-[#739b8f] flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-full h-full">
          <path d="M9 2.5v6.5H2.5v6h6.5v6.5h6v-6.5h6.5v-6H15V2.5H9z" stroke-linejoin="round"/>
          <path d="M12 9v6M9 12h6" stroke-linecap="round" stroke-width="1.2"/>
        </svg>
      </div>

      <div class="flex flex-col justify-center ml-3">
        <h1 class="font-bold text-[24px] text-[#2C4E61] leading-none tracking-wide">
          MEDMANAGER
        </h1>
        <p class="text-[12px] text-gray-900 mt-1 leading-none tracking-wide">
          Gestão de Prescrições Clínicas
        </p>
      </div>
    </div>

    <div class="flex items-center space-x-6">
      
      <button class="text-gray-400 hover:text-[#2b4c5e] transition">
        <Bell class="w-5 h-5" />
      </button>

      <div class="h-8 w-px bg-gray-300"></div>

      <div class="flex items-center space-x-3">
        <div class="text-right hidden md:block">
          <p class="text-sm font-bold text-[#2b4c5e]">{{ adminName }}</p>
          <p class="text-xs text-gray-500">Administrador</p>
        </div>
        <div class="w-10 h-10 rounded bg-[#2b4c5e] text-white flex items-center justify-center font-bold text-lg shadow-sm">
          {{ initial }}
        </div>
      </div>

      <button @click="handleLogout" title="Sair do sistema" class="text-red-400 hover:text-red-600 transition">
        <Power class="w-5 h-5" />
      </button>

    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stored/auth';
import { Bell, Power } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();

const adminName = computed(() => authStore.admin?.nome || 'Administrador');
const initial = computed(() => adminName.value.charAt(0).toUpperCase());

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>