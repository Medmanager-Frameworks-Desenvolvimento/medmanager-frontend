<template>
  <div 
    v-if="message" 
    :class="[
      'p-4 mb-6 rounded-md text-sm flex items-center transition-all duration-300 border-l-4',
      type === 'success' 
        ? 'bg-green-50 border-green-500 text-green-800' 
        : 'bg-red-50 border-red-500 text-red-800'
    ]"
  >
    <p class="font-medium">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  message: { type: String, required: true },
  type: { type: String, default: 'error' } 
});
</script>