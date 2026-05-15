<template>
  <Transition 
    enter-active-class="transition opacity-300 ease-out" 
    enter-from-class="opacity-0" 
    enter-to-class="opacity-100" 
    leave-active-class="transition opacity-200 ease-in" 
    leave-from-class="opacity-100" 
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md relative overflow-hidden transform transition-all">
        
        <button 
          @click="$emit('close')" 
          class="absolute top-5 right-5 text-red-400 hover:bg-red-50 hover:text-red-600 p-1.5 rounded-full transition-colors"
        >
          <X class="w-5 h-5" />
        </button>

        <div class="p-8">
          <slot></slot>
        </div>
        
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { X } from 'lucide-vue-next';

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

defineEmits(['close']);
</script>