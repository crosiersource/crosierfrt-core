<template>
  <div :class="'col-md-' + col">
    <div class="form-group">
      <label v-if="showLabel" :class="labelTransparente ? 'transparente' : ''" :for="id">{{
        labelTransparente ? "..." : label
      }}</label>
      <Dropdown
        v-if="waitTo"
        :id="id"
        :class="'form-control ' + (error ? 'is-invalid' : '')"
        :model-value="modelValue"
        :options="options"
        :option-label="optionLabel"
        :option-value="optionValue"
        :placeholder="showClear ? 'Selecione' : null"
        :show-clear="showClear"
        :disabled="disabled"
        :data-key="dataKey"
        :select-first="selectFirst"
        :filter="true"
        @change="onChange"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      />
      <Skeleton v-if="!waitTo" width="100%" height="2rem" />
      <small v-if="helpText" :id="id + '_help'" class="form-text text-muted">{{ helpText }}</small>
      <div v-show="error" class="invalid-feedbackk blink">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import { mapMutations } from "vuex";
import Skeleton from "primevue/skeleton";
import api from "../../services/api";
// import { api } from "crosier-vue";

export default {
  name: "CrosierDropdownEntity",

  components: {
    Dropdown,
    Skeleton,
  },

  props: {
    modelValue: {
      default: null,
      type: [String, Object],
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
    optionLabel: {
      type: String,
      required: true,
    },
    optionValue: {
      type: String,
      default: "@id",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showClear: {
      type: Boolean,
      default: true,
    },
    selectFirst: {
      type: Boolean,
      default: false,
    },
    helpText: {
      type: String,
    },
    entityUri: {
      type: String,
      required: true,
    },
    filters: {
      type: Object,
    },
    properties: {
      type: Array,
    },
    orderBy: {
      type: Object,
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
    waitTo: {
      default: true,
    },
    convertIdsToString: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:modelValue", "change", "focus", "blur"],

  data() {
    return {
      options: null,
    };
  },

  async mounted() {
    this.setLoading(true);

    await this.load();

    this.setLoading(false);
  },

  methods: {
    ...mapMutations(["setLoading"]),

    async load() {
      try {
        const response = await api.get({
          apiResource: this.entityUri,
          allRows: true,
          filters: this.filters,
          order: this.orderBy,
          properties: this.properties,
        });

        if (response.data["hydra:totalItems"] > 0) {
          this.options = response.data["hydra:member"];

          if (this.convertIdsToString) {
            Object.keys(this.options).forEach((k) => {
              this.options[k].id = this.options[k].id.toString();
            });
          }

          if (this.selectFirst && this.options && this.options.length >= 1) {
            const value = this.optionValue ? this.options[0][this.optionValue] : this.options[0];
            const $event = {
              value,
            };
            this.onChange($event);
          }
        }
      } catch (err) {
        console.error(err);
      }
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
