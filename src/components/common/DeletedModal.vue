<template>
  <BaseModal :is-open="isOpen" @close="$emit('close')">
    <div class="flex flex-col items-center text-center px-4 py-8">
  
      <div class="mb-5 text-red-500">
        <AlertCircle class="w-24 h-24" stroke-width="1.5" />
      </div>

      <h3 class="text-2xl font-bold text-red-600">
        {{ title }}
      </h3>

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
    default: 'Registro Excluído'
  }
});

defineEmits(['close']);
</script>