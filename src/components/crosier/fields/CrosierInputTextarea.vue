<template>
  <div :class="'col-span-12 md:col-span-' + col">
    <div class="form-group">
      <label v-if="showLabel" :class="labelTransparente ? 'transparente' : ''" :for="id">{{
        labelTransparente ? '...' : label
      }}</label>
      <Textarea
        :id="id"
        fluid
        :rows="rows"
        :cols="cols"
        :auto-resize="autoResize"
        :class="'form-control ' + (error ? 'is-invalid ' : ' ') + inputClass"
        type="text"
        :modelValue="modelValue"
        :disabled="disabled"
        @input="onInput"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      />
      <small v-if="helpText" :id="id + '_help'" class="form-text text-muted">{{ helpText }}</small>
      <div v-show="error" class="invalid-feedbackk blink">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import Textarea from 'primevue/textarea';

export default {
  name: 'CrosierInputTextarea',

  components: {
    Textarea,
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
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    helpText: {
      type: String,
    },
    rows: {
      type: Number,
      default: 5,
    },
    cols: {
      type: Number,
      default: 40,
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    labelTransparente: {
      type: Boolean,
      default: false,
    },
    inputClass: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue', 'input', 'focus', 'blur'],

  methods: {
    onInput($event) {
      this.$emit('update:modelValue', $event.target.value);
      this.$emit('input', $event);
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
