<script setup>
import { useUserStore } from "@/stores/user"
import {displayDate} from "@/utils/date"
import {formatCurrency} from "@/utils"

defineProps({
  cita: {
    type: Object,
    required: true
  }
})

const store = useUserStore()


</script>
<template>
  <div class="bg-white p-4 space-y-2 rounded-lg">
    <p class="text-gray-500 font-black">
      Fecha: <span class="font-light">{{displayDate(cita.date)}}</span>
      
    </p>
    <p class="text-gray-500 font-black">
      Hora: <span class="font-light">{{cita.time}} .hrs</span>
    </p>

    <p class="font-black text-lg text-gray-600">Servicios reservados</p>
    <div 
      v-for="service in cita.services"
      :key="service._id"
      class="flex justify-between items-center"
    >
      <p class="text-gray-500 font-semibold capitalize">
        {{service.name}}
      </p>
      <p class="text-gray-500 font-black">
        {{formatCurrency(service.price)}}
      </p>
    </div>
    <p class="font-semibold text-xl text-right text-gray-600">Total a pagar : <span class="text-blue-500">{{formatCurrency(cita.total)}}</span></p>
    <div class="flex gap-4 items-center pt-5">
      <button
        @click="store.cancelReservation(cita._id)"
        class="w-[250px] bg-red-500 hover:bg-red-600 py-2 text-white uppercase font-semibold transition-colors rounded-md"
      >Cancelar </button>
      <RouterLink :to="{name: 'edit-appointment', params: {id: cita._id}}"
        class="w-[250px] bg-sky-500 text-center hover:bg-sky-600 py-2 text-white uppercase font-semibold transition-colors rounded-md"
      >Editar</RouterLink>
    </div>
  </div>
</template>