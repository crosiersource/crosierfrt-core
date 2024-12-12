<template>
  <div :class="'col-span-12 md:col-span-' + col">
    <div class="form-group">
      <label v-if="showLabel" :class="labelTransparente ? 'transparente' : ''" :for="id">{{
        labelTransparente ? '...' : label
      }}</label>
      <div>
        <InputSwitch
          :id="id"
          :class="'form-control ' + (error ? 'is-invalid' : '')"
          :modelValue="modelValue"
          :placeholder="showClear ? 'Selecione' : null"
          :showClear="showClear"
          :disabled="disabled"
          :dataKey="dataKey"
          :filter="true"
          :trueValue="trueValue"
          :falseValue="falseValue"
          @change="onChange"
          @click="onChange"
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
import InputSwitch from 'primevue/inputswitch';

export default {
  name: 'CrosierSwitch',

  components: {
    InputSwitch,
  },

  props: {
    modelValue: {
      type: [String, Object, Boolean],
      default: null,
    },
    id: {
      type: String,
      required: true,
    },
    col: {
      type: String,
      default: '1',
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
    trueValue: {
      default: true,
      required: false,
    },
    falseValue: {
      default: false,
      required: false,
    },
  },

  emits: ['update:modelValue', 'change'],

  computed: {
    checked() {
      return this.modelValue === this.trueValue;
    },
  },

  methods: {
    onChange(event) {
      if (!this.$attrs.disabled) {
        const newValue = this.checked ? this.falseValue : this.trueValue;
        this.$emit('click', event);
        this.$emit('update:modelValue', newValue);
        this.$emit('change', event);
        this.$emit('input', newValue);
      }
      event.preventDefault();
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
