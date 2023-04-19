<template>
  <div :class="'col-md-' + col">
    <div class="form-group">
      <label v-if="showLabel" :class="labelTransparente ? 'transparente' : ''" :for="id">{{
        labelTransparente ? "..." : label
      }}</label>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">R$ </span>
        </div>
        <InputNumber
          :id="id"
          ref="inputNumber"
          :class="'form-control ' + (error ? 'is-invalid' : '')"
          input-class="text-right"
          mode="decimal"
          :min-fraction-digits="2"
          :max-fraction-digits="2"
          :model-value="modelValue"
          placeholder="0,00"
          :disabled="disabled"
          @update:modelValue="onInput"
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
import InputNumber from "primevue/inputnumber";

export default {
  name: "CrosierCurrency",

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
      this.$emit("update:modelValue", $event);
      this.$emit("input", $event);
    },

    onFocus() {
      this.$nextTick(() => {
        const el = document.getElementById(this.id);
        el.selectionStart = 10000;
        el.selectionEnd = 10000;
      });
      this.$emit("focus");
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
