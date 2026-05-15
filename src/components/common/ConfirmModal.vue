<template>
  <BaseModal :is-open="isOpen" @close="$emit('close')">
    <div class="flex flex-col items-center text-center px-4 py-6">
  
      <div class="mb-5 text-red-500">
        <AlertCircle class="w-20 h-20" stroke-width="1.5" />
      </div>

      <h3 class="text-xl font-bold text-red-500 mb-8">
        {{ title }}
      </h3>

      <div class="flex items-center gap-4">
        <button 
          @click="$emit('confirm')"
          class="bg-[#2b4c5e] hover:bg-[#1e3643] text-white px-8 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
          Sim
        </button>
        <button 
          @click="$emit('close')"
          class="bg-[#8b98a5] hover:bg-gray-500 text-white px-8 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
          Não
        </button>
      </div>

    </div>
  </BaseModal>
</template>

<script setup>
import { AlertCircle } from 'lucide-vue-next';
import BaseModal from './BaseModal.vue';

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Certeza que deseja excluir o registro?'
  }
});

defineEmits(['close', 'confirm']);
</script>