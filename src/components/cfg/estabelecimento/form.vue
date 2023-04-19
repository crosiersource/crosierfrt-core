<template>
  <Layout>
    <template #content>
      <button @click="teste">Teste</button>

      <CrosierFormS titulo="Estabelecimento" @submitForm="submitForm">
        <div class="row">
          <CrosierInputId v-model="fields.id" />

          <CrosierInputInt
            id="codigo"
            v-model="fields.codigo"
            label="Código"
            col="2"
            :error="formErrors.codigo"
          />

          <CrosierInputText
            id="nome"
            v-model="fields.descricao"
            label="Descrição"
            col="5"
            :error="formErrors.descricao"
          />

          <CrosierDropdownBoolean
            id="concreto"
            v-model="fields.concreto"
            label="Concreto"
            col="3"
            :error="formErrors.concreto"
          />
        </div>
      </CrosierFormS>
    </template>
  </Layout>
</template>

<script>
import * as yup from "yup";
import { CrosierDropdownBoolean, CrosierInputText } from "crosier-vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import CrosierFormS from "@/components/CrosierFormS.vue";
import Layout from "@/layout/Layout.vue";
import CrosierInputId from "@/components/fields/CrosierInputId.vue";
import CrosierInputInt from "@/components/fields/CrosierInputInt.vue";
import { submitForm } from "@/services/SubmitForm.js";

export default {
  name: "EstabelecimentoForm",

  components: {
    CrosierFormS,
    CrosierDropdownBoolean,
    CrosierInputText,
    CrosierInputInt,
    CrosierInputId,
    Layout,
  },

  data() {
    return {
      schemaValidator: {},
    };
  },

  computed: {
    ...mapGetters({
      fields: "cfg_estabelecimento/getFields",
      formErrors: "cfg_estabelecimento/getFieldsErrors",
    }),
  },

  async mounted() {
    this.setLoading(true);

    await this.loadData();

    this.schemaValidator = yup.object().shape({
      codigo: yup.number().required().typeError(),
      descricao: yup.string().required().typeError(),
      concreto: yup.boolean().required().typeError(),
    });

    this.setLoading(false);
  },

  methods: {
    ...mapMutations({
      setLoading: "layout/setLoading",
      setFields: "cfg_estabelecimento/setFields",
      setFieldsErrors: "cfg_estabelecimento/setFieldsErrors",
    }),

    ...mapActions({ loadData: "cfg_estabelecimento/loadData" }),

    teste() {
      this.$toast.add({
        severity: "success",
        summary: "Success",
        detail: "Registro salvo com sucesso",
        life: 5000,
      });
    },

    submitForm() {
      submitForm({
        apiResource: `${import.meta.env.VITE_CORE_URL}/api/cfg/estabelecimento`,
        schemaValidator: this.schemaValidator,
        storePrefix: "cfg_estabelecimento",
        $store: this.$store,
        formDataStateName: "fields",
        $toast: this.$toast,
        // fnBeforeSave: (formData) => {
        //
        // },
      });
    },
  },
};
</script>
<script setup></script>
