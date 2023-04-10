<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <div class="text-center">
              <div class="mb-4 text-center">
                <img
                  class="navbar-brand-full ml-4"
                  :src="getCrosierLogo"
                  width="160"
                  alt="Crosier Logo"
                />
              </div>
            </div>
            <hr />
            <div v-if="loginErrorMessage" class="alert alert-danger" role="alert">
              <i class="fas fa-exclamation-triangle"></i>
              {{ loginErrorMessage }}
            </div>
            <form @keydown.enter.prevent="login(user)">
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fas fa-user" /></span>
                <input
                  v-model="user.username"
                  type="text"
                  class="form-control"
                  placeholder="Usuário"
                  aria-label="Usuário"
                />
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fas fa-key" /></span>
                <input
                  v-model="user.password"
                  type="password"
                  class="form-control"
                  placeholder="Senha"
                  aria-label="Senha"
                />
              </div>

              <div class="d-grid gap-2">
                <button type="button" class="btn btn-primary" @click="login(user)">
                  <i class="fas fa-sign-in-alt"></i> Login
                </button>
              </div>
            </form>

            <div class="row">
              <div class="col-6 text-left">
                <a class="small" href="/sec/user/recuperaSenha/ini">Esqueci minha senha</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import router from "@/router/index.js";

export default {
  name: "Login",

  components: {},

  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },

  computed: {
    ...mapGetters({
      loggedIn: "auth/isLoggedIn",
      loginErrorMessage: "auth/getLoginErrorMessage",
      loadingCount: "layout/getLoadingCount",
    }),

    getCrosierLogo() {
      return import.meta.env.VITE_CROSIER_LOGO;
    },
  },

  updated() {
    if (this.loggedIn()) {
      router.push("/");
    }
  },

  methods: {
    ...mapActions({ login: "auth/login" }),
  },
};
</script>
