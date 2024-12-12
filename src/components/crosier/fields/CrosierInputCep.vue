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
        <InputMask
          :id="id"
          fluid
          mask="99999-999"
          :class="'form-control ' + (error ? 'is-invalid' : '') + inputClass"
          type="text"
          :modelValue="modelValue"
          :disabled="disabled"
          @update:model-value="onInput($event)"
          @focus="$emit('focus')"
          @blur="$emit('blur')"
        />
        <div v-if="comConsulta" class="input-group-append">
          <button
            type="button"
            class="btn btn-outline-primary btn-sm btn-block"
            @click="consultarCep"
          >
            <i class="fas fa-search" />
          </button>
        </div>
      </div>

      <small v-if="helpText" :id="id + '_help'" class="form-text text-muted">{{ helpText }}</small>
      <div v-show="error" class="invalid-feedbackk blink">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import InputMask from 'primevue/inputmask';
import { mapMutations } from 'vuex';
import axios from 'axios';

export default {
  name: 'CrosierInputCep',

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
      default: 'cep',
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
      default: 'CEP',
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
    comConsulta: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['update:modelValue', 'input', 'focus', 'blur', 'consultaCep'],

  methods: {
    ...mapMutations(['setLoading']),

    onInput($event) {
      this.$nextTick(async () => {
        this.$emit('update:modelValue', $event);
        this.$emit('input', $event);
      });
    },

    async consultarCep() {
      this.setLoading(true);
      try {
        const rs = await axios.get(`/base/municipio/findEnderecoByCEP?cep=${this.modelValue}`);
        if (rs?.status === 200) {
          this.$emit('consultaCep', rs.data);
        }
      } catch (e) {
        console.error('Erro ao consultar o CEP');
        console.error(e);
      }
      this.setLoading(false);
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
