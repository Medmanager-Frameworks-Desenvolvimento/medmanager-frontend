<template>
  <div class="bg-white p-6 rounded-lg border border-gray-300 shadow-sm">
    <h3 class="text-center text-sm font-bold text-gray-500 mb-6">{{ title }}</h3>
    
    <div class="h-64 flex justify-center items-center w-full">
      <apexchart 
        :type="type" 
        height="100%" 
        width="100%" 
        :options="options" 
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script setup>
import apexchart from 'vue3-apexcharts';

defineProps({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  options: {
    type: Object,
    required: true
  },
  series: {
    type: Array,
    required: true
  }
});
</script>