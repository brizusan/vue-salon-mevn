<script setup>
import { FormKit, reset } from "@formkit/vue";
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore()

const loginForm = async (data) => {
  await store.loginAccount(data)
  setTimeout(() => {
    reset('login-form')
  }, 2000);
}
</script>
<template>
  <h2 class="text-center text-2xl font-semibold text-slate-100">
    Iniciar Sesión - Salón MEVN
  </h2>

  <section class="my-16 w-5/6 mx-auto">
    <FormKit 
      type="form"
      :actions="false"
      @submit="loginForm"
      id="login-form"
      incomplete-message="No se pudo iniciar sesion , revisa los datos"

  >
    <FormKit
      label="Correo"
      name="email"
      type="email"
      validation="required|email"
      :validation-messages="{required: 'El correo es requerido', email: 'El correo no es valido'}"
    />

    <FormKit 
      label="Contraseña"
      name="password"
      type="password"
      validation="required"
      :validation-messages="{required: 'La contraseña es requerida'}"
    />

    <FormKit 
      type="submit"
      label="Iniciar Sesión"
    />

  </FormKit>
  </section>


</template>