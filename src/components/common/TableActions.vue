<template>
  <div class="flex justify-end gap-4">
    <button 
      v-if="showView" 
      @click="$emit('view')" 
      class="text-[#5b8098] hover:text-[#2b4c5e] transition-colors" 
      title="Visualizar"
    >
      <Eye class="w-4 h-4" stroke-width="2" />
    </button>
    
    <button 
      v-if="showEdit" 
      @click="$emit('edit')" 
      class="text-[#739b8f] hover:text-green-700 transition-colors" 
      title="Editar"
    >
      <Pencil class="w-4 h-4" stroke-width="2" />
    </button>

    <button 
      v-if="showDelete" 
      @click="$emit('delete')" 
      class="text-red-400 hover:text-red-600 transition-colors" 
      title="Excluir"
    >
      <Trash2 class="w-4 h-4" stroke-width="2" />
    </button>
  </div>
</template>

<script setup>
import { Eye, Pencil, Trash2 } from 'lucide-vue-next';

defineProps({
  showView: { type: Boolean, default: true },
  showEdit: { type: Boolean, default: true },
  showDelete: { type: Boolean, default: true }
});

defineEmits(['view', 'edit', 'delete']);
</script>