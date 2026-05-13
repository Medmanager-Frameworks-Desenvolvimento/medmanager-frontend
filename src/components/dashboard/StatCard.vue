<template>
  <div class="bg-white p-5 rounded-lg border border-gray-300 shadow-sm flex flex-col justify-between h-28">
    <div class="flex justify-between items-start">
      <p class="text-sm font-semibold text-gray-500">{{ title }}</p>
      <component :is="icon" :class="['w-5 h-5', iconClass]" />
    </div>
    <p class="text-3xl font-extrabold text-[#2b4c5e]">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  icon: {
    type: [Object, Function],
    required: true
  },
  iconClass: {
    type: String,
    default: 'text-[#2b4c5e]' 
  }
});
</script>