<script setup>
import Table from '../components/Table.vue'
</script>
<template  lang="">
    <div class="container mt-6">
        <div class="mt-6 columns">
            <div class="column">
                <Table item="Ingredientes" @edita="putIngrediente" @adiciona="postIngrediente" @deleta="deleteIngrediente" :itemList=ingredientes />
            </div>
            <div class="column">
                <Table item="Promoções" :isPromotion="true" :itemList=promocoes />
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            ingredientes: [],
            promocoes: [],
            token: localStorage.getItem('token'),
        }
    },
    mounted() {
        this.getIngredientes();
        this.getPromocoes();
    },
    methods:{
        getIngredientes(){
            axios.get('http://localhost:8080/api/ingredientes')
                .then(res => this.ingredientes = res.data)
        },
        getPromocoes(){
            axios.get('http://localhost:8080/api/promocoes')
                .then(res => this.promocoes = res.data)
        },
        postIngrediente(ingrediente){
            ingrediente.valor = parseFloat(ingrediente.valor.replace(',', '.'))
            axios.post('http://localhost:8080/api/ingredientes', ingrediente, {headers: { Authorization: `Bearer ${this.token}` }})
                .then(res => this.ingredientes.push(res.data))
        },
        deleteIngrediente(ingrediente, index){
            axios.delete(`http://localhost:8080/api/ingredientes/${ingrediente.id}`, { headers: { Authorization: `Bearer ${this.token}` } })
                .then(res => this.ingredientes.splice(index))
        },
        putIngrediente(ingrediente){
            ingrediente.valor = parseFloat(ingrediente.valor.replace(',', '.'))
            axios.put(`http://localhost:8080/api/ingredientes/${ingrediente.id}`, { nome: ingrediente.nome, valor: ingrediente.valor }, { headers: { Authorization: `Bearer ${this.token}` } })
                .then(res => this.ingredientes.splice(ingrediente.index, 0, res.data))
        }
    }
}
</script>
<style lang="">
    
</style>