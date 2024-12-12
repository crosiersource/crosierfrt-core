<template>
  <div :class="'col-span-12 md:col-span-' + col">
    <div class="form-group">
      <label v-if="showLabel" :class="labelTransparente ? 'transparente' : ''" :for="id">{{
        labelTransparente ? '...' : label
      }}</label>
      <div class="input-group">
        <div v-if="prepend" class="input-group-prepend">
          <span class="input-group-text">{{ prepend }}</span>
        </div>
        <InputNumber
          :id="id"
          fluid
          :class="'form-control ' + (error ? 'is-invalid' : '')"
          inputClass="text-right"
          :modelValue="modelValue"
          :disabled="disabled"
          :min="min"
          :max="max"
          @input="onInput"
          @focus="$emit('focus')"
          @blur="$emit('blur')"
        />
        <div v-if="append" class="input-group-append">
          <span class="input-group-text">{{ append }}</span>
        </div>
        <div v-if="appendButtonLinkHref" class="input-group-append">
          <a
            role="button"
            class="btn btn-sm btn-block btn-outline-secondary"
            :target="appendButtonLinkTarget || '_blank'"
            :title="appendButtonTitle || 'Abrir registro'"
            :href="appendButtonLinkHref"
          >
            <i :class="appendButtonIcon" />
          </a>
        </div>
        <div v-if="appendButton" class="input-group-append">
          <button
            type="button"
            class="btn btn-sm btn-block btn-outline-secondary"
            :title="appendButtonTitle"
            @click="$emit('appendButtonClicked')"
          >
            <i :class="appendButtonIcon" />
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
import InputNumber from 'primevue/inputnumber';

export default {
  name: 'CrosierInputInt',

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
      default: '12',
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
    appendButton: {
      type: Boolean,
      default: false,
    },
    appendButtonLinkHref: {
      type: String,
    },
    appendButtonTitle: {
      type: String,
    },
    appendButtonLinkTarget: {
      type: String,
    },
    appendButtonIcon: {
      type: String,
      default: 'fas fa-search',
    },
  },

  emits: ['update:modelValue', 'input', 'focus', 'blur', 'appendButtonClicked'],

  methods: {
    onInput($event) {
      this.$emit('update:modelValue', $event.value);
      this.$emit('input', $event);
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
