<template>
  <CrosierForm
    :store="groupStore"
    titulo="Grupo de Usuários"
    icon="fas fa-user"
    form-path="/sec/grupo/form"
    list-path="/sec/grupo/list"
  >
    <template #fields>
      <VContainer>
        <VRow>
          <VCol
            cols="12"
            md="4"
          >
            <VTextField
              id="groupname"
              v-model="groupStore.fields.groupname"
              label="Nome do Grupo"
              outlined
              dense
              clearable
            />
          </VCol>
        </VRow>
      </VContainer>
    </template>
  </CrosierForm>
</template>
<script>
import CrosierForm from "@/components/Crosier/CrosierForm";
import { mapStores } from "pinia";
import { useGroupStore } from "@/stores/Security/group.store";
export default {
  name: "GrupoForm",

  components: {
    CrosierForm,
  },

  computed: {
    ...mapStores(useGroupStore),
  },
};
</script>
