<template>
  <VCard flat>
    <VCardTitle class="d-flex align-center pe-2">
      <VIcon :icon="icon" />
      &nbsp; {{ titulo }}
      <VSpacer />

      <VBtn icon="fas fa-file" variant="plain" title="Novo registro" @click="novoRegistro" />

      <VBtn
        v-if="listPath"
        icon="fas fa-list"
        variant="plain"
        title="Listar registros"
        @click="$router.push({ path: listPath })" />
    </VCardTitle>

    <VDivider />

    <VForm fast-fail @submit.prevent="submitForm">
      <slot name="fields" />

      <VRow no-gutters>
        <VCol class="d-flex justify-end align-center">
          <VBtn prepend-icon="fas fa-save" type="submit" color="green">Salvar</VBtn>
        </VCol>

        <VBtn prepend-icon="far fa-times-circle" class="mx-2" type="button" @click="limpar">
          Limpar
        </VBtn>
      </VRow>
    </VForm>
  </VCard>
</template>
<script>
export default {
  name: 'CrosierForm',

  inject: ['snackbarStore'],

  props: {
    store: {
      type: Object,
      required: true
    },
    titulo: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    listPath: {
      type: String,
      required: false
    },
    id: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      valid: true
    };
  },

  mounted() {
    console.log('snackbarStore');
    console.log(this.snackbarStore);
    console.log('Tem Id?');
    if (this.id) {
      console.log('Tem: ' + this.id);
      this.carregarRegistro();
    } else {
      console.log('Não tem');
    }
  },

  methods: {
    novoRegistro() {
      this.$router.push({ path: this.$route.path.replace(/\/\d+$/, '') });
      this.store.fields = {};
    },

    carregarRegistro() {
      this.store.load(this.id);
    },

    async submitForm() {
      try {
        await this.store.save();
        this.snackbarStore.success('Registro salvo com sucesso!');
      } catch (e) {
        this.snackbarStore.error('Erro ao salvar registro!', e.message);
      }
    },

    limpar() {
      this.store.fields = {};
    }
  }
};
</script>
