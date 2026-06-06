<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div class="bg-white rounded-xl shadow-lg w-full max-w-[360px] p-8 relative flex flex-col items-center">
        
        <button 
          @click="$emit('close')" 
          class="absolute top-4 right-4 text-red-300 hover:text-red-500 transition-colors"
        >
          <X class="w-5 h-5" />
        </button>

        <LogOut class="w-14 h-14 text-[#2b4c5e] mb-5" stroke-width="2" />

        <h3 class="text-base font-bold text-[#2b4c5e] mb-8 text-center">
          Certeza que deseja sair do sistema?
        </h3>

        <div class="flex gap-4 w-full justify-center">
          <button
            @click="$emit('confirm')"
            class="px-8 py-2 bg-[#2b4c5e] text-white rounded-md text-sm font-bold hover:bg-[#1a303d] transition-colors"
          >
            Sim
          </button>
          <button
            @click="$emit('close')"
            class="px-8 py-2 bg-[#929191] text-white rounded-md text-sm font-bold hover:bg-gray-600 transition-colors"
          >
            Não
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { LogOut, X } from 'lucide-vue-next';

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

defineEmits(['close', 'confirm']);
</script>