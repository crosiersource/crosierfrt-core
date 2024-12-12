<template>
  <div :class="'col-span-12 md:col-span-' + (col - 1)">
    <div class="form-group">
      <label v-if="showLabel" :class="labelTransparente ? 'transparente' : ''" :for="id">{{
        labelTransparente ? '...' : label
      }}</label>
      <br />
      <ColorPicker
        id="cor"
        :modelValue="modelValue"
        :disabled="disabled"
        @update:model-value="onChange($event)"
      />
    </div>
  </div>
  <div class="col-span-12 md:col-span-1">
    <div class="form-group">
      <label v-if="showLabel" for="corInput">&nbsp;</label>
      <br />
      <InputMask
        :id="id + 'Input'"
        mask="#******"
        class="form-control"
        type="text"
        :modelValue="modelValue"
        :disabled="disabled"
        @change="onInput"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      />
    </div>
    <small v-if="helpText" :id="id + '_help'" class="form-text text-muted">
      {{ helpText }}
    </small>
    <div v-show="error" class="invalid-feedbackk blink">
      {{ error }}
    </div>
  </div>
</template>

<script>
import ColorPicker from 'primevue/colorpicker';
import InputMask from 'primevue/inputmask';

export default {
  name: 'CrosierColorPicker',

  components: {
    InputMask,
    ColorPicker,
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
    showLabel: {
      type: Boolean,
      default: true,
    },
    labelTransparente: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue', 'input', 'focus', 'blur'],

  methods: {
    onInput($event) {
      this.$emit('update:modelValue', $event.target.value);
      this.$emit('input', $event);
    },
    onChange($event) {
      this.$emit('update:modelValue', $event);
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
