import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pedidos from '../views/Pedidos.vue'
import PedidoPersonalizado from '../views/PedidoPersonalizado.vue'
import Login from '../views/Login.vue'
import Ingredientes from '../views/Ingredientes.vue'
import Promocoes from '../views/Promocoes.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: Pedidos
    },
    {
      path: '/pedido-personalizado',
      name: 'personalizado',
      component: PedidoPersonalizado
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/ingredientes',
      name: 'ingredientes',
      component: Ingredientes
    },
    {
      path: '/promocoes',
      name: 'promocoes',
      component: Promocoes
    },
  ]
})

export default router
