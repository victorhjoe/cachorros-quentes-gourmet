<script setup>
    import Card from '../components/Card.vue';
</script>
<template lang="">
    <div class="mt-6">
    <section class="section">
        <h1 class="title">Lanches</h1>
        <h2 class="subtitle">
            Temos essas deliciosas opções de lanches disponíveis para compra ou monte seu lanche personalizado.
        </h2>
        <router-link 
            to="/pedido-personalizado"
            class="navbar-item"
            ><button class="button is-danger">Pedir lanche personalizado</button></router-link>

    </section>

    <div class="mt-6 mx-1 columns ">
        <div class="column" v-for="lanche in lanches">
            <Card :nome=lanche.nome descricao="Completo com todos os acompanhamentos." :valor=lanche.valor.toFixed(2)></Card>
        </div>
    </div>
    </div>
    <section class="hero is-info mt-6">
        <div class="hero-body">
            <p class="title">
            Promoções
            </p>
            <p class="subtitle">
            Confira aqui nossas promoções
            </p>
        </div>
    </section>
    <div class="mt-6 mx-1 columns ">
        <div class="column" v-for="promocao in promocoes">
            <Card :nome=promocao.nome descricao="preço promocional" :valor=promocao.valor.toFixed(2)></Card>
        </div>
    </div>

</template>
<script>
import axios from 'axios';

export default {

    data() {
        return {
            lanches: [],
            promocoes: []
        }  
    },
    mounted() {
        this.getLanches();
        this.getPromocoes();
    },
    methods:{
        getLanches(){
            axios.get('http://localhost:8080/api/lanches')
                .then(res => this.lanches = res.data)
        },
        getPromocoes(){
            axios.get('http://localhost:8080/api/promocoes')
                .then(res => this.promocoes = res.data)
        }
    }
}
</script>

<style lang="">
</style>