import { defineStore } from "pinia";

export const useLogadoStore = defineStore('logado', {
    state(){
        return {
            logado: false
        }
    },
    actions: {
        logar(){
            this.logado = true;
        },
        deslogar(){
            this.logado = false;
        }
    }
})