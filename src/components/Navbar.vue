<template lang="">
    <div>
        <nav class="navbar is-link is-fixed-top" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item">
                   <h1>Cachorros Quentes Gourmet</h1>
                </a>

                <a role="button" @click="ativo" class="navbar-burger" :class="{'is-active': menuAtivo}" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active': menuAtivo}">
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
                    <router-link 
                    v-if="logadoStore.logado"
                    to="/painel"
                    class="navbar-item"
                    >Painel ADM</router-link>
                </div>

                <div class="navbar-end">
                <div class="navbar-item" >
                    <div class="buttons" >

                        <a v-if="logadoStore.logado" @click="deslogar" class="button is-danger">
                            <svg-icon type="mdi" :path="logadoIcon"></svg-icon>
                        </a>

                        <router-link v-else to="/login">
                            <a class="button is-danger">
                                <svg-icon type="mdi" :path="deslogadoIcon"></svg-icon>
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
import { mdiLoginVariant, mdiLogout } from '@mdi/js'
import { RouterLink } from 'vue-router'
import { useLogadoStore } from '../stores/LogadoStore';


export default {
    data() {
    return {
      menuAtivo: false,
      logadoIcon:  mdiLogout,
      deslogadoIcon: mdiLoginVariant,
      logadoStore: useLogadoStore()
    }
  },
  mounted() {
  },
  methods: {
    ativo() {
        this.menuAtivo = !this.menuAtivo;
    },
    deslogar(){
        localStorage.removeItem('token');
        this.logadoStore.deslogar()
        this.$router.push('/');
    }
  },
  components: {
		SvgIcon
	},
}
</script>
<style lang="">
    
</style>