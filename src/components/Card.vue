<template lang="">
    <div class="card">
        <header class="card-header">
    <p class="card-header-title">
      {{ nome }}
    </p>
    <button class="card-header-icon" aria-label="more options">
    </button>
  </header>
  <div class="card-content">
    <div class="content">
      {{ descricao }}
      <br>
      <p>R$ {{ valor }}</p>
    </div>
  </div>
  <footer class="card-footer">
    <a @click="compraFeita" class="card-footer-item">Comprar</a>
  </footer>
    </div>
</template>
<script>
import * as bulmaToast from 'bulma-toast'
export default {
    props: {
        nome: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            required: true
        },
        valor: {
            type: String,
            required: true
        }
  }, 
    methods: {
        compraFeita(){
            bulmaToast.toast({ message: 'Pedido Efetuado com sucesso!', type: 'is-success', duration: 5000, dismissible: true })
        }
    }
}
</script>
<style scoped lang="">
</style>