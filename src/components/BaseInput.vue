<template>
  <div class="mb-4">
    <label :for="id" class="block text-sm font-bold text-gray-900 mb-1">
      {{ label }}
    </label>
    
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" 
           :class="errorMessage ? 'text-red-400' : 'text-gray-400'">
        <slot name="icon"></slot>
      </div>
      
      <input
        :id="id"
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="[
          'w-full pl-10 py-2.5 border rounded-md text-sm transition-colors focus:outline-none',
          type === 'password' ? 'pr-10' : 'pr-3', 
          errorMessage 
            ? 'border-red-500 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50' 
            : 'border-gray-300 text-gray-700 placeholder-gray-300 focus:border-[#2b4c5e] focus:ring-1 focus:ring-[#2b4c5e] bg-white'
        ]"
      />

      <button 
        v-if="type === 'password'"
        type="button"
        @click="togglePassword"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#2b4c5e] focus:outline-none transition-colors"
      >
        <EyeOff v-if="!showPassword" class="w-5 h-5" />
        <Eye v-else class="w-5 h-5" />
      </button>
    </div>

    <p v-if="errorMessage" class="text-red-500 text-xs mt-1.5 font-medium">
      {{ errorMessage }}
    </p>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next'; 

const props = defineProps({
  id: String,
  label: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  modelValue: String,
  errorMessage: { type: String, default: '' }
});

defineEmits(['update:modelValue']);

const showPassword = ref(false);

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password';
  }
  return props.type;
});

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>