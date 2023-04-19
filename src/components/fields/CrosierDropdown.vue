<template>
  <div :class="'col-md-' + col">
    <div class="form-group">
      <label v-if="showLabel" :class="labelTransparente ? 'transparente' : ''" :for="id">{{
        labelTransparente ? "..." : label
      }}</label>
      <Dropdown
        :id="id"
        :class="'form-control ' + (error ? 'is-invalid' : '')"
        :append-to="appendTo"
        :model-value="modelValue"
        empty-message="Nenhum resultado encontrado"
        :options="options"
        :option-label="optionLabel"
        :option-value="optionValue"
        :placeholder="showClear ? 'Selecione' : null"
        :show-clear="showClear"
        :disabled="disabled"
        :data-key="dataKey"
        :filter="true"
        :editable="editable"
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
import Dropdown from "primevue/dropdown";

export default {
  name: "CrosierDropdown",

  components: {
    Dropdown,
  },

  props: {
    modelValue: {
      default: null,
    },
    id: {
      type: String,
      required: true,
    },
    col: {
      type: String,
      default: "12",
    },
    error: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      required: false,
    },
    optionLabel: {
      type: String,
      default: "label",
    },
    optionValue: {
      type: String,
      default: "value",
    },
    options: {
      type: Array,
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
    appendTo: {
      type: String,
      default: "body",
    },
    dataKey: {
      type: String,
      default: "@id",
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    labelTransparente: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:modelValue", "change", "focus", "blur"],

  created() {
    if (!this.options || this.options.length < 1) {
      console.debug(`options n/d para ${this.id}`);
    }
  },

  methods: {
    onChange($event) {
      this.$emit("change", $event);
      this.$emit("update:modelValue", $event.value);
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
