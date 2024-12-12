<template>
  <div :class="'col-span-12 md:col-span-' + col">
    <div class="form-group">
      <div>
        <label class="transparente">.</label>
      </div>
      <div v-if="placeholder" />
      <div v-else>
        <a
          v-if="tipo === 'link'"
          role="button"
          :class="'btn btn-' + cor + ' btn-sm'"
          :title="title"
          :href="href"
          :target="target"
        >
          <i :class="icon" aria-hidden="true" /> {{ label }}
        </a>

        <Button
          v-else
          fluid
          type="button"
          :class="'btn btn-' + cor + ' btn-sm'"
          role="button"
          @click="$emit('click')"
        >
          <i :class="icon" aria-hidden="true" /> {{ label }}
        </Button>
      </div>
      <small v-if="helpText" class="form-text text-muted">{{ helpText }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CrosierButton',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    placeholder: {
      type: Boolean,
      default: false,
    },
    tipo: {
      type: String,
      default: 'button',
    },
    icon: {
      type: String,
      default: 'fas fa-link',
    },
    col: {
      type: String,
      default: '1',
    },
    cor: {
      type: String,
      default: 'primary',
    },
    label: {
      type: String,
    },
    title: {
      type: String,
    },
    helpText: {
      type: String,
    },
    href: {
      type: String,
    },
    target: {
      type: String,
      default: '_self',
    },
  },

  emits: ['click'],

  methods: {
    onChange() {
      this.$emit('update:modelValue', this.modelValue !== true);
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
