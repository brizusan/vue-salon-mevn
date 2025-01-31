<script setup>
import {computed , onMounted} from 'vue'
import { RouterView , useRoute } from 'vue-router'
import { useAppointmentsStore } from "@/stores/appointments"

const route = useRoute()
const isService = computed(() => route.name === 'new-appointment')
const store = useAppointmentsStore()

onMounted( () => {
  store.cleanReservation()
})


</script>
<template>
  <nav class="my-8 flex gap-3">
    <RouterLink :to="{ name: 'new-appointment' }" 
      :class="[isService ? 'bg-sky-500' : 'bg-sky-400/50']"
      class="flex-1 text-center text-lg px-2 lg:px-4 py-2 text-white rounded-md hover:bg-sky-500">
      Servicios</RouterLink>
    
      <RouterLink :to="{ name: 'appointment-details' }" 
      :class="[!isService ? 'bg-sky-500' : 'bg-sky-400/50']"
      class=" flex-1 text-center text-lg px-2 lg:px-4 py-2 text-white rounded-md hover:bg-sky-500">
      Reservas y Resumen</RouterLink>
  </nav>
  <RouterView />
</template>