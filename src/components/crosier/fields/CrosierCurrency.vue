<template>
  <div :class="'col-span-12 md:col-span-' + col">
    <div class="form-group">
      <label v-if="showLabel" :class="labelTransparente ? 'transparente' : ''" :for="id">{{
        labelTransparente ? '...' : label
      }}</label>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">R$ </span>
        </div>
        <InputNumber
          :id="id"
          ref="inputNumber"
          fluid
          :class="'form-control ' + (error ? 'is-invalid' : '')"
          inputClass="text-right"
          mode="decimal"
          :minFractionDigits="2"
          :maxFractionDigits="2"
          :modelValue="modelValue"
          placeholder="0,00"
          :disabled="disabled"
          @update:model-value="onInput"
          @focus="onFocus()"
          @blur="$emit('blur')"
        />
      </div>
      <small v-if="helpText" :id="id + '_help'" class="form-text text-muted">{{ helpText }}</small>
      <div v-show="error" class="invalid-feedbackk blink">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import InputNumber from 'primevue/inputnumber';

export default {
  name: 'CrosierCurrency',

  components: {
    InputNumber,
  },

  props: {
    modelValue: {
      type: Number,
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
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    helpText: {
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
    forceZeroIfNull: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['update:modelValue', 'input', 'focus', 'blur'],

  methods: {
    onInput($event) {
      if (this.forceZeroIfNull && $event === null) {
        $event = 0;
      }
      this.$emit('update:modelValue', $event);
      this.$emit('input', $event);
    },

    onFocus() {
      this.$nextTick(() => {
        const el = document.getElementById(this.id);
        el.selectionStart = 10000;
        el.selectionEnd = 10000;
      });
      this.$emit('focus');
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
