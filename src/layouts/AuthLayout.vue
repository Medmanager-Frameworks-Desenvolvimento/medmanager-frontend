<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
    <div class="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
      
      <div class="flex flex-col items-center mb-8">
        <div class="flex items-center gap-2 text-[#2b4c5e]">
          <svg class="w-10 h-10 text-[#609b9f]" fill="none" stroke="currentColor" viewBox="0 0 64 64" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12H40V24H52V40H40V52H24V40H12V24H24Z" />
            <path d="M32 28V36M28 32H36" />
          </svg>
          <h1 class="text-2xl font-bold tracking-wide">MEDMANAGER</h1>
        </div>
        <p class="text-gray-600 text-sm mt-1">Gestão de Prescrições Clínicas</p>
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