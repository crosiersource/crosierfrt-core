<template>
  <CrosierForm
    :store="userStore"
    listUrl="/sec/usuario/list"
    titulo="Usuário"
    entityChanges
    entityClass="CrosierSource:CrosierLibBaseBundle:Entity:Security:User"
  >
    <div class="form-row">
      <CrosierInputInt id="id" v-model="userStore.fields.id" label="Id" col="2" :disabled="true" />

      <CrosierInputText
        id="nome"
        v-model="userStore.fields.username"
        label="Usuário"
        col="4"
        inputClass="lowercase"
        :error="userStore.fieldsErrors.username"
      />

      <CrosierInputText
        id="nome"
        v-model="userStore.fields.nome"
        label="Nome"
        col="6"
        :error="userStore.fieldsErrors.nome"
      />
    </div>

    <div class="form-row">
      <CrosierInputText id="descricao" v-model="userStore.fields.descricao" label="Descrição" />
    </div>

    <div class="form-row">
      <div class="col-span-6">
        <div class="form-group">
          <label for="password">Senha</label>
          <div class="input-group">
            <Password
              id="password"
              v-model="userStore.fields.password"
              fluid
              :class="'form-control ' + (error ? 'is-invalid' : '')"
              weakLabel="Fraco"
              mediumLabel="Médio"
              strongLabel="Forte"
              :toggleMask="true"
            />
          </div>
          <div v-show="userStore.fieldsErrors.password" class="invalid-feedbackk blink">
            {{ userStore.fieldsErrors.password }}
          </div>
        </div>
      </div>

      <div class="col-span-6">
        <div class="form-group">
          <label for="password2">Repita a Senha</label>
          <div class="input-group">
            <Password
              id="password2"
              v-model="userStore.fields.password2"
              fluid
              :class="'form-control ' + (error ? 'is-invalid' : '')"
              weakLabel="Fraco"
              mediumLabel="Médio"
              strongLabel="Forte"
              :toggleMask="true"
            />
          </div>
          <div v-show="userStore.fieldsErrors.password2" class="invalid-feedbackk blink">
            {{ userStore.fieldsErrors.password2 }}
          </div>
        </div>
      </div>
    </div>

    <div class="form-row">
      <CrosierDropdownEntity
        id="estabelecimento"
        v-model="userStore.fields.estabelecimentoId"
        entity-uri="/api/cfg/estabelecimento"
        convertIdsToString
        optionLabel="descricao"
        optionValue="id"
        :orderBy="{ descricao: 'ASC' }"
        label="Estabelecimento"
        :error="userStore.fieldsErrors.estabelecimentoId"
      />
    </div>

    <div class="form-row">
      <CrosierInputEmail
        id="email"
        v-model="userStore.fields.email"
        col="4"
        label="E-mail"
        :error="userStore.fieldsErrors.email"
      />
      <CrosierInputTelefone id="fone" v-model="userStore.fields.fone" col="3" label="Fone" />

      <CrosierSwitch id="isActive" v-model="userStore.fields.isActive" label="Ativo" col="1" />

      <CrosierDropdownEntity
        id="group"
        v-model="userStore.fields.group"
        col="4"
        entity-uri="/api/sec/group"
        optionLabel="groupname"
        :optionValue="null"
        :orderBy="{ groupname: 'ASC' }"
        label="Grupo"
        @change="onChangeGroup"
      />
    </div>

    <UsuarioRoles />
  </CrosierForm>
</template>
<script>
import CrosierForm from '@/components/crosier/CrosierFormS';
import CrosierInputInt from '@/components/crosier/fields/CrosierInputInt.vue';
import CrosierInputText from '@/components/crosier/fields/CrosierInputText.vue';
import CrosierInputEmail from '@/components/crosier/fields/CrosierInputEmail.vue';
import CrosierInputTelefone from '@/components/crosier/fields/CrosierInputTelefone.vue';
import CrosierSwitch from '@/components/crosier/fields/CrosierSwitch.vue';
import CrosierDropdownEntity from '@/components/crosier/fields/CrosierDropdownEntity.vue';
import { mapStores } from 'pinia';
import { useUserStore } from '@/stores/Security/user.store';
import { useLoadingStore } from '@/stores/loading.store';
import Password from 'primevue/password';
import UsuarioRoles from './UsuarioRoles.vue';

export default {
  name: 'UsuarioForm',

  components: {
    CrosierForm,
    CrosierInputInt,
    CrosierInputText,
    Password,
    CrosierInputEmail,
    CrosierInputTelefone,
    CrosierSwitch,
    CrosierDropdownEntity,
    UsuarioRoles,
  },

  computed: {
    ...mapStores(useUserStore, useLoadingStore),
  },

  mounted() {
    const id = this.$route.query.id;
    this.userStore.load(id);
  },

  methods: {
    async onChangeGroup() {
      this.$nextTick(() => {
        this.userStore.fields.userRoles = this.userStore.fields.group.roles;
      });
    },
  },
};
</script>
