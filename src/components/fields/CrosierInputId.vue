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
        <InputText
          :id="id"
          :class="'text-center form-control ' + (error ? 'is-invalid' : '')"
          input-class="text-center"
          :model-value="idParsed"
          :disabled="disabled"
          @input="onInput"
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
import InputText from "primevue/inputtext";

export default {
  name: "CrosierInputId",

  components: {
    InputText,
  },

  props: {
    modelValue: {
      type: Number,
    },
    id: {
      type: String,
      default: "id",
    },
    error: {
      type: String,
      default: null,
    },
    col: {
      type: String,
      default: "2",
    },
    label: {
      type: String,
      default: "Id",
    },
    disabled: {
      type: Boolean,
      default: true,
    },
    helpText: {
      type: String,
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
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

  computed: {
    idParsed() {
      return String(`000000000${this.modelValue ?? 0}`).slice(-9);
    },
  },

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
