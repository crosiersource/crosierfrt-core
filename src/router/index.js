import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores/auth.store';
import MainLayout from '@/layouts/MainLayout.vue';
import RawLayout from '@/layouts/RawLayout.vue';
import Home from '@/views/Home.vue';
import Sobre from '@/views/Sobre.vue';
import Settings from '@/views/Settings.vue';
import Login from '@/views/pages/auth/Login.vue';
import NotFound from '@/views/NotFound.vue';
import GrupoList from '@/views/Security/Grupo/List.vue';
import GrupoForm from '@/views/Security/Grupo/Form.vue';
import UsuarioList from '@/views/Security/Usuario/List.vue';
import UsuarioForm from '@/views/Security/Usuario/Form.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '/', component: Home },
      { path: '/home', redirect: '/' },
      { path: '/sobre', component: Sobre },
      { path: '/settings', component: Settings },
      { path: '/sec/grupo/list', component: GrupoList },
      { path: '/sec/grupo/form/:id?', component: GrupoForm, props: true },
      { path: '/sec/usuario/list', component: UsuarioList },
      { path: '/sec/usuario/form/:id?', component: UsuarioForm, props: true }
    ]
  },
  {
    path: '/login',
    component: RawLayout,
    children: [{ path: '', component: Login }]
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
];

const index = createRouter({
  history: createWebHistory(),
  routes
});

index.beforeEach(async (to) => {
  const publicPages = ['/login', '/esqueciMinhaSenha'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  authStore.loadAllFromLocalStorage();

  if (to.path !== '/login') {
    if (authStore.isTokenExpired()) {
      await authStore.doRefreshToken();
    }

    if (authRequired && authStore.isTokenExpired()) {
      authStore.returnUrl = to.fullPath;
      return '/login';
    }
  }
});

export default index;
