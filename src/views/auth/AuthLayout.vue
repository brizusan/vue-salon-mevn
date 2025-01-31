<script setup>
import { computed } from "vue"
import { RouterView, RouterLink , useRoute } from "vue-router";

const route = useRoute()

const authRoutes = [
  { name: "login", text: "Iniciar Sesión" },
  { name: "register", text: "Crear Cuenta" },
  { name: "forgot-password", text: "Olvide Contraseña" },
];

const isName = (name) => route.name === name
const isConfirmAccount = computed(() => route.name === 'confirm-account')
const isResetPassword = computed(() => route.name === 'reset-password')

</script>
<template>
  <h1 class="text-3xl font-bold text-white mt-8 text-center">
    Salon MEVN | Bienvenido
  </h1>
  <section class="my-12 w-5/6 lg:w-full mx-auto">
    <RouterView />
    <nav 
      v-if="!isConfirmAccount && !isResetPassword"
      class="flex justify-between lg:justify-around gap-6 my-6">
      <RouterLink
        v-for="route in authRoutes"
        :key="route.name"
        :to="{ name: route.name }"
        class="text-sm text-slate-300 tracking-wider font-semibold underline underline-offset-4 hover:no-underline hover:text-white px-2 lg:px-4 py-2 rounded-md"
        :class="{ 'hidden': isName(route.name) }"
      >
        {{ route.text }}
      </RouterLink>
    </nav>
  </section>
</template>
