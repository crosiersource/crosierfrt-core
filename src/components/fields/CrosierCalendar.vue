<template>
  <div :class="'col-md-' + col">
    <div class="form-group">
      <label v-if="showLabel" :class="labelTransparente ? 'transparente' : ''" :for="id">{{
        labelTransparente ? "..." : label
      }}</label>
      <div class="input-group">
        <Datepicker
          :id="id"
          :key="key"
          ref="refCalendar"
          :class="inputClass"
          :model-value="modelValue"
          :range="range"
          :multi-calendars="range"
          :max-range="maxRange"
          :format="format"
          locale="pt-BR"
          select-text="OK"
          cancel-text="Cancelar"
          now-button-label="Agora"
          close-on-scroll
          auto-apply
          :disabled="disabled"
          :text-input="textInput"
          :enable-time-picker="showTimePicker"
          :enable-seconds="showSeconds"
          week-start="0"
          :month-picker="monthPicker"
          :time-picker="timePicker"
          @update:modelValue="onInput"
          @cleared="clear"
          @focus="$emit('focus')"
          @blur="$emit('blur')"
        />
        <div v-if="comBotoesPeriodo" class="input-group-append">
          <button
            type="button"
            class="ml-1 btn btn-outline-info"
            title="Período anterior"
            :disabled="!modelValue"
            @click="trocaPeriodo(false)"
          >
            <i class="fas fa-angle-left"></i>
          </button>

          <button
            type="button"
            class="ml-1 btn btn-outline-info"
            title="Próximo período"
            :disabled="!modelValue"
            @click="trocaPeriodo(true)"
          >
            <i class="fas fa-angle-right"></i>
          </button>
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
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "CrosierCalendar",

  components: {
    Datepicker,
  },

  props: {
    modelValue: {},
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
    range: {
      type: Boolean,
      default: false,
    },
    comBotoesPeriodo: {
      type: Boolean,
      default: false,
    },
    textInput: {
      type: Boolean,
      default: true,
    },
    showTime: {
      type: Boolean,
      default: false,
    },
    showSeconds: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    helpText: {
      type: String,
    },
    selectionMode: {
      type: String,
      default: "single",
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    labelTransparente: {
      type: Boolean,
      default: false,
    },
    maxRange: {
      type: Number,
    },
    monthPicker: {
      type: Boolean,
      default: false,
    },
    timeOnly: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:modelValue", "date-select", "focus", "blur"],

  data() {
    return {
      inputClass: null,
      format: "dd/MM/yyyy",
      showTimePicker: false,
      timePicker: false,
      key: 0,
    };
  },

  mounted() {
    if (this.timeOnly) {
      this.timePicker = true;
      this.showTimePicker = true;
      this.format = "HH:mm";
      this.inputClass = "crsr-timeonly-nseg";
      if (this.showSeconds) {
        this.format = "HH:mm:ss";
        this.inputClass = "crsr-timeonly";
      }
    } else if (this.monthPicker) {
      this.format = "MM/yyyy";
    } else if (this.range) {
      this.inputClass = "crsr-date-periodo text-center";
    } else if (this.showSeconds) {
      this.format = "dd/MM/yyyy HH:mm:ss";
      this.inputClass = "crsr-datetime";
      this.showTimePicker = true;
    } else if (this.showTime) {
      this.format = "dd/MM/yyyy HH:mm";
      this.inputClass = "crsr-datetime-nseg";
      this.showTimePicker = true;
    } else {
      this.inputClass = "crsr-date";
    }

    this.corrigirMascaras();
    this.key++;
  },

  updated() {
    this.corrigirMascaras();
  },

  methods: {
    ...mapMutations(["setLoading"]),

    moment(date) {
      return moment(date);
    },

    clear() {
      this.$emit("update:modelValue", null);
      this.$emit("date-select");
      this.$emit("clear");
    },

    onInput($event) {
      this.$nextTick(() => {
        const dtStr = $event?.target?.value ?? $event;

        if (this.timeOnly) {
          this.$emit("update:modelValue", dtStr);
          return;
        }

        let dateParser = null;
        let date = null;
        let match = null;
        let dtIni = null;
        let dtFim = null;

        if (dtStr instanceof Date) {
          date = dtStr;
        } else if (this.inputClass === "crsr-date") {
          if (dtStr && dtStr.length === 10) {
            dateParser = /(\d{2})\/(\d{2})\/(\d{4})/;
            match = dtStr.match(dateParser);
            date = new Date(
              match[3], // year
              match[2] - 1, // monthIndex
              match[1] // day
              // match[4],  // hours
              // match[5],  // minutes
              // match[6]  //seconds
            );
          }
        } else if (dtStr && dtStr.length === 16 && this.inputClass === "crsr-datetime-nseg") {
          dateParser = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/;
          match = dtStr.match(dateParser);
          date = new Date(
            match[3], // year
            match[2] - 1, // monthIndex
            match[1], // day
            match[4], // hours
            match[5] // minutes
            // match[6]  //seconds
          );
        } else if (dtStr && dtStr.length === 19 && this.inputClass === "crsr-datetime") {
          dateParser = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/;
          match = dtStr.match(dateParser);
          date = new Date(
            match[3], // year
            match[2] - 1, // monthIndex
            match[1], // day
            match[4], // hours
            match[5], // minutes
            match[6] // seconds
          );
        } else if (dtStr && dtStr.length === 23 && this.selectionMode === "range") {
          dateParser = /(\d{2})\/(\d{2})\/(\d{4}) - (\d{2})\/(\d{2})\/(\d{4})/;
          match = dtStr.match(dateParser);
          dtIni = new Date(
            match[3], // year
            match[2] - 1, // monthIndex
            match[1] // day
          );
          dtFim = new Date(
            match[6], // year
            match[5] - 1, // monthIndex
            match[4] // day
          );
          if (dtIni && dtFim) {
            const dts = [dtIni, dtFim];
            this.$emit("update:modelValue", dts);
            return;
          }
        }

        if (date) {
          this.$emit("update:modelValue", date);
        } else {
          this.$emit("update:modelValue", dtStr);
        }
        this.$emit("date-select");
      });
    },

    async trocaPeriodo(proximo) {
      this.setLoading(true);
      const ini = moment(this.modelValue[0]).format("YYYY-MM-DD");
      const fim = moment(this.modelValue[1]).format("YYYY-MM-DD");

      const rs = await axios.get(
        // eslint-disable-next-line max-len
        `/base/diaUtil/incPeriodo/?ini=${ini}&fim=${fim}&futuro=${proximo}&comercial=false&financeiro=false`
      );

      this.$emit("update:modelValue", [
        new Date(moment(rs.data.dtIni)),
        new Date(moment(rs.data.dtFim)),
      ]);

      this.$emit("date-select");

      this.setLoading(false);
    },

    corrigirMascaras() {
      document.querySelectorAll(".crsr-date > div > div > input").forEach(function format(el) {
        // eslint-disable-next-line no-new,no-undef
        new Cleave(el, {
          date: true,
          delimiter: "/",
          datePattern: ["d", "m", "Y"],
        });
      });

      document.querySelectorAll(".crsr-datetime > div > div > input").forEach(function format(el) {
        el.maxLength = 19; // 01/02/1903 12:34:56
        // eslint-disable-next-line no-new,no-undef
        new Cleave(el, {
          numeralPositiveOnly: true,
          delimiters: ["/", "/", " ", ":"],
          blocks: [2, 2, 4, 2, 2, 2],
        });
      });

      document
        .querySelectorAll(".crsr-datetime-nseg > div > div > input")
        .forEach(function format(el) {
          el.maxLength = 17; // 01/02/1903 12:34
          // eslint-disable-next-line no-new, no-undef
          new Cleave(el, {
            numeralPositiveOnly: true,
            delimiters: ["/", "/", " ", ":"],
            blocks: [2, 2, 4, 2, 2],
          });
        });

      document
        .querySelectorAll(".crsr-date-periodo > div > div > input")
        .forEach(function format(el) {
          el.maxLength = 23; // 01/02/1903 12:34:56
          // eslint-disable-next-line no-new,no-undef
          new Cleave(el, {
            numeralPositiveOnly: true,
            delimiters: ["/", "/", " - ", "/", "/"],
            blocks: [2, 2, 4, 2, 2, 4],
          });
        });

      document
        .querySelectorAll(".crsr-timeonly-nseg > div > div > input")
        .forEach(function format(el) {
          el.maxLength = 5; // 12:34
          // eslint-disable-next-line no-new,no-undef
          new Cleave(el, {
            numeralPositiveOnly: true,
            delimiters: [":"],
            blocks: [2, 2],
          });
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

.dp__pointer.dp__input.dp__input_icon_pad {
  height: 31.1562px;
}
</style>
