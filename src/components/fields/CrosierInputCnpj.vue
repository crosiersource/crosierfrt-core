<template>
  <div :class="'col-md-' + col">
    <div class="form-group">
      <label v-if="showLabel" :class="labelTransparente ? 'transparente' : ''" :for="id">{{
        labelTransparente ? "..." : label
      }}</label>

      <InputMask
        :id="id"
        :class="'form-control ' + (error ? 'is-invalid' : '') + inputClass"
        :model-value="modelValue"
        mask="99.999.999/9999-99"
        :unmask="true"
        :disabled="disabled"
        @update:modelValue="onInput($event)"
        @blur="onBlur($event)"
        @focus="$emit('focus')"
      />

      <small v-if="helpText" :id="id + '_help'" class="form-text text-muted">{{ helpText }}</small>
      <div v-show="error" class="invalid-feedbackk blink">
        {{ error }}
      </div>
      <div v-show="exibeValidacao && cnpjInvalido" class="invalid-feedbackk blink">
        CNPJ inválido!
      </div>
    </div>
  </div>
</template>

<script>
import InputMask from "primevue/inputmask";

export default {
  name: "CrosierInputCnpj",

  components: {
    InputMask,
  },

  props: {
    modelValue: {
      type: String,
    },
    id: {
      type: String,
      required: false,
      default: "cnpj",
    },
    error: {
      type: String,
      default: null,
    },
    col: {
      type: String,
      default: "12",
    },
    label: {
      type: String,
      required: false,
      default: "CNPJ",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    exibeValidacao: {
      type: Boolean,
      default: true,
    },
    helpText: {
      type: String,
    },
    inputClass: {
      type: String,
      default: "",
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    labelTransparente: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:modelValue", "input", "focus", "blur"],

  data() {
    return {
      cnpjInvalido: false,
    };
  },

  mounted() {
    if (this.exibeValidacao && this.modelValue && this.modelValue.length > 0) {
      this.cnpjInvalido = !this.validaCnpj(this.modelValue);
    }
  },

  methods: {
    onInput($event) {
      this.$nextTick(async () => {
        this.$emit("update:modelValue", $event);
        this.$emit("input", $event);
      });
    },

    onBlur() {
      this.$nextTick(async () => {
        if (this.exibeValidacao) {
          this.cnpjInvalido = !this.validaCnpj(this.modelValue);
        }
        this.$emit("blur");
      });
    },

    calcDigitosPosicoes(digitos, posicoes = 10, somaDigitos = 0) {
      digitos = digitos.toString();

      for (let i = 0; i < digitos.length; i++) {
        somaDigitos += digitos[i] * posicoes;
        posicoes--;
        if (posicoes < 2) {
          posicoes = 9;
        }
      }

      somaDigitos %= 11;
      if (somaDigitos < 2) {
        somaDigitos = 0;
      } else {
        somaDigitos = 11 - somaDigitos;
      }
      return digitos + somaDigitos;
    },

    validaCnpj(valor) {
      valor = valor.toString();
      valor = valor.replace(/[^0-9]/g, "");
      const cnpjOriginal = valor;
      const primeirosNumerosCnpj = valor.substr(0, 12);
      const primeiroCalculo = this.calcDigitosPosicoes(primeirosNumerosCnpj, 5);
      const cnpj = this.calcDigitosPosicoes(primeiroCalculo, 6);
      return cnpj === cnpjOriginal;
    },
  },
};
</script>
<style scoped>
.invalid-feedbackk {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #e55353;
}
</style>
