<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
    <div class="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
      
      <div class="flex flex-col items-center mb-8">
        <div class="flex items-center">
          <div class="relative w-12 h-12 text-[#739b8f] flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-full h-full">
              <path d="M9 2.5v6.5H2.5v6h6.5v6.5h6v-6.5h6.5v-6H15V2.5H9z" stroke-linejoin="round"/>
              <path d="M12 9v6M9 12h6" stroke-linecap="round" stroke-width="1.2"/>
            </svg>
          </div>
          <h1 class="font-bold text-[26px] text-[#2C4E61] leading-none tracking-wide ml-3">
            MEDMANAGER
          </h1>
        </div>
        <p class="text-[14px] text-gray-900 mt-1 tracking-wide text-center">
          Gestão de Prescrições Clínicas
        </p>
      </div>

      <div class="flex border-b border-gray-200 mb-6">
        <router-link 
          to="/login"
          :class="['flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-colors', 
                   $route.path === '/login' ? 'border-[#2b4c5e] text-[#2b4c5e]' : 'border-transparent text-gray-400 hover:text-gray-600']"
        >
          LOGIN
        </router-link>
        <router-link 
          to="/cadastro"
          :class="['flex-1 pb-3 text-sm font-bold text-center border-b-2 transition-colors', 
                   $route.path === '/cadastro' ? 'border-[#2b4c5e] text-[#2b4c5e]' : 'border-transparent text-gray-400 hover:text-gray-600']"
        >
          CADASTRO
        </router-link>
      </div>

      <router-view></router-view>

    </div>
  </div>
</template>