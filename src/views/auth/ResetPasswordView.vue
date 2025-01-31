<script setup>
import { onMounted } from "vue"
import { useRoute } from "vue-router"
import { FormKit, reset } from "@formkit/vue";
import { useAuthStore } from "@/stores/auth";


const store = useAuthStore();
const route = useRoute();
const { token } = route.params;

onMounted(async() => {
  await store.verifyTokenForgot(token);
})

const onHandleFormSubmit = (data) => {
  const {password_confirm , ...password} = data
  store.resetPassword( token , password)
  reset("password-form")
}


</script>
<template>
  <h2 class="text-2xl antialiased font-semibold text-slate-100 text-center">
    Reestablece el acceso a tu cuenta
  </h2>

  <section class="my-16 w-5/6 mx-auto">
    <FormKit
      type="form"
      :actions="false"
      @submit="onHandleFormSubmit"
      id="password-form"
      incomplete-message="No se pudo enviar , revisa los datos"
    >
      <FormKit
        type="password"
        name="password"
        label="Nueva Contraseña"
        validation="required|length:8"
        :validation-messages="{
          required: 'La contraseña es requerida',
          length: 'La contraseñadebe tener al menos 8 caracteres',
        }"
        placeholder="password min 8 caracteres"
      />
      <FormKit
        type="password"
        name="password_confirm"
        label="Repetir Contraseña"
        validation="required | confirm"
        :validation-messages="{
          required: 'Repetir contraseña es requerida',
          confirm: 'Los campos no coinciden',
        }"
        placeholder="repetir password"
      />

      <FormKit type="submit" label="Enviar" name="submit" />
    </FormKit>
  </section>
</template>
