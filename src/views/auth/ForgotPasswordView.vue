<script setup>
import { useAuthStore} from "@/stores/auth"
import { reset } from "@formkit/vue";

const store = useAuthStore()

const onHandleFormSubmit = (data) => {
  store.forgotPassword(data)
  reset("forgot-form")
}

</script>
<template>
  <h2 class=" text-2xl antialiased font-semibold text-slate-100 text-center">
    Recupera el acceso a tu cuenta 
  </h2>

  <section class="my-16 w-5/6 mx-auto">
    <FormKit
      type="form"
      :actions="false"
      @submit="onHandleFormSubmit"
      id="forgot-form"
      incomplete-message="No se pudo enviar , revisa los datos"
    >
      <FormKit
        label="Correo de registro"
        name="email"
        type="email"
        validation="required|email"
        :validation-messages="{
          required: 'El correo es requerido',
          email: 'El correo no es valido',
        }"
      />

      <FormKit type="submit" label="Enviar" name="submit" />
    </FormKit>
  </section>
</template>
