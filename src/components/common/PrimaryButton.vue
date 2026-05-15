<template>
  <button 
    class="bg-[#2b4c5e] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#1e3643] transition-colors font-medium text-sm shadow-sm"
  >
    <component v-if="icon" :is="icon" class="w-4 h-4" />
    <span>{{ text }}</span>
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true
  },
  icon: {
    type: [Object, Function],
    default: null
  }
});
</script>