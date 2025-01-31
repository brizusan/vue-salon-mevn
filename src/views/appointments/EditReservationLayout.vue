<script setup>
import { useRouter } from 'vue-router'
import { RouterView, useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import AppointmentAPI from '@/services/AppointmentAPI'
import { useAppointmentsStore } from "@/stores/appointments"


const route = useRoute()
const router = useRouter()
const isService = computed(() => route.name === 'edit-appointment')
const { id } = route.params
const store = useAppointmentsStore()

onMounted(async () => {
  try {
    const {data} = await AppointmentAPI.getAppointmentByID(id)
    store.setSelectAppointment(data)
  } catch (error) {
    console.log(error.response.data.msg)
    setTimeout(() => {
      router.push({ name: 'my-appointments' })
    }, 1500);
  }
})

</script>
<template>
  <nav class="my-8 flex gap-3">
    <RouterLink :to="{ name: 'edit-appointment' }" :class="[isService ? 'bg-sky-500' : 'bg-sky-400/50']"
      class="flex-1 text-center text-lg px-2 lg:px-4 py-2 text-white rounded-md hover:bg-sky-500">
      Servicios</RouterLink>

    <RouterLink :to="{ name: 'edit-appointment-details' }" :class="[!isService ? 'bg-sky-500' : 'bg-sky-400/50']"
      class=" flex-1 text-center text-lg px-2 lg:px-4 py-2 text-white rounded-md hover:bg-sky-500">
      Reservas y Resumen</RouterLink>
  </nav>
  <RouterView />
</template>