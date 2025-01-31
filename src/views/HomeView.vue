<script setup></script>

<template>
  <main>
    <header class="pt-8">
      <h2
        class="text-center text-white uppercase text-4xl font-bold antialiased mx-auto"
      >
        Sistema de Gestión de Reservaciones de Barberia
      </h2>
      <nav class="flex justify-end gap-6 my-6">
        <RouterLink
          :to="{ name: 'login' }"
          class="border border-blue-600 text-white bg-blue-500 hover:bg-blue-600 px-2 lg:px-4 py-2 rounded-md"
        >
          Iniciar Sesión
        </RouterLink>
        <RouterLink
          :to="{ name: 'register' }"
          class="border border-blue-400 text-blue-500 font-semibold bg-slate-100 px-2 lg:px-4 py-2 rounded-md hover:bg-slate-200"
        >
          Registrarme
        </RouterLink>
      </nav>
    </header>

    <section class="my-12">
      <h1
        class="text-center text-2xl lg:text-4xl font-bold text-white uppercase"
      >
        Salon MEVN
      </h1>

      <h3
        class="text-3xl font-semibold text-center antialiased text-slate-200 my-8 uppercase"
      >
        Alguno de nuestros Servicios
      </h3>

      <ul class="flex justify-center flex-wrap gap-8 my-8">
        <li
          class="text-lg tracking-widest border-slate-200 rounded-md p-4 text-white antialiased border-b-4"
        >
          Registros de Usuarios
        </li>
        <li
          class="text-lg tracking-widest border-slate-200 rounded-md p-4 text-white antialiased border-b-4"
        >
          Autenticacion
        </li>
        <li
          class="text-lg tracking-widest border-slate-200 rounded-md p-4 text-white antialiased border-b-4"
        >
          Registro de Reservaciones
        </li>
        <li
          class="text-lg tracking-widest border-slate-200 rounded-md p-4 text-white antialiased border-b-4"
        >
          Listado de Reservaciones
        </li>
        <li
          class="text-lg tracking-widest border-slate-200 rounded-md p-4 text-white antialiased border-b-4"
        >
          Reporte de Reservaciones
        </li>
        <li
          class="text-lg tracking-widest border-slate-200 rounded-md p-4 text-white antialiased border-b-4"
        >
          Actualizacion o cambios en Reservaciones
        </li>
        <li
          class="text-lg tracking-widest border-slate-200 rounded-md p-4 text-white antialiased border-b-4"
        >
          Listado de Servicios
        </li>
      </ul>
    </section>
    <footer class="space-y-4 xl:min-h-[20vh] xl:flex xl:flex-col lg:justify-between">
      <p class="text-center text-slate-100 text-lg max-w-lg mx-auto">
        <q class="text-center text-slate-100 text-lg">
          Esta aplicación busca modernizar la experiencia de la barbería,
          mejorando la satisfacción del cliente y simplificando las tareas
          diarias de los barberos y propietarios del negocio.
        </q>
      </p>
      <p class="text-center text-slate-100 text-lg">
        Realizado por: <a class="font-semibold text-blue-400  underline underline-offset-4 hover:no-underline hover:text-white" target="_blank" rel="noopener noreferrer"  href="https://github.com/brizusan">@Brycezusan</a> © {{ new Date().getFullYear() }}
      </p>
    </footer>
  </main>
</template>
