<template>
  <div :class="'col-span-12 md:col-span-' + col">
    <div class="form-group">
      <label v-if="showLabel" :class="labelTransparente ? 'transparente' : ''" :for="id">{{
        labelTransparente ? '...' : label
      }}</label>
      <MultiSelect
        :id="id"
        fluid
        :class="'form-control ' + (error ? 'is-invalid' : '')"
        :modelValue="modelValue"
        :options="options"
        :optionLabel="optionLabel"
        :optionValue="optionValue"
        :placeholder="showClear ? 'Selecione' : null"
        :showClear="showClear"
        :disabled="disabled"
        :dataKey="dataKey"
        :filter="true"
        display="chip"
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
import MultiSelect from 'primevue/multiselect';
import { mapMutations } from 'vuex';
import api from '../../../services/api.js';

export default {
  name: 'CrosierMultiSelectEntity',

  components: {
    MultiSelect,
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
      default: '12',
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
      default: '@id',
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
      default: '@id',
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

  emits: ['update:modelValue', 'change', 'focus', 'blur'],

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
    ...mapMutations(['setLoading']),

    async load() {
      try {
        const response = await api.get({
          apiResource: this.entityUri,
          allRows: true,
          filters: this.filters,
          order: this.orderBy,
          properties: this.properties,
        });

        if (response.data['hydra:totalItems'] > 0) {
          this.options = response.data['hydra:member'];
        }
      } catch (err) {
        console.error(err);
      }
    },

    onChange($event) {
      this.$emit('change', $event);
      this.$emit('update:modelValue', $event.value);
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
