import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppoinmentsLayout from '@/views/appointments/AppoinmentsLayout.vue'
import AuthAPI from '@/services/AuthAPI'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'admin-appointments',
          component: () => import('../views/admin/AdminAppointmentsView.vue')
        },
        {
          path: 'usuarios',
          name: 'admin-users',
          component: () => import('../views/admin/AdminUsersView.vue')
        }
      ]
    },
    {
      path: '/reservaciones',
      name: 'appointments',
      component: AppoinmentsLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'my-appointments',
          component: () => import('../views/appointments/AppointmentsView.vue')
        },
        {
          path: 'nueva',
          component: () => import('../views/appointments/NewReservationLayout.vue'),
          children: [
            {
              path: '',
              name: 'new-appointment',
              component: () => import('../views/appointments/NewReservationView.vue')
            },
            {
              path: 'detalles',
              name: 'appointment-details',
              component: () => import('../views/appointments/ServicesDetailsView.vue')
            }
          ]
        },
        {
          path: ':id/editar',
          component: () => import('../views/appointments/EditReservationLayout.vue'),
          children: [
            {
              path: '',
              name: 'edit-appointment',
              component: () => import('../views/appointments/NewReservationView.vue')
            },
            {
              path: 'detalles',
              name: 'edit-appointment-details',
              component: () => import('../views/appointments/ServicesDetailsView.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'acceso',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue')
        },
        {
          path: 'registro',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue')
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: () => import('../views/auth/ConfirmAccountView.vue')
        },
        {
          path: 'olvide-password',
          name: 'forgot-password',
          component: () => import('../views/auth/ForgotPasswordView.vue')
        },
        {
          path: 'recuperar-password/:token',
          name: 'reset-password',
          component: () => import('../views/auth/ResetPasswordView.vue')
        }
      ]
    }
  ],

})

// Rutas Protegidas de usuarios
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth) {
    try {
      const {data} = await AuthAPI.validateToken()

      if(data.admin){
        next({name:"admin"})
      }else{
        next()
      }
    } catch (error) {
      console.log(error.response.data.msg)
      next({ name: 'login' })
    }
  }else{
    next()
  }
})

// Rutas Protegidas de Admin
router.beforeEach(async (to, from, next) => {
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

  if (requiresAdmin) {
    try {
      await AuthAPI.validateAdmin()
      next()
    } catch (error) {
      console.log(error)
      next({ name: 'login' })
    }
  }else{
    next()
  }
})

export default router
