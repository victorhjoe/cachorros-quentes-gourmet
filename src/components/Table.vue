<template lang="">
    <div class="container mt-6">
        <div class="mt-6">
            <table class="table">
                <thead>
                    <tr>
                        <th>{{ item }}</th>
                        <th>Valor</th>
                        <th v-if="isPromotion">Lanche</th>
                        <th v-if="isPromotion">Lanche Adicional</th>
                        <th v-if="isPromotion">Acrescimo</th>
                        <th v-if="isPromotion">Desconto</th>
                        <th></th>
                        <th><button @click="adicionaCampo" class="button is-success">Adicionar</button></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="addPromotion">
                        <th>
                            <div class="control">
                                <input v-model="nomeEdit" class="input" type="text" placeholder="Nome">
                            </div>
                        </th>
                        <td>
                            <div class="control">
                                <input v-model="valorAdd" class="input" type="text" placeholder="preço">
                            </div>
                        </td>
                        <td>
                            <div class="select">
                                <select>
                                    <option>Select dropdown</option>
                                </select>
                            </div>
                        </td>
                        <td>
                            {{ item.lanches[1] ? item.lanches[1].nome : ''}}
                        </td>

                        <td>
                            {{ item.acrescimo ? `R$ ${item.acrescimo}` : "" }}
                        </td>
                        <td>
                           {{ item.desconto ? `${item.desconto} %`: "" }}
                        </td>

                        <td><button @click="editar(item, index)" class="button is-info">Editar</button></td>
                        <td><button @click="deletar(item, index)" class="button is-danger">Excluir</button></td>
                    </tr>
                    <tr v-if="editItem">
                        <th>
                            <div class="control">
                                <input v-model="nomeEdit" class="input" type="text" placeholder="Nome">
                            </div>
                        </th>
                        <td>
                            <div class="control">
                                <input v-model="valorEdit" class="input" type="text" placeholder="preço">
                            </div>
                        </td>
                        <td><button @click="confirmEditar" class="button is-info">Confirmar</button></td>
                        <td><button @click="cancelarEditar(editIndex)" class="button is-danger">Cancelar</button></td>
                    </tr>
                    <tr v-if="addItem">
                        <th>
                            <div class="control">
                                <input v-model="nomeAdd" class="input" type="text" placeholder="Nome">
                            </div>
                        </th>
                        <td>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><button @click="adicionar" class="button is-info">Adicionar</button></td>
                        <td><button @click="removerAdicionar" class="button is-danger">Cancelar</button></td>
                    </tr>
                    <tr v-for="(item, index) in itemList">
                        <th>{{ item.nome }}</th>
                        <td>R$: {{ item.valor.toFixed(2).replace('.', ',') }}</td>
                        <td v-if="isPromotion">
                            {{ item.lanches[0].nome }}
                        </td>
                        <td v-if="isPromotion">
                            {{ item.lanches[1] ? item.lanches[1].nome : ''}}
                        </td>

                        <td v-if="isPromotion">
                            {{ item.acrescimo ? `R$ ${item.acrescimo}` : "" }}
                        </td>
                        <td v-if="isPromotion">
                           {{ item.desconto ? `${item.desconto} %`: "" }}
                        </td>

                        <td><button @click="editar(item, index)" class="button is-info">Editar</button></td>
                        <td><button @click="deletar(item, index)" class="button is-danger">Excluir</button></td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            addItem: false,
            nomeAdd: "",
            valorAdd: "",
            editItem: false,
            idEdit: null,
            nomeEdit: "",
            valorEdit: "",
            editIndex: null,
            lanche: "",
            addPromotion: false
        }
    },
    props: {
        itemList: {
            type: Array,
            required: true
        },
        item: {
            type: String,
            required: true
        },
        isPromotion: {
            type: Boolean,
            required: false
        }
    },
    methods: {
        adicionaCampo(){
            this.addItem = true;
        },
        removerAdicionar(){
            this.addItem = false;
            this.limparCampos();
        },
        adicionar(){
            this.$emit('adiciona', { nome: this.nomeAdd, valor: this.valorAdd });
            this.limparCampos();
            this.addItem = false;
        },
        deletar(item, index){
            this.$emit('deleta', item, index)
        },
        limparCampos(){
            this.nomeAdd = "";
            this.valorAdd = "";
            this.nomeEdit = "";
            this.valorEdit = "";
            this.idEdit = null;
            this.editIndex = null;
        },
        editar(item, index){
            this.idEdit = item.id;
            this.nomeEdit = item.nome;
            this.valorEdit = item.valor;
            this.itemList.splice(index, 1);
            this.editItem = true;
            this.editIndex = index;
        },
        confirmEditar(){
            this.$emit('edita', { id: this.idEdit, nome: this.nomeEdit, valor: this.valorEdit, index: this.editIndex });
            this.limparCampos();
            this.editItem = false;
        },
        cancelarEditar(index){
            const itemOld = {
                id: this.idEdit,
                nome: this.nomeEdit,
                valor: this.valorEdit
            }
            this.editItem = false;
            this.itemList.splice(index, 0, itemOld);
            this.limparCampos();
        }
    }
}
</script>
<style lang="">
    
</style>