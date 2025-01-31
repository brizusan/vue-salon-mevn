<script setup>
import { useUserStore } from "@/stores/user";
import AdminCitaItem from "@/components/AdminCitaItem.vue";

const user = useUserStore();
</script>
<template>
  <p class="text-lg font-semibol text-white mt-8">
    A continucacion podras administrar tus proximas citas
  </p>

  <p
    v-if="user.loading"
    class="text-white antialiased text-2xl text-center mt-5"
  >
    Cargando...
  </p>

  <section v-else>
    <p
      v-if="user.isEmptyAppointments"
      class="text-white antialiased text-2xl text-center mt-5"
    >
      No tienes citas pendientes
    </p>

    <section v-else class="grid xl:grid-cols-2  gap-4 my-6 items-start">
      <AdminCitaItem
        v-for="appointment in user.userAppointments"
        :key="appointment._id"
        :appointment="appointment"
      />
      </section>
  </section>
</template>
