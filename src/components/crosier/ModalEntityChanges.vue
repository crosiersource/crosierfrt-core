<template>
  <Dialog
    :key="store.modalEntityChanges_key"
    ref="dialog"
    v-model:visible="store.exibirModalEntityChanges"
    header="Alterações"
    :style="{ width: '55vw' }"
    modal
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :autoZIndex="false"
  >
    <div class="row">
      <CrosierInputText
        v-if="dadosCriacao"
        id="dadosCriacao"
        v-model="dadosCriacao"
        label="Criação"
        col="6"
        disabled
        inputClass="notuppercase"
      />
      <CrosierInputText
        v-if="dadosAlteracao"
        id="dadosAlteracao"
        v-model="dadosAlteracao"
        label="Última Alteração"
        col="6"
        disabled
        inputClass="notuppercase"
      />
    </div>
    <CrosierListS
      v-if="entityId"
      ref="crosierListS_entityChanges"
      withoutCard
      :comFiltragem="false"
      :comPaginador="false"
      apiResource="/api/core/config/entityChanges/"
      :staticFilters="{
        entityClass: entityClass,
        entityId: entityId,
      }"
      @after-filter="loadInsertedUpdated"
    >
      <template #columns>
        <Column field="obs" header="Alterações">
          <template #body="r">
            <div v-html="r.data.changes" />
          </template>
        </Column>

        <Column field="changedAt" header="Em" :sortable="true">
          <template #body="r" class="text-center">
            {{ r.data.changedAt ? moment(r.data.changedAt).format('DD/MM/YYYY HH:mm:ss') : '' }}
          </template>
        </Column>

        <Column field="changingUserUsername" header="Por" :sortable="true" />
      </template>
    </CrosierListS>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';
import Column from 'primevue/column';
import moment from 'moment-timezone';
import CrosierListS from './CrosierListS';
import CrosierInputText from './fields/CrosierInputText';
// import { CrosierInputText, CrosierListS } from "crosier-vue";

export default {
  name: 'ModalEntityChanges',

  components: {
    Dialog,
    CrosierListS,
    Column,
    CrosierInputText,
  },

  props: {
    entityClass: {
      type: String,
      required: true,
    },
    storeFieldsName: {
      type: String,
      required: false,
      default: 'fields',
    },
  },

  data() {
    return {
      dadosCriacao: null,
      dadosAlteracao: null,
    };
  },

  computed: {
    entityId() {
      return this.store?.[this.storeFieldsName]?.id;
    },
  },

  methods: {
    moment(date) {
      return moment(date);
    },

    async loadInsertedUpdated() {
      console.log('loadInsertedUpdated');
      console.log(this.$refs.crosierListS_entityChanges?.tableData);
      if (this.$refs.crosierListS_entityChanges?.tableData) {
        const tableData = this.$refs.crosierListS_entityChanges.tableData;

        const inserido = tableData.find((e) => e.changes === 'INSERIDO');
        this.dadosCriacao = `${this.moment(inserido.changedAt).format('DD/MM/YYYY HH:mm:ss')} por ${
          inserido.changingUserUsername
        }`;

        this.dadosAlteracao = `${this.moment(tableData[0].changedAt).format(
          'DD/MM/YYYY HH:mm:ss',
        )} por ${tableData[0].changingUserUsername}`;
      }
    },
  },
};
</script>
