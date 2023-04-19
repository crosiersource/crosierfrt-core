<template>
  <div :class="'col-md-' + col">
    <div class="form-group">
      <label v-if="showLabel" :for="id + '_mes'">{{ label }}</label>
      <div class="input-group">
        <Dropdown
          :id="id"
          :class="'form-control ' + (error ? 'is-invalid' : '')"
          :append-to="appendTo"
          :model-value="modelValue"
          :options="anos"
          option-label="label"
          option-value="value"
          :placeholder="showClear ? 'Selecione' : null"
          :show-clear="showClear"
          :disabled="disabled"
          :data-key="dataKey"
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
import Dropdown from "primevue/dropdown";
import moment from "moment";

export default {
  name: "CrosierDropdownMes",

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
      default: "12",
    },
    error: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      required: false,
      default: "Período",
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
    anoInicio: {
      type: Number,
    },
    anoFim: {
      type: Number,
    },
    somenteFuturo: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:modelValue", "change", "focus", "blur"],

  data() {
    return {
      anos: [],
    };
  },

  mounted() {
    const ini = this.anoInicio ?? Number(moment().format("YYYY")) - (this.somenteFuturo ? 0 : 10);
    let fim = this.anoInicio ?? Number(moment().format("YYYY")) + 10;
    if (fim < ini) {
      fim = ini;
    }
    for (let i = ini; i <= fim; i++) {
      this.anos.push({ label: i, value: i });
    }
  },

  methods: {
    moment(date) {
      return moment(date);
    },

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
