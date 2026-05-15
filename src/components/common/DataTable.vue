<template>
  <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-6">
    
    <div class="p-5 border-b border-gray-200 flex justify-end bg-white">
      <div class="relative">
        <input
          type="text"
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          placeholder="Pesquisar"
          class="pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#2b4c5e] focus:border-[#2b4c5e] w-64 text-gray-600"
        />
        <Search class="w-4 h-4 text-gray-400 absolute right-3 top-3" />
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-[#F8F9FA] text-gray-500 text-sm border-b border-gray-200">
            <th v-for="col in columns" :key="col.key" class="py-3.5 px-6 font-semibold whitespace-nowrap">
              {{ col.label }}
            </th>
            <th v-if="$slots.actions" class="py-3.5 px-6 font-semibold text-right"></th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-if="items.length === 0">
            <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="py-12 text-center text-gray-500 text-sm">
              Nenhum registro encontrado.
            </td>
          </tr>

          <tr 
            v-for="(item, index) in paginatedItems" 
            :key="index" 
            class="border-b border-gray-100 hover:bg-gray-50 transition-colors text-sm text-gray-700"
          >
            <td v-for="col in columns" :key="col.key" class="py-4 px-6 whitespace-nowrap">
              <slot :name="'cell-' + col.key" :item="item" :value="item[col.key]">
                {{ item[col.key] }}
              </slot>
            </td>
            
            <td v-if="$slots.actions" class="py-4 px-6 text-right">
              <div class="flex justify-end gap-4">
                <slot name="actions" :item="item"></slot>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="totalPages > 1" class="px-6 py-4 border-t border-gray-200 flex items-center justify-end bg-[#F8F9FA]">
      <div class="flex items-center gap-2">
        <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          Anterior
        </button>
        <div class="flex items-center gap-1">
          <button v-for="page in totalPages" :key="page" @click="setPage(page)" :class="['px-3 py-1.5 border rounded-md text-sm transition-colors', currentPage === page ? 'bg-[#2b4c5e] text-white border-[#2b4c5e]' : 'border-gray-300 text-gray-600 hover:bg-gray-100']">
            {{ page }}
          </button>
        </div>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          Próxima
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Search } from 'lucide-vue-next'; 

const props = defineProps({
  columns: { type: Array, required: true },
  items: { type: Array, required: true },
  searchQuery: { type: String, default: '' },
  itemsPerPage: { type: Number, default: 7 }
});

defineEmits(['update:searchQuery']);

const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(props.items.length / props.itemsPerPage));
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage;
  return props.items.slice(start, start + props.itemsPerPage);
});

const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
const setPage = (page) => { currentPage.value = page; };

watch(() => props.items, () => { currentPage.value = 1; }, { deep: true });
</script>