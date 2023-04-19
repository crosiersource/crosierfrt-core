<template>
  <div :class="'col-md-' + col">
    <div class="form-group">
      <label v-if="showLabel" :class="labelTransparente ? 'transparente' : ''" :for="id + '_mes'">{{
        labelTransparente ? "..." : label
      }}</label>
      <div class="input-group">
        <Dropdown
          :id="id + '_mes'"
          v-model="mes"
          style="max-width: 220px"
          :class="'form-control ' + (error ? 'is-invalid' : '')"
          :append-to="appendTo"
          :options="meses"
          option-label="label"
          option-value="value"
          :placeholder="showClear ? 'Selecione' : null"
          :show-clear="true"
          :disabled="disabled"
          :filter="true"
          @update:modelValue="emit"
          @focus="$emit('focus')"
          @blur="$emit('blur')"
        />
        <div class="input-group-append">
          <InputNumber
            :id="id + '_ano'"
            v-model="ano"
            style="max-width: 90px"
            :class="'ml-1 form-control ' + (error ? 'is-invalid' : '')"
            input-class="text-center"
            :use-grouping="false"
            :disabled="disabled"
            :min="min"
            :max="max"
            @update:modelValue="emit"
            @focus="$emit('focus')"
            @blur="$emit('blur')"
          />
          <button
            :id="id + '_btns'"
            type="button"
            class="btn btn-sm btn-outline-info"
            :disabled="!ano || !mes"
            @click="trocaMes(false)"
          >
            <i class="fas fa-angle-left"></i>
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-info"
            :disabled="!ano || !mes"
            @click="trocaMes(true)"
          >
            <i class="fas fa-angle-right"></i>
          </button>
        </div>
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
import InputNumber from "primevue/inputnumber";
import moment from "moment";

export default {
  name: "CrosierMesAno",

  components: {
    Dropdown,
    InputNumber,
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
    meses: {
      type: Array,
      default: () => [
        { label: "Janeiro", value: "01" },
        { label: "Fevereiro", value: "02" },
        { label: "Março", value: "03" },
        { label: "Abril", value: "04" },
        { label: "Maio", value: "05" },
        { label: "Junho", value: "06" },
        { label: "Julho", value: "07" },
        { label: "Agosto", value: "08" },
        { label: "Setembro", value: "09" },
        { label: "Outubro", value: "10" },
        { label: "Novembro", value: "11" },
        { label: "Dezembro", value: "12" },
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
    mesCorrenteInicial: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:modelValue", "change", "focus", "blur"],

  data() {
    return {
      mes: null,
      ano: null,
    };
  },

  mounted() {
    if (this.modelValue) {
      this.mes = moment(this.modelValue).format("MM");
      this.ano = moment(this.modelValue).format("YYYY");
      this.emit();
    } else if (this.mesCorrenteInicial) {
      this.mes = moment().format("MM");
      this.ano = moment().format("YYYY");
      this.emit();
    }
  },

  methods: {
    moment(date) {
      return moment(date);
    },

    trocaMes(proximo) {
      const primeiroDia = `${this.ano.toString().padStart(4, "0")}-${this.mes}-01`;
      const mesTrocado = proximo
        ? moment(primeiroDia).add(1, "M")
        : moment(primeiroDia).subtract(1, "M");
      this.mes = mesTrocado.format("MM");
      this.ano = mesTrocado.format("YYYY");
      this.emit();
    },

    emit() {
      this.$nextTick(() => {
        if (this.mes && this.ano) {
          const $event = {
            value: null,
          };
          $event.value = `${this.ano.toString().padStart(4, "0")}-${this.mes}-01`;
          this.$emit("update:modelValue", $event.value);
        }
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
