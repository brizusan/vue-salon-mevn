<script setup>
import { FormKit  , reset } from "@formkit/vue";
import { useAuthStore } from "@/stores/auth"

const store = useAuthStore()

const registerForm = (data)=>{
  const {password_confirm , ...formData} = data 
  store.registerUser(formData)
  reset('register-form')
}


</script>
<template>
  <h2 class="text-center text-2xl font-semibold text-slate-100">
    Crea una cuenta en Salón MEVN
  </h2>

  <section class="my-12">
    <FormKit
      id="register-form"
      type="form"
      :actions="false"
      submit-label="Crear Cuenta"
      @submit="registerForm"
      incomplete-message="No se puedo registrar , revisa las alertas"
    >
      <FormKit
        type="text"
        name="name"
        label="Nombre"
        validation="required"
        :validation-messages="{ required: 'El nombre es requerido' }"
        placeholder="exm: briam.."
      />
      <FormKit
        type="text"
        name="lastName"
        label="Apellido"
        validation="required"
        :validation-messages="{ required: 'Los apellidos son requeridos' }"
        placeholder="exm: hernandez chavez..."
      />
      <FormKit
        type="email"
        name="email"
        label="Email"
        validation="required|email"
        :validation-messages="{
          required: 'El email es requerido',
          email: 'El email no es valido',
        }"
        placeholder="exm: 2Hc0t@example.com"
      />
      <FormKit
        type="password"
        name="password"
        label="Password"
        validation="required|length:8"
        :validation-messages="{
          required: 'El password es requerido',
          length: 'El password debe tener al menos 8 caracteres',
        }"
        placeholder="password min 8 caracteres"
      />
      <FormKit
        type="password"
        name="password_confirm"
        label="Repetir Password"
        validation="required | confirm"
        :validation-messages="{
          required: 'Repetir password es requerido',
          confirm: 'Los passwords no coinciden',
        }"
        placeholder="repetir password"
      />

      <FormKit type="submit" label="Crear Cuenta" />
    </FormKit>
  </section>
</template>
