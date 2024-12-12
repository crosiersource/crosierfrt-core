<template>
  <div :class="'col-span-12 md:col-span-' + col">
    <div class="form-group">
      <label v-if="showLabel" :class="labelTransparente ? 'transparente' : ''" :for="id">{{
        labelTransparente ? '...' : label
      }}</label>
      <div class="input-group">
        <div v-if="prepend" class="input-group-prepend">
          <span class="input-group-text">{{ prepend }}</span>
        </div>
        <InputText
          :id="id"
          fluid
          :class="'form-control email ' + (error ? 'is-invalid' : '') + inputClass"
          type="text"
          :modelValue="modelValue"
          :disabled="disabled"
          @input="onInput"
          @focus="$emit('focus')"
          @blur="onBlur($event)"
        />
        <div v-if="append" class="input-group-append">
          <span class="input-group-text">{{ append }}</span>
        </div>
      </div>

      <small v-if="helpText" :id="id + '_help'" class="form-text text-muted">{{ helpText }}</small>
      <div v-show="error" class="invalid-feedbackk blink">
        {{ error }}
      </div>
      <div v-show="exibeValidacao && emailInvalido" class="invalid-feedbackk blink">
        E-mail inválido!
      </div>
    </div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';

export default {
  name: 'CrosierInputText',

  components: {
    InputText,
  },

  props: {
    modelValue: {
      type: String,
    },
    id: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      default: null,
    },
    col: {
      type: String,
      default: '12',
    },
    label: {
      type: String,
      required: false,
      default: 'E-mail',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    helpText: {
      type: String,
    },
    inputClass: {
      type: String,
      default: '',
    },
    prepend: {
      type: String,
    },
    append: {
      type: String,
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    labelTransparente: {
      type: Boolean,
      default: false,
    },
    exibeValidacao: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['update:modelValue', 'input', 'focus', 'blur'],

  data() {
    return {
      emailInvalido: false,
    };
  },

  mounted() {
    if (this.exibeValidacao && this.modelValue) {
      this.emailInvalido = !this.validaEmail(this.modelValue);
    }
  },

  methods: {
    onInput($event) {
      this.$emit('update:modelValue', $event.target.value);
      this.$emit('input', $event);
    },

    onBlur() {
      this.$nextTick(async () => {
        if (this.exibeValidacao) {
          this.emailInvalido = !this.validaEmail(this.modelValue);
        }
        this.$emit('blur');
      });
    },

    validaEmail(email) {
      return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
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
