<template>
  <aside 
    :class="[
      'bg-white h-screen border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden z-10',
      isOpen ? 'w-64' : 'w-20'
    ]"
  >
    <div 
      class="h-20 flex items-center px-6" 
      :class="isOpen ? 'justify-end' : 'justify-center'"
    >
      <button @click="isOpen = !isOpen" class="text-gray-500 hover:text-[#2b4c5e] transition">
        <Menu class="w-7 h-7" stroke-width="1.5" />
      </button>
    </div>

    <nav class="flex-1 px-4 space-y-2 mt-4">
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="item.path"
        class="flex items-center py-3 rounded-lg transition-colors group"
        :class="[
          isOpen ? 'px-4' : 'justify-center px-0',
          $route.path === item.path 
            ? 'bg-[#2b4c5e] text-white shadow-md' 
            : 'text-gray-500 hover:bg-gray-50 hover:text-[#2b4c5e]'
        ]"
      >
        <component 
          :is="item.icon" 
          class="w-5 h-5 shrink-0 transition-colors" 
          :class="[
            isOpen ? 'mr-4' : 'mr-0',
            $route.path === item.path 
              ? 'text-white' 
              : 'text-gray-400 group-hover:text-[#2b4c5e]'
          ]" 
        />
        <span v-if="isOpen" class="font-medium text-sm">{{ item.name }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { 
  Menu, 
  LayoutDashboard, 
  Users, 
  Pill, 
  UserRound, 
  ClipboardList, 
  Settings 
} from 'lucide-vue-next';

const isOpen = ref(true);
const $route = useRoute();

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Pacientes', path: '/pacientes', icon: Users },
  { name: 'Medicamentos', path: '/medicamentos', icon: Pill },
  { name: 'Enfermeiros', path: '/enfermeiros', icon: UserRound },
  { name: 'Prescrições', path: '/prescricoes', icon: ClipboardList },
  { name: 'Configurações', path: '/configuracoes', icon: Settings },
];
</script>