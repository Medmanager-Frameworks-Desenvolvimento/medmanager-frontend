<template>
  <Teleport to="body">
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="notificacaoStore.toastAtivo" 
           class="fixed bottom-6 right-6 z-[110] w-full max-w-sm bg-white rounded-lg shadow-2xl border border-gray-100 p-4 flex gap-4 items-start">
        
        <div class="bg-red-100 p-2 rounded-full shrink-0">
          <BellRing class="w-6 h-6 text-red-500" />
        </div>
        
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold text-gray-900">
            Atenção! Hora da medicação
          </p>
          <p class="text-sm text-gray-600 mt-1 truncate">
            Paciente: <span class="font-bold text-[#2b4c5e]">{{ notificacaoStore.notificacaoAtual?.pacienteNome || 'Carregando...' }}</span>
          </p>
        </div>

        <button @click="notificacaoStore.toastAtivo = false" class="text-gray-400 hover:text-gray-600">
          <X class="w-5 h-5" />
        </button>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { BellRing, X } from 'lucide-vue-next';
import { useNotificationStore } from '../../stored/notifications';

const notificacaoStore = useNotificationStore();
</script>