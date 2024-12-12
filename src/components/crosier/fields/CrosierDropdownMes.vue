<template>
  <div :class="'col-span-12 md:col-span-' + col">
    <div class="form-group">
      <label v-if="showLabel" :for="id + '_mes'">{{ label }}</label>
      <div class="input-group">
        <Dropdown
          :id="id"
          fluid
          :class="'form-control ' + (error ? 'is-invalid' : '')"
          :appendTo="appendTo"
          :modelValue="modelValue"
          :options="meses"
          optionLabel="label"
          optionValue="value"
          :placeholder="showClear ? 'Selecione' : null"
          :showClear="showClear"
          :disabled="disabled"
          :dataKey="dataKey"
          :filter="true"
          @change="onChange"
          @focus="$emit('focus')"
          @blur="$emit('blur')"
        />
      </div>
    </div>

    <small v-if="helpText" :id="id + '_help'" class="form-text text-muted">{{ helpText }}</small>
    <div v-show="error" class="invalid-feedbackk blink">
      {{ error }}
    </div>
  </div>
</template>

<script>
import Dropdown from 'primevue/dropdown';

export default {
  name: 'CrosierDropdownMes',

  components: {
    Dropdown,
  },

  props: {
    modelValue: {
      type: [String, Object],
      default: null,
    },
    id: {
      type: String,
      required: true,
    },
    col: {
      type: String,
      default: '12',
    },
    error: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      required: false,
      default: 'Período',
    },
    meses: {
      type: Array,
      default: () => [
        { label: 'Janeiro', value: '01' },
        { label: 'Fevereiro', value: '02' },
        { label: 'Março', value: '03' },
        { label: 'Abril', value: '04' },
        { label: 'Maio', value: '05' },
        { label: 'Junho', value: '06' },
        { label: 'Julho', value: '07' },
        { label: 'Agosto', value: '08' },
        { label: 'Setembro', value: '09' },
        { label: 'Outubro', value: '10' },
        { label: 'Novembro', value: '11' },
        { label: 'Dezembro', value: '12' },
      ],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    helpText: {
      type: String,
    },
    appendTo: {
      type: String,
      default: 'body',
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    labelTransparente: {
      type: Boolean,
      default: false,
    },
    mesCorrenteInicial: {
      type: Boolean,
      default: false,
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
