<template>
Sou a página de login
  <button @click="login">Login</button>
  <p>
  <router-link to="/home">Bora</router-link>
  </p>
  <p>
  <router-link to="/livre">Livre</router-link>
  </p>
  
  <h1>Sim? {{ loggedIn }}</h1>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Login",

  computed: {
    ...mapGetters("auth", {
      loggedIn: "isLoggedIn"
    })
  },
  
  methods: {
    ...mapMutations("auth/", ["loginSuccess"]),

    login() {
      this.loginSuccess({ id: 1, nome: "Fulano" });
    }
  }
};

</script>

