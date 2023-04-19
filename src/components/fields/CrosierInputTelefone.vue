<template>
  <div :class="'col-md-' + col">
    <div class="form-group">
      <label v-if="showLabel" :class="labelTransparente ? 'transparente' : ''" :for="id">{{
        labelTransparente ? "..." : label
      }}</label>

      <InputMask
        v-if="modelValue && modelValue.length >= 11"
        :class="'form-control ' + (error ? 'is-invalid' : '') + inputClass"
        :model-value="modelValue"
        mask="(99) 99999-999?9"
        :unmask="true"
        :disabled="disabled"
        @update:modelValue="onInput($event)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      />
      <InputMask
        v-if="!modelValue || modelValue.length < 11"
        :class="'form-control ' + (error ? 'is-invalid' : '') + inputClass"
        :model-value="modelValue"
        mask="(99) 9999-9999?9"
        :unmask="true"
        :disabled="disabled"
        @update:modelValue="onInput($event)"
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
import InputMask from "primevue/inputmask";

export default {
  name: "CrosierInputTelefone",

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
    inputClass: {
      type: String,
      default: "",
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
      this.$nextTick(async () => {
        this.$emit("update:modelValue", $event);
        this.$emit("input", $event);
      });
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
