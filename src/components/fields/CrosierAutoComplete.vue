<template>
  <div :class="'col-md-' + col">
    <div class="form-group">
      <label v-if="showLabel" :class="labelTransparente ? 'transparente' : ''" :for="id">{{
        labelTransparente ? "..." : label
      }}</label>
      <AutoComplete
        :id="id"
        class="form-control"
        input-class="form-control"
        :model-value="modelValue"
        :suggestions="values"
        :field="field"
        :disabled="disabled"
        :append-to="appendTo"
        :force-selection="forceSelection"
        @update:modelValue="$emit('update:modelValue', $event)"
        @complete="$emit('complete', $event)"
        @item-select="$emit('item-select', $event)"
        @clear="$emit('clear')"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      >
        <template #item="item">
          <slot name="item" :item="item.item"></slot>
        </template>
      </AutoComplete>
      <small v-if="helpText" :id="id + '_help'" class="form-text text-muted">{{ helpText }}</small>
      <div v-show="error" class="invalid-feedbackk blink">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import AutoComplete from "primevue/autocomplete";

export default {
  name: "CrosierAutoComplete",

  components: {
    AutoComplete,
  },

  props: {
    modelValue: {
      default: null,
      type: [String, Object],
    },
    values: {
      default: null,
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
    field: {
      type: String,
      required: true,
    },
    forceSelection: {
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
  },

  emits: ["update:modelValue", "complete", "item-select", "clear", "focus", "blur"],
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
