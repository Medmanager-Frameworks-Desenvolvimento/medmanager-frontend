<template>
  <div class="flex h-screen bg-[#F4F6F8] font-sans overflow-hidden">
    
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />
      
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-[#F4F6F8] p-8">
        <router-view />
      </main>
    </div>

  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';
</script>