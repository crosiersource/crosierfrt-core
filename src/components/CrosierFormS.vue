<template>
  <div v-if="withoutCard">
    <form @submit.prevent="$emit('submitForm')">
      <fieldset :disabled="loading">
        <slot></slot>
        <div v-if="!semBotaoSalvar" class="row mt-3">
          <div class="col text-right">
            <button
              v-if="!disabledSubmit"
              class="btn btn-sm btn-primary"
              style="width: 12rem"
              type="submit"
            >
              <i class="fas fa-save"></i> Salvar
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
  <div v-else>
    <div class="container">
      <div class="card" style="margin-bottom: 50px">
        <div class="card-header">
          <div class="d-flex flex-wrap align-items-center">
            <div class="mr-1">
              <h3>{{ titulo }}</h3>
              <h6 v-if="subtitulo">{{ subtitulo }}</h6>
            </div>
            <div class="d-sm-flex flex-nowrap ml-auto"></div>
            <slot name="divCima"></slot>
            <div>
              <router-link
                v-show="formUrl"
                role="button"
                class="btn btn-primary mr-1"
                title="Novo registro"
                to="form"
              >
                <i class="fas fa-file" aria-hidden="true"></i>
              </router-link>

              <router-link
                v-show="listUrl"
                role="button"
                class="btn btn-outline-secondary mr-1"
                title="Listar"
                to="list"
              >
                <i class="fas fa-list"></i>
              </router-link>

              <slot name="btns"></slot>
            </div>
          </div>
        </div>
        <div class="card-body">
          <form @submit.prevent="$emit('submitForm')">
            <fieldset :disabled="loading">
              <slot></slot>
              <div v-if="!semBotaoSalvar" class="row mt-3">
                <div class="col text-right">
                  <button
                    v-if="!disabledSubmit"
                    class="btn btn-sm btn-primary"
                    style="width: 12rem"
                    type="submit"
                    icon="fas fa-save"
                  >
                    <i class="fas fa-save"></i> Salvar
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CrosierFormS",

  props: {
    titulo: {
      type: String,
    },
    subtitulo: {
      type: String,
    },
    listUrl: {
      type: String,
      required: false,
      default: "list",
    },
    formUrl: {
      type: String,
      required: false,
      default: "form",
    },
    withoutCard: {
      type: Boolean,
      default: false,
    },
    semBotaoSalvar: {
      type: Boolean,
      default: false,
    },
    disabledSubmit: {
      type: Boolean,
      default: false,
    },
    parentLoad: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["submitForm"],

  computed: {
    ...mapGetters({
      loading: "layout/isLoading",
    }),
  },
};
</script>
