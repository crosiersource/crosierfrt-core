<template>
  <div :class="'col-span-12 md:col-span-' + col">
    <div class="form-group">
      <label v-if="showLabel" :class="labelTransparente ? 'transparente' : ''" :for="id">{{
        labelTransparente ? '...' : label
      }}</label>
      <MultiSelect
        :id="id"
        fluid
        :class="'form-control ' + (error ? 'is-invalid' : '')"
        :modelValue="modelValue"
        :options="options"
        :optionLabel="optionLabel"
        :optionValue="optionValue"
        :placeholder="showClear ? 'Selecione' : null"
        :showClear="showClear"
        :disabled="disabled"
        :dataKey="dataKey"
        :filter="true"
        display="chip"
        :appendTo="appendTo"
        @change="onChange"
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
import MultiSelect from 'primevue/multiselect';

export default {
  name: 'CrosierMultiSelectEntity',

  components: {
    MultiSelect,
  },

  props: {
    modelValue: {
      default: null,
      type: [String, Object],
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
    optionLabel: {
      type: String,
      default: 'label',
    },
    optionValue: {
      type: String,
      default: 'value',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showClear: {
      type: Boolean,
      default: true,
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
    options: {
      type: Array,
    },
    appendTo: {
      type: String,
      default: 'body',
    },
  },

  emits: ['update:modelValue', 'change', 'focus', 'blur'],

  methods: {
    onChange($event) {
      this.$emit('change', $event);
      this.$emit('update:modelValue', $event.value);
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
