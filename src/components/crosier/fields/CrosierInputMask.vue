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
          :class="'form-control ' + (error ? 'is-invalid ' : ' ') + inputClass"
          type="text"
          :modelValue="modelValue"
          :disabled="disabled"
          :mask="mask"
          :slotChar="slotChar"
          :autoClear="autoClear"
          :unmask="unmask"
          @update:model-value="onInput"
          @focus="$emit('focus')"
          @blur="$emit('blur')"
        />
        <div v-if="append" class="input-group-append">
          <span class="input-group-text">{{ append }}</span>
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

export default {
  name: 'CrosierInputMask',

  components: {
    InputMask,
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
    mask: {
      type: String,
    },
    slotChar: {
      type: String,
      default: '_',
    },
    autoClear: {
      type: Boolean,
      default: true,
    },
    unmask: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue', 'input', 'focus', 'blur'],

  methods: {
    onInput($event) {
      this.$emit('update:modelValue', $event);
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
