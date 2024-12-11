<template>
  <Toast group="mainToast" position="bottom-right" class="mb-5" />
  <ConfirmDialog group="confirmDialog_crosierListS" />

  <CrosierListS
    ref="dt"
    :store="userStore"
    titulo="Usuários"
    apiResource="/api/sec/user/"
    :formUrl="formUrl"
    filtrosNaSidebar
  >
    <template #filter-fields>
      <CrosierInputText id="username" v-model="userStore.filters.username" label="Usuário" />
      <CrosierInputEmail id="email" v-model="userStore.filters.email" label="E-mail" />
      <CrosierInputText id="descricao" v-model="userStore.filters.descricao" label="Descrição" />
      <CrosierDropdownBoolean
        id="ativo"
        v-model="userStore.filters.isActive"
        label="Ativo"
        :options="[
          { name: '-', value: null },
          { name: 'Sim', value: true },
          { name: 'Não', value: false },
        ]"
      />
    </template>

    <template #columns>
      <Column field="id" header="Id" :sortable="true">
        <template #body="r">
          {{ ('00000000' + r.data.id).slice(-8) }}
        </template>
      </Column>

      <Column field="username" header="Usuário" :sortable="true" />

      <Column field="email" header="E-mail" :sortable="true" />

      <Column field="nome" header="Nome" :sortable="true" />

      <Column field="descricao" header="Descrição" :sortable="true" />

      <Column field="isActive" header="Ativo" :sortable="true">
        <template #body="r">
          <div class="text-center">
            {{ r.data.isActive ? 'Sim' : 'Não' }}
          </div>
        </template>
      </Column>

      <Column field="updated" header="" :sortable="true">
        <template #body="r" class="text-right">
          <div class="d-flex justify-content-end">
            <a
              role="button"
              class="btn btn-primary btn-sm"
              title="Editar registro"
              :href="formUrl + '?id=' + r.data.id"
              ><i class="fas fa-wrench" aria-hidden="true"
            /></a>
            <a
              role="button"
              class="btn btn-danger btn-sm ml-1"
              title="Deletar registro"
              @click="$refs.dt.deletar(r.data.id)"
              ><i class="fas fa-trash" aria-hidden="true"
            /></a>
          </div>
          <div class="d-flex justify-content-end mt-1">
            <span
              v-if="r.data.updated"
              class="badge badge-info"
              title="Última alteração do registro"
            >
              {{ new Date(r.data.updated).toLocaleString() }}
            </span>
          </div>
        </template>
      </Column>
    </template>
  </CrosierListS>
</template>

<script>
import CrosierListS from '@/components/crosier/CrosierListS.vue';
import CrosierInputText from '@/components/crosier/fields/CrosierInputText.vue';
import CrosierInputEmail from '@/components/crosier/fields/CrosierInputEmail.vue';
import CrosierDropdownBoolean from '@/components/crosier/fields/CrosierDropdownBoolean.vue';
import Column from 'primevue/column';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import { mapStores } from 'pinia';
import { useUserStore } from '@/stores/Security/user.store.js';

export default {
  name: 'UsuarioList',

  components: {
    CrosierListS,
    CrosierInputText,
    CrosierInputEmail,
    CrosierDropdownBoolean,
    Column,
    Toast,
    ConfirmDialog,
  },

  data() {
    return {
      formUrl: '/sec/usuario/form',
      filters: {},
    };
  },

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {},
};
</script>
