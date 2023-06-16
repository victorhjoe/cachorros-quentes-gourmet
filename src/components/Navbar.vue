<template lang="">
    <div>
        <nav class="navbar is-link is-fixed-top" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item">
                   <h1>Cachorros Quentes Gourmet</h1>
                </a>

                <a role="button" @click="teste" class="navbar-burger" :class="{'is-active': isMenuActive}" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active': isMenuActive}">
                <div class="navbar-start">
                    <router-link 
                    to="/"
                    class="navbar-item"
                    >Home</router-link>
                    <router-link 
                    to="/pedidos"
                    class="navbar-item"
                    >Pedidos</router-link>
                    <router-link 
                    to="/pedido-personalizado"
                    class="navbar-item"
                    >Pedido Personalizado</router-link>
                </div>

                <div class="navbar-end">
                <div class="navbar-item" >
                    <div class="buttons" >
                    <router-link to="/login">
                        <a class="button is-danger">
                            <svg-icon type="mdi" :path="path"></svg-icon>
                        </a>
                    </router-link>
                    </div>
                </div>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountSupervisor } from '@mdi/js'
import { RouterLink } from 'vue-router'
export default {
    data() {
    return {
      isMenuActive: false,
      path: mdiAccountSupervisor,
    }
  },
  methods: {
    teste() {
        this.isMenuActive = !this.isMenuActive;
    }
  },
  components: {
		SvgIcon
	},
}
</script>
<style lang="">
    
</style>