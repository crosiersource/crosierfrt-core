<template>
  <div :class="'col-md-' + col">
    <div class="form-group">
      <label v-if="showLabel" :class="labelTransparente ? 'transparente' : ''" :for="id">{{
        labelTransparente ? "..." : label
      }}</label>
      <div class="input-group">
        <div v-if="prepend" class="input-group-prepend">
          <span class="input-group-text">{{ prepend }}</span>
        </div>
        <InputNumber
          :id="id"
          :class="'form-control ' + (error ? 'is-invalid' : '')"
          input-class="text-right"
          mode="decimal"
          :min-fraction-digits="decimais"
          :max-fraction-digits="decimais"
          :model-value="modelValue"
          :disabled="disabled"
          @input="onInput"
          @focus="$emit('focus')"
          @blur="$emit('blur')"
        />
        <div v-if="append" class="input-group-append">
          <span class="input-group-text">{{ append }}</span>
        </div>
      </div>
      <div v-show="error" class="invalid-feedbackk blink">
        {{ error }}
      </div>
      <small v-if="helpText" :id="id + '_help'" class="form-text text-muted">{{ helpText }}</small>
    </div>
  </div>
</template>

<script>
import InputNumber from "primevue/inputnumber";

export default {
  name: "CrosierInputDecimal",

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
    decimais: {
      type: Number,
      default: 2,
    },
    error: {
      type: String,
      default: null,
    },
    col: {
      type: String,
      default: "12",
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
  },

  emits: ["update:modelValue", "input", "focus", "blur"],

  methods: {
    onInput($event) {
      this.$emit("update:modelValue", $event.value);
      this.$emit("input", $event);
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
