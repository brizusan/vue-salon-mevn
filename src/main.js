import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification';
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { plugin, defaultConfig } from '@formkit/vue'
import config from './formkit.config';


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(VueTailwindDatepicker)
app.use(ToastPlugin);
app.use(plugin, defaultConfig(config))
app.use(createPinia())
app.use(router)
app.mount('#app')
