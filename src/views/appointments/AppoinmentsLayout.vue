<script setup>
import { computed } from "vue"
import { RouterView, useRoute } from "vue-router";
import { useUserStore } from "@/stores/user"

const route = useRoute()
const isMyAppointments = computed(() => route.name === 'my-appointments')
const store = useUserStore()

</script>
<template>
  <header class="flex justify-between">
    <h1 class="text-3xl lg:text-5xl font-bold text-white">Salón MEVN</h1>

    <div class="flex flex-col space-y-6">
      <div class="flex flex-col md:flex-row gap-2 xl:gap-6 items-center">
        <p class="text-white font-semibold">Bienvenido <span>{{ store.getUserName }}</span></p>
        <button @click="store.logout" type="button"
          class="bg-red-500 px-2 lg:px-4 py-2 text-white rounded-md hover:bg-red-600">
          Cerrar Sesión
        </button>
      </div>
      <nav class="flex gap-4 items-center justify-end lg:pt-8">
        <RouterLink :to="{ name: 'my-appointments' }" :class="[!isMyAppointments ? 'bg-sky-500/20' : 'bg-sky-500']"
          class="px-2 lg:px-4 py-2 text-white rounded-md hover:bg-sky-600">Mis Citas</RouterLink>
        <RouterLink :to="{ name: 'new-appointment' }"
          :class="[isMyAppointments ? 'bg-sky-500/20 hover:bg-sky-500' : 'bg-sky-500 hover:bg-sky-600']"
          class="px-2 lg:px-4 py-2 text-white rounded-md ">Nueva Cita</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>
