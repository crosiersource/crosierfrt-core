<template>
  <Layout>
    <template #content>
      <h1>Homee</h1>
      <Calendar v-model='date' />
      <button @click='testLoading'>Teste</button>
      <button @click='testConfirmDialog'>???????</button>
      <button @click='testToast'>Toast-me</button>
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/layout/Layout.vue'
import Calendar from 'primevue/calendar'
import { useLayoutStore } from '@/stores/layout'

export default {
  name: 'Home',

  components: {
    Layout,
    Calendar
  },

  setup() {
    const layoutStore = useLayoutStore()
    return { layoutStore }
  },

  data() {
    return {
      date: null
    }
  },


  methods: {
    testLoading() {
      this.layoutStore.setLoading(true)
      setTimeout(() => {
        this.layoutStore.setLoading(false)
      }, 2000)
    },

    testConfirmDialog() {
      this.$confirm.require({
        acceptLabel: "Sim",
        rejectLabel: "Não",
        message: "Confirmar a operação?",
        header: "Atenção!",
        icon: "pi pi-exclamation-triangle",
        accept: async () => {
          this.setLoading(true);
          try {
            const deleteUrl = `${this.apiResource}${id}`;
            const rsDelete = await api.delete(deleteUrl);
            if (!rsDelete) {
              throw new Error("rsDelete n/d");
            }
            if (rsDelete?.status === 204) {
              this.$toast.add({
                group: "mainToast",
                severity: "success",
                summary: "Sucesso",
                detail: "Registro deletado com sucesso",
                life: 5000,
              });
              await this.doFilter();
            } else if (rsDelete?.data && rsDelete.data["hydra:description"]) {
              throw new Error(`status !== 204: ${rsDelete?.data["hydra:description"]}`);
            } else if (rsDelete?.statusText) {
              throw new Error(`status !== 204: ${rsDelete?.statusText}`);
            } else {
              throw new Error("Erro ao deletar (erro n/d, status !== 204)");
            }
          } catch (e) {
            console.error(e);
            this.$toast.add({
              group: "mainToast",
              severity: "error",
              summary: "Erro",
              detail: "Ocorreu um erro ao deletar",
              life: 5000,
            });
          }
          this.setLoading(false);
        },
      });
    },

    testToast() {
      this.$toast.add({
        severity: "success",
        summary: "Sucesso",
        detail: "Registro deletado com sucesso",
        life: 5000,
      });
    }
  }
}
</script>
<script setup>
</script>