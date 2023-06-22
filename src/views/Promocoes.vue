<script setup>
import TablePromocao from '../components/TablePromocao.vue'
</script>
<template  lang="">
    <div class="container mt-6">
        <div class="mt-6 columns">
            <div class="column">
                 <TablePromocao @edita="putPromocao" @deleta="deletePromocao" @adiciona="postPromocao" item="Promoções" :itemList=promocoes :lanches="lanches" /> 
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            promocoes: [],
            lanches: [],
            token: localStorage.getItem('token'),
        }
    },
    mounted() {
        this.getPromocoes();
        this.getLanches();
    },
    methods:{
        getPromocoes(){
            axios.get('http://localhost:8080/api/promocoes')
                .then(res => this.promocoes = res.data)
        },
        getLanches(){
            axios.get('http://localhost:8080/api/lanches')
                .then(res => this.lanches = res.data)
        },
        postPromocao(promocao){
            axios.post('http://localhost:8080/api/promocoes', promocao, {headers: { Authorization: `Bearer ${this.token}` }})
                .then(res => this.promocoes.push(res.data))
        },
        deletePromocao(promocao, index){
            axios.delete(`http://localhost:8080/api/promocoes/${promocao.id}`, { headers: { Authorization: `Bearer ${this.token}` } })
                .then(res => this.promocoes.splice(index))
        },
        putPromocao(promocao, index){
            promocao.valor = parseFloat(promocao.valor)

            promocao.acrescimo = parseFloat(promocao.acrescimo)

            promocao.desconto = parseFloat(promocao.desconto)

            axios.put(`http://localhost:8080/api/promocoes/${promocao.id}`, promocao , { headers: { Authorization: `Bearer ${this.token}` } })
                .then(res => {
                    this.promocoes.unshift(res.data)
                })
                .catch(error => console.log(error))
        }
    }
}
</script>
<style lang="">
    
</style>