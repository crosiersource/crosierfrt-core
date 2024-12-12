<template>
  <div :class="'col-span-12 md:col-span-' + col">
    <div class="form-group">
      <label v-if="showLabel" :class="labelTransparente ? 'transparente' : ''" :for="id">{{
        labelTransparente ? '...' : label
      }}</label>
      <Dropdown
        v-if="waitTo"
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
        :selectFirst="selectFirst"
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
import Dropdown from 'primevue/dropdown';
import Skeleton from 'primevue/skeleton';
import api from '../../../services/api.js';
import { useLoadingStore } from '@/stores/loading.store';
// import { api } from "crosier-vue";
import { useAuthStore } from '@/stores/auth.store.js';

export default {
  name: 'CrosierDropdownEntity',

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
    waitTo: {
      default: true,
    },
    convertIdsToString: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue', 'change', 'focus', 'blur'],

  data() {
    return {
      options: null,
      loadingStore: useLoadingStore(),
      authStore: useAuthStore(),
    };
  },

  async mounted() {
    this.loadingStore.setLoading(true);
    await this.load();
    this.loadingStore.setLoading(false);
  },

  methods: {
    async load() {
      try {
        const response = await api.get({
          apiResource: import.meta.env.VITE_CROSIER_API + this.entityUri,
          allRows: true,
          filters: this.filters,
          order: this.orderBy,
          properties: this.properties,
          authToken: this.authStore.token,
        });

        if (response.data['hydra:totalItems'] > 0) {
          this.options = response.data['hydra:member'];

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
