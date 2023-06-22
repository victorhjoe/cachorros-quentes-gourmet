<template lang="">
    <div class="container mt-6">
        <div class="mt-6">
            <table class="table is-narrow">
                <thead>
                    <tr>
                        <th>{{ item }}</th>
                        <th>Valor</th>
                        <th >Lanche</th>
                        <th >Lanche Adicional</th>
                        <th >Acrescimo</th>
                        <th >Desconto</th>
                        <th></th>
                        <th><button @click="adicionaCampo" class="button is-success">Adicionar</button></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="editItem">
                        <th>
                            <div class="control">
                                <input v-model="nomeEdit" class="input" type="text" placeholder="Nome">
                            </div>
                        </th>
                        <td>
                        </td>
                        <td>
                            <div class="select">
                                <select v-model="lancheAddEdit">
                                    <option></option>
                                    <option v-for="lanche in lanches" :value="lanche">{{ lanche.nome }}</option>
                                </select>
                            </div>
                        </td>
                        <td>
                        <div class="select">
                            <select v-model="lancheAdicionalAddEdit">
                                <option></option>
                                <option v-for="lanche in lanches" :value="lanche">{{ lanche.nome }}</option>
                            </select>
                        </div>
                         </td>
                        <td>
                            <div class="control">
                                <input v-model="acrescimoEdit"  class="input" type="text" placeholder="Nome">
                            </div>
                        </td>
                        <td>
                            <div class="control">
                                <input v-model="descontoEdit"  class="input" type="text" placeholder="Nome">
                            </div>
                        </td>
                        <td><button @click="confirmEditar(item, index)" class="button is-info">Adicionar</button></td>
                        <td><button  @click="cancelarEditar(editIndex)" class="button is-danger">Cancelar</button></td>
                    </tr>
                    <tr v-if="addItem">
                        <th>
                            <div class="control">
                                <input v-model="nomeAdd" class="input" type="text" placeholder="Nome">
                            </div>
                        </th>
                        <td>
                        </td>
                        <td>
                            <div class="select">
                                <select v-model="lancheAdd">
                                    <option></option>
                                    <option v-for="lanche in lanches" :value="lanche">{{ lanche.nome }}</option>
                                </select>
                            </div>
                        </td>
                        <td>
                        <div class="select">
                            <select v-model="lancheAdicionalAdd">
                                <option></option>
                                <option v-for="lanche in lanches">{{ lanche.nome }}</option>
                            </select>
                        </div>
                         </td>
                        <td>
                            <div class="control">
                                <input v-model="acrescimo"  class="input" type="text" placeholder="Nome">
                            </div>
                        </td>
                        <td>
                            <div class="control">
                                <input v-model="desconto"  class="input" type="text" placeholder="Nome">
                            </div>
                        </td>
                        <td><button @click="adicionar" class="button is-info">Adicionar</button></td>
                        <td><button @click="removerAdicionar" class="button is-danger">Cancelar</button></td>
                    </tr>
                    <tr v-for="(item, index) in itemList">
                        <th>{{ item.nome }}</th>
                        <td>R$: {{ item.valor.toFixed(2).replace('.', ',') }}</td>
                        <td >
                            {{ item.lanches[0].nome ?  item.lanches[0].nome : ""}}
                        </td>
                        <td >
                            {{ item.lanches[1] ? item.lanches[1].nome : ''}}
                        </td>

                        <td >
                            {{ item.acrescimo ? `R$ ${item.acrescimo}` : "" }}
                        </td>
                        <td >
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
            lancheAdd: null,
            lancheAdicionalAdd: null,
            acrescimo: "0",
            desconto: "0",
            addPromotion: false,
            lancheAddEdit: null,
            lancheAdicionalAddEdit: null,
            acrescimoEdit: "0",
            descontoEdit: "0"
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
        lanches: {
            type: Array,
            required: true
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
            let lanchesDTO = [];
            lanchesDTO.push(this.lancheAdd);

            let valorDTO = this.lancheAddEdit.valor;


            if(this.lancheAdicionalAdd != null){
                lanchesDTO.push(this.lancheAdicionalAdd);
                valorDTO += this.lancheAdicionalAddEdit.valor;
            }

            valorDTO = this.calcularValor(valorDTO, parseFloat(this.acrescimo), parseFloat(this.desconto));
             
            const promocao = {
                nome: this.nomeAdd,
                lanches: lanchesDTO,
                acrescimo: this.acrescimo,
                desconto: this.desconto,
                valor: valorDTO
            }
            
            this.$emit('adiciona', promocao);
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
            this.lancheAdd = null,
            this.lancheAdicionalAdd = {};
            this.lancheAddEdit = {};
            this.lancheAdicionalAddEdit = {};
            this.acrescimo = "0";
            this.desconto = "0";
            this.acrescimoEdit = "0";
            this.descontoEdit = "0";
        },
        editar(item, index){
            this.idEdit = item.id;
            this.nomeEdit = item.nome;
            this.valorEdit = item.valor;
            this.lancheAddEdit = item.lanches[0] ? item.lanches[0] : [];
            if(item.lanches.length > 1){
                this.lancheAdicionalAddEdit = item.lanches[1]
            }

            this.acrescimoEdit = item.acrescimo;
            this.descontoEdit = item.desconto;
            this.itemList.splice(index, 1);
            this.editItem = true;
            this.editIndex = index;
        },
        confirmEditar(item, index){
            let lanchesDTO = [];
            lanchesDTO.push(this.lancheAddEdit);
            console.log('this.lancheAddEdit', this.lancheAddEdit);
            console.log('this.lancheAdicionalAddEdit', this.lancheAdicionalAddEdit);  

            let valorDTO = this.lancheAddEdit.valor;


            if(this.lancheAdicionalAdd != null){
                lanchesDTO.push(this.lancheAdicionalAddEdit);
                valorDTO += this.lancheAdicionalAdd.valor;
            }

            console.log('lanchesDTO', lanchesDTO);

            valorDTO = this.calcularValor(valorDTO, parseFloat(this.acrescimo), this.desconto);

            this.$emit('edita', { id: this.idEdit, nome: this.nomeEdit, lanches: lanchesDTO, acrescimo: this.acrescimoEdit, desconto: this.descontoEdit, valor: valorDTO }, index);
            this.editItem = false;
            this.limparCampos();
        },
        cancelarEditar(index){
            let lanches = [];

            lanches.push(this.lancheAddEdit);
            
            if(this.lancheAdicionalAddEdit){
                lanches.push(this.lancheAdicionalAddEdit);
            }

            const itemOld = {
                id: this.idEdit,
                nome: this.nomeEdit,
                valor: this.valorEdit,
                lanches: lanches,
                acrescimo: this.acrescimoEdit,
                desconto: this.descontoEdit
            }
            this.editItem = false;
            this.itemList.splice(index, 0, itemOld);
            this.limparCampos();
        },
        calcularValor(valor, acrescimo, desconto){
            let resposta = valor;
            let descontoValor = (valor * desconto)/100;
            resposta = valor - descontoValor;
            return resposta + acrescimo;
        }
    }
}
</script>
<style lang="">
    
</style>