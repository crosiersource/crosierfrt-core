<template>


  <Layout>
    <template #content>

      <Toast position="bottom-right" class="mt-5" />
      <h1>oiiiiiii</h1>
      <div class="container">
        <div class="form-row">
          <CrosierInputInt id="id" v-model="fields.id" label="Id" col="3" :disabled="true" />

          <CrosierInputText
            id="UUID"
            v-model="fields.UUID"
            input-class="lowercase"
            label="UUID"
            col="3"
            :error="errors.UUID"
          />

          <CrosierInputText
            id="nome"
            v-model="fields.nome"
            label="Nome"
            input-class="lowercase"
            col="6"
            :error="errors.nome"
          />
        </div>

        <div class="form-row">
          <CrosierCurrency id="valorCredito2" v-model="valorCredito2" label="Valor" />
        </div>

        <div class="form-row">
          <CrosierInputTextarea
            id="obs"
            v-model="fields.obs"
            input-class="notuppercase"
            label="Obs"
            :error="errors.obs"
          />
        </div>
      </div>
      
    </template>
  </Layout>
  
  
</template>

<script>
import Layout from "../layout/Layout.vue";
import Toast from "primevue/toast";
import * as yup from "yup";
import {
  CrosierInputInt,
  CrosierInputText,
  CrosierInputTextarea,
  CrosierCurrency,
  submitForm,
  SetFocus,
} from "crosier-vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    Layout,
    Toast,
    CrosierInputText,
    CrosierInputTextarea,
    CrosierInputInt,
    CrosierCurrency,
  },

  data() {
    return {
      schemaValidator: {},
      valorCredito2: null,
    };
  },


  computed: {
    ...mapGetters("teste", {
      fields: "getFields",
      errors: "getFieldsErrors"
    })
  },
  
  async mounted() {
    this.setLoading(true);

    this.schemaValidator = yup.object().shape({
      codigo: yup.number().required().typeError(),
      descricao: yup.string().required().typeError(),
      concreto: yup.boolean().required().typeError(),
    });

    SetFocus("UUID", 60);

    this.setLoading(false);
  },

  methods: {
    ...mapMutations("teste/", ["setLoading", "setFields", "setFieldsErrors"]),

    async submitForm() {
      this.setLoading(true);
      await submitForm({
        apiResource: "/api/cfg/app",
        schemaValidator: this.schemaValidator,
        $store: this.$store,
        formDataStateName: "fields",
        $toast: this.$toast,
        // fnBeforeSave: (formData) => {
        //
        // },
      });
      this.setLoading(false);
    },
  },

};
</script>
