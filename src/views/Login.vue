<template  lang="">
    <div class="container mt-6">

        <div class="columns mt-6">
            <div class="column is-one-third">
            </div> 
            <div class="column">
                <h1 class="title">Administrador</h1>
            </div>
            <div class="column">
            </div>
        </div>

        <div class="columns mt-6">
            <div class="column is-one-third">
            </div> 
            <div class="column">
                <div class="field">
                    <label class="label">Email:</label>
                    <div class="control">
                        <input v-model="email" class="input" type="text" placeholder="exemplo@exemplo.com">
                    </div>
                </div>
            </div>
            <div class="column">
            </div>
        </div>

        <div class="columns">
            <div class="column is-one-third">
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Senha:</label>
                    <div class="control">
                        <input v-model="senha"  class="input" type="password" placeholder="******">
                    </div>
                </div>
            </div>
            <div class="column">
            </div>
        </div>

        <div class="columns">
            <div class="column is-one-third">
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Senha:</label>
                    <div class="control">
                        <button @click="login" class="button is-info">Logar</button>
                    </div>
                </div>
            </div>
            <div class="column">
            </div>
        </div>
        
    </div>
</template>
<script>
import axios from 'axios';
import * as bulmaToast from 'bulma-toast'
import { useLogadoStore } from '../stores/LogadoStore';

export default {
    
    data() {
    return {
        email: "",
        senha: ""
    }
  },
  methods: {
    login(){
        const login = {
            "email": this.email,
            "senha": this.senha
        }

        // axios.post('http://localhost:8080/api/login', login)
        //         .then(res => {
        //             localStorage.setItem("token", res.data.token);
        //             const logadoStore = useLogadoStore();
        //             logadoStore.logar();
        //             this.$router.push('/ingredientes');
        //         })
        //         .catch(error => {
        //             console.log(error)
        //             bulmaToast.toast({ message: "Usuário ou senha informados estão inválidos. Tente Novamente", type: 'is-danger', duration: 99999, dismissible: true })
        //         })

        //localStorage.setItem("token", );
        const logadoStore = useLogadoStore();
        logadoStore.logar();
        this.$router.push('/ingredientes');

    }
  }
}
</script>
<style lang="">
    
</style>