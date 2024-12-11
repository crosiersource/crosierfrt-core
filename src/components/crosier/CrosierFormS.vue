<template>
  <ModalEntityChanges
    v-if="store?.modalEntityChanges_key"
    :storeFieldsName="storeFieldsName"
    :entityClass="entityClass"
  />

  <div v-if="withoutCard">
    <form @submit.prevent="$emit('submitForm')">
      <fieldset :disabled="loadingStore.loading">
        <slot />
        <div v-if="!semBotaoSalvar" class="row mt-3">
          <div class="col text-right">
            <button
              v-if="!disabledSubmit"
              class="btn btn-sm btn-primary"
              style="width: 12rem"
              type="submit"
            >
              <i class="fas fa-save" /> Salvar
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
  <div v-else>
    <Card>
      <template #content>
        <Toolbar>
          <template #start>
            <div class="flex flex-col">
              <div class="text-2xl font-semibold m-0">{{ titulo }}</div>
              <div v-if="subtitulo" class="text-xl font-normal m-0">{{ subtitulo }}</div>
            </div>
          </template>
          <template #end>
            <Button
              v-if="exibirBotaoNovo"
              class="btn btn-info mr-1"
              icon="fas fa-file"
              title="Novo"
              @click="novo"
            />
            <Button
              v-if="listUrl"
              class="btn btn-outline-secondary mr-1"
              icon="fas fa-list"
              title="Ir para a listagem"
              as="router-link"
              :to="listUrl"
            />
          </template>
        </Toolbar>
      </template>
    </Card>
  </div>
</template>

<script>
import ModalEntityChanges from './ModalEntityChanges.vue';
import { useLoadingStore } from '@/stores/loading.store.js';
import { mapStores } from 'pinia';

export default {
  name: 'CrosierFormS',

  components: {
    ModalEntityChanges,
  },

  props: {
    store: {
      type: Object,
      required: true,
    },
    titulo: {
      type: String,
      default: '',
    },
    subtitulo: {
      type: String,
      default: '',
    },
    listUrl: {
      type: String,
      required: false,
      default: 'list',
    },
    formUrl: {
      type: String,
      required: false,
      default: '',
    },
    withoutCard: {
      type: Boolean,
      default: false,
    },
    semBotaoSalvar: {
      type: Boolean,
      default: false,
    },
    exibirBotaoNovo: {
      type: Boolean,
      default: true,
    },
    disabledSubmit: {
      type: Boolean,
      default: false,
    },
    parentLoad: {
      type: Boolean,
      default: false,
    },
    storeFieldsName: {
      type: String,
      required: false,
      default: 'fields',
    },
    entityClass: {
      type: String,
      required: true,
    },
    entityChanges: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['submitForm', 'onClickNovo'],

  data() {
    return {
      loadingStore: useLoadingStore(),
    };
  },

  computed: {
    ...mapStores(useLoadingStore),

    formUrlParsedFromUrl() {
      // remove the "id" param from URL and return, but only if formUrl is empty
      if (this.formUrl) {
        return this.formUrl;
      }
      const url = new URL(window.location.href); // Obtem a URL completa do navegador
      url.searchParams.delete('id'); // Remove o parâmetro 'id'
      return url.pathname + url.search; // Retorna apenas o caminho e os parâmetros restantes
    },
  },

  methods: {
    novo() {
      window.history.pushState({}, '', this.formUrlParsedFromUrl);
      this.$emit('onClickNovo');
    },
  },
};
</script>
