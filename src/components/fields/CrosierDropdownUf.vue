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
        :options="ufs"
        option-label="nome"
        option-value="sigla"
        :placeholder="showClear ? 'Selecione' : null"
        :show-clear="showClear"
        :disabled="disabled"
        :data-key="dataKey"
        :filter="true"
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
import ufs from "../../ufs";
// import ufs from "crosier-vue/src/ufs";

export default {
  name: "CrosierDropdownUf",

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
      required: false,
      default: "uf",
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
      default: "UF",
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
    showLabel: {
      type: Boolean,
      default: true,
    },
    labelTransparente: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:modelValue", "change", "focus", "blur"],

  data() {
    return {
      ufs,
    };
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
