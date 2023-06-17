<template lang="">
    <div class="container">
        <section class="section mt-6">
            <h1 class="title">Lanche Personalizado</h1>
            <h2 class="subtitle">
                Monte aqui seu lanche personalizado.
            </h2>
        </section>
        <div class="columns is-mobile is-centered">
            <div class="column is-half has-text-centered">
                <h1 class="title">Ingredientes</h1>
            </div>
        </div>
        <div class="columns is-mobile is-centered">
            <div class="column is-half box">
                <div class="columns is-mobile">
                    <div v-for="(grupo, index) in gruposIngredientes" :key="index" class="column is-one-third">
                        <div class="field" v-for="ingrediente in grupo">
                            <div class="control">
                                <label class="checkbox">
                                    <input :value="ingrediente" v-model="ingredientesEscolhidos" type="checkbox">
                                    {{ ingrediente.nome }}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-grouped is-grouped-centered mt-2">
            <div class="field">
                <div class="control">
                    <button @click="efetuarPedido" class="button is-primary">
                        Efetuar Pedido
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import * as bulmaToast from 'bulma-toast'

export default {
    data() {
        return {
            ingredientes: [],
            ingredientesEscolhidos: [],
            valorLanche: 0.00
        }
    },
    mounted() {
        this.getIngredientes();
    },
    methods: {
        getIngredientes() {
            axios.get('http://localhost:8080/api/ingredientes')
                .then(res => this.ingredientes = res.data)
        },
        efetuarPedido() {
            const precos = this.ingredientesEscolhidos.map(ingrediente => ingrediente.valor);
            this.valorLanche = precos.reduce((somaParcial, a) => somaParcial + a, 0).toFixed(2);

            if (this.valorLanche > 0) {
                bulmaToast.toast({ message: `Sua compra com o valor de R$ ${this.valorLanche} foi solicitada!`, type: 'is-success', duration: 99999, dismissible: true })
                this.$router.push('/pedidos')
            }
        }
    },
    computed: {
        gruposIngredientes() {
            const grupos = [];
            for (let i = 0; i < this.ingredientes.length; i += 3) {
                grupos.push(this.ingredientes.slice(i, i + 3));
            }
            return grupos;
        }
    }
}
</script>

<style lang="">
    
</style>
