import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores/auth.store';
import GrupoList from '@/views/Security/Grupo/GrupoList.vue';
import GrupoForm from '@/views/Security/Grupo/GrupoForm.vue';
import UsuarioList from '@/views/Security/Usuario/UsuarioList.vue';
import UsuarioForm from '@/views/Security/Usuario/UsuarioForm.vue';

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: '/home', redirect: '/' },
      { path: '/sec/grupo/list', component: GrupoList },
      { path: '/sec/grupo/form/:id?', component: GrupoForm, props: true },
      { path: '/sec/usuario/list', component: UsuarioList },
      { path: '/sec/usuario/form/:id?', component: UsuarioForm, props: true },
      {
        path: '/',
        name: 'dashboard',
        exact: true,
        component: () => import('@/views/dashboards/Dashboard.vue'),
        meta: {
          breadcrumb: [{ label: 'Sales Dashboard' }],
        },
      },
      {
        path: '/dashboards/dashboardanalytics',
        name: 'dashboardanalytics',
        exact: true,
        component: () => import('@/views/dashboards/DashboardAnalytics.vue'),
        meta: {
          breadcrumb: [{ label: 'Analytics Dashboard' }],
        },
      },
      {
        path: '/dashboards/dashboardsaas',
        name: 'saas',
        exact: true,
        component: () => import('@/views/dashboards/DashboardSaas.vue'),
        meta: {
          breadcrumb: [{ label: 'SaaS Dashboard' }],
        },
      },
      {
        path: '/apps/blog/list',
        component: () => import('@/views/apps/blog/List.vue'),
        meta: {
          breadcrumb: [{ parent: 'Apps', label: 'Blog', item: 'List' }],
        },
      },
      {
        path: '/apps/blog/detail',
        component: () => import('@/views/apps/blog/Detail.vue'),
        meta: {
          breadcrumb: [{ parent: 'Apps', label: 'Blog', item: 'Detail' }],
        },
      },
      {
        path: '/apps/blog/edit',
        name: 'blog-edit',
        component: () => import('@/views/apps/blog/Edit.vue'),
        meta: {
          breadcrumb: [{ parent: 'Apps', label: 'Blog', item: 'Edit' }],
        },
      },
      {
        path: '/apps/files',
        name: 'files',
        component: () => import('@/views/apps/Files.vue'),
        meta: {
          breadcrumb: [{ parent: 'Apps', label: 'Files' }],
        },
      },
      {
        path: '/apps/chat',
        name: 'chat',
        component: () => import('@/views/apps/chat/Index.vue'),
        meta: {
          breadcrumb: [{ parent: 'Apps', label: 'Chat' }],
        },
      },
      {
        path: '/apps/tasklist',
        name: 'tasklist',
        component: () => import('@/views/apps/tasklist/Index.vue'),
        meta: {
          breadcrumb: [{ parent: 'Apps', label: 'Task List' }],
        },
      },
      {
        path: '/apps/mail',
        component: () => import('@/views/apps/mail/Index.vue'),
        children: [
          {
            path: '/apps/mail/inbox',
            name: 'mail-inbox',
            component: () => import('@/views/apps/mail/MailTypes.vue'),
            meta: {
              breadcrumb: [{ parent: 'Apps', label: 'Mail', item: 'Inbox' }],
            },
          },
          {
            path: '/apps/mail/compose',
            name: 'mail-compose',
            component: () => import('@/views/apps/mail/ComposeNew.vue'),
            meta: {
              breadcrumb: [{ parent: 'Apps', label: 'Mail', item: 'Compose' }],
            },
          },
          {
            path: '/apps/mail/detail/:id',
            name: 'mail-detail',
            component: () => import('@/views/apps/mail/Detail.vue'),
            meta: {
              breadcrumb: [{ parent: 'Apps', label: 'Mail', item: 'Detail' }],
            },
          },
          {
            path: '/apps/mail/starred',
            component: () => import('@/views/apps/mail/MailTypes.vue'),
            meta: {
              breadcrumb: [{ parent: 'Apps', label: 'Mail', item: 'Starred' }],
            },
          },
          {
            path: '/apps/mail/spam',
            component: () => import('@/views/apps/mail/MailTypes.vue'),
            meta: {
              breadcrumb: [{ parent: 'Apps', label: 'Mail', item: 'Spam' }],
            },
          },
          {
            path: '/apps/mail/important',
            component: () => import('@/views/apps/mail/MailTypes.vue'),
            meta: {
              breadcrumb: [{ parent: 'Apps', label: 'Mail', item: 'Important' }],
            },
          },
          {
            path: '/apps/mail/sent',
            component: () => import('@/views/apps/mail/MailTypes.vue'),
            meta: {
              breadcrumb: [{ parent: 'Apps', label: 'Mail', item: 'Sent' }],
            },
          },
          {
            path: '/apps/mail/archived',
            component: () => import('@/views/apps/mail/MailTypes.vue'),
            meta: {
              breadcrumb: [{ parent: 'Apps', label: 'Mail', item: 'Archived' }],
            },
          },
          {
            path: '/apps/mail/trash',
            component: () => import('@/views/apps/mail/MailTypes.vue'),
            meta: {
              breadcrumb: [{ parent: 'Apps', label: 'Mail', item: 'Trash' }],
            },
          },
        ],
      },
      {
        path: '/uikit/formlayout',
        name: 'formlayout',

        component: () => import('@/views/uikit/FormLayoutDoc.vue'),
        meta: {
          breadcrumb: [{ parent: 'UI Kit', label: 'Form Layout' }],
        },
      },
      {
        path: '/uikit/input',
        name: 'input',
        component: () => import('@/views/uikit/InputDoc.vue'),
        meta: {
          breadcrumb: [{ parent: 'UI Kit', label: 'Input' }],
        },
      },
      {
        path: '/uikit/button',
        name: 'button',
        component: () => import('@/views/uikit/ButtonDoc.vue'),
        meta: {
          breadcrumb: [{ parent: 'UI Kit', label: 'Button' }],
        },
      },
      {
        path: '/uikit/table',
        name: 'table',
        component: () => import('@/views/uikit/TableDoc.vue'),
        meta: {
          breadcrumb: [{ parent: 'UI Kit', label: 'Table' }],
        },
      },
      {
        path: '/uikit/list',
        name: 'list',
        component: () => import('@/views/uikit/ListDoc.vue'),
        meta: {
          breadcrumb: [{ parent: 'UI Kit', label: 'List' }],
        },
      },
      {
        path: '/uikit/tree',
        name: 'tree',
        component: () => import('@/views/uikit/TreeDoc.vue'),
        meta: {
          breadcrumb: [{ parent: 'UI Kit', label: 'Tree' }],
        },
      },
      {
        path: '/uikit/panel',
        name: 'panel',
        component: () => import('@/views/uikit/PanelsDoc.vue'),
        meta: {
          breadcrumb: [{ parent: 'UI Kit', label: 'Panel' }],
        },
      },
      {
        path: '/uikit/overlay',
        name: 'overlay',
        component: () => import('@/views/uikit/OverlayDoc.vue'),
        meta: {
          breadcrumb: [{ parent: 'UI Kit', label: 'Overlay' }],
        },
      },
      {
        path: '/uikit/media',
        name: 'media',
        component: () => import('@/views/uikit/MediaDoc.vue'),
        meta: {
          breadcrumb: [{ parent: 'UI Kit', label: 'Media' }],
        },
      },
      {
        path: '/uikit/menu/',
        component: () => import('@/views/uikit/MenuDoc.vue'),
        meta: {
          breadcrumb: [{ parent: 'UI Kit', label: 'Menu' }],
        },
      },
      {
        path: '/uikit/message',
        name: 'message',
        component: () => import('@/views/uikit/MessagesDoc.vue'),
        meta: {
          breadcrumb: [{ parent: 'UI Kit', label: 'Messages' }],
        },
      },
      {
        path: '/uikit/file',
        name: 'file',
        component: () => import('@/views/uikit/FileDoc.vue'),
        meta: {
          breadcrumb: [{ parent: 'UI Kit', label: 'File' }],
        },
      },
      {
        path: '/uikit/charts',
        name: 'charts',
        component: () => import('@/views/uikit/ChartDoc.vue'),
        meta: {
          breadcrumb: [{ parent: 'UI Kit', label: 'Charts' }],
        },
      },
      {
        path: '/uikit/timeline',
        name: 'timeline',
        component: () => import('@/views/uikit/TimelineDoc.vue'),
        meta: {
          breadcrumb: [{ parent: 'UI Kit', label: 'Timeline' }],
        },
      },
      {
        path: '/uikit/misc',
        name: 'misc',
        component: () => import('@/views/uikit/MiscDoc.vue'),
        meta: {
          breadcrumb: [{ parent: 'UI Kit', label: 'Misc' }],
        },
      },
      {
        path: '/pages/crud',
        name: 'crud',
        component: () => import('@/views/pages/Crud.vue'),
        meta: {
          breadcrumb: [{ parent: 'Pages', label: 'Crud' }],
        },
      },
      {
        path: '/ecommerce/product-overview',
        name: 'product-overview',
        meta: {
          breadcrumb: [{ parent: 'E-Commerce', label: 'Product Overview' }],
        },
        component: () => import('@/views/e-commerce/ProductOverview.vue'),
      },
      {
        path: '/ecommerce/product-list',
        name: 'product-list',
        meta: {
          breadcrumb: [{ parent: 'E-Commerce', label: 'Product List' }],
        },
        component: () => import('@/views/e-commerce/ProductList.vue'),
      },
      {
        path: '/ecommerce/shopping-cart',
        name: 'shopping-cart',
        meta: {
          breadcrumb: [{ parent: 'E-Commerce', label: 'Shopping Chart' }],
        },
        component: () => import('@/views/e-commerce/ShoppingCart.vue'),
      },
      {
        path: '/ecommerce/new-product',
        name: 'new-product',
        meta: {
          breadcrumb: [{ parent: 'E-Commerce', label: 'New Product' }],
        },
        component: () => import('@/views/e-commerce/NewProduct.vue'),
      },
      {
        path: '/ecommerce/order-history',
        name: 'order-history',
        meta: {
          breadcrumb: [{ parent: 'E-Commerce', label: 'Order History' }],
        },
        component: () => import('@/views/e-commerce/OrderHistory.vue'),
      },
      {
        path: '/ecommerce/order-summary',
        name: 'order-summary',
        meta: {
          breadcrumb: [{ parent: 'E-Commerce', label: 'Order Summary' }],
        },
        component: () => import('@/views/e-commerce/OrderSummary.vue'),
      },
      {
        path: '/ecommerce/checkout-form',
        name: 'checkout-form',
        meta: {
          breadcrumb: [{ parent: 'E-Commerce', label: 'Checkout Form' }],
        },
        component: () => import('@/views/e-commerce/CheckoutForm.vue'),
      },
      {
        path: '/profile/list',
        name: 'user-list',
        component: () => import('@/views/user-management/UserList.vue'),
        meta: {
          breadcrumb: [{ parent: 'User Management', label: 'List' }],
        },
      },
      {
        path: '/profile/create',
        name: 'user-create',
        component: () => import('@/views/user-management/UserCreate.vue'),
        meta: {
          breadcrumb: [{ parent: 'User Management', label: 'Create' }],
        },
      },
      {
        path: '/pages/invoice',
        name: 'invoice',
        component: () => import('@/views/pages/Invoice.vue'),
        meta: {
          breadcrumb: [{ parent: 'Pages', label: 'Invoice' }],
        },
      },
      {
        path: '/pages/help',
        name: 'help',
        component: () => import('@/views/pages/Help.vue'),
        meta: {
          breadcrumb: [{ parent: 'Pages', label: 'Help' }],
        },
      },
      {
        path: '/pages/empty',
        name: 'empty',
        component: () => import('@/views/pages/Empty.vue'),
      },
      {
        path: '/pages/aboutus',
        name: 'aboutus',
        meta: {
          breadcrumb: [{ parent: 'Pages', label: 'About' }],
        },
        component: () => import('@/views/pages/AboutUs.vue'),
      },
      {
        path: '/pages/contact',
        name: 'contact',
        component: () => import('@/views/pages/ContactUs.vue'),
        meta: {
          breadcrumb: [{ parent: 'Pages', label: 'Contact' }],
        },
      },
      {
        path: '/documentation',
        name: 'documentation',
        component: () => import('@/views/utilities/Documentation.vue'),
        meta: {
          breadcrumb: [{ parent: 'Start', label: 'Documentation' }],
        },
      },
      {
        path: '/blocks',
        name: 'blocks',
        component: () => import('@/views/utilities/Blocks.vue'),
        meta: {
          breadcrumb: [{ parent: 'Prime Blocks', label: 'Free Blocks' }],
        },
      },
    ],
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('@/views/pages/auth/Login.vue'),
  },
  {
    path: '/auth/login2',
    name: 'login2',
    component: () => import('@/views/pages/auth/Login2.vue'),
  },
  {
    path: '/auth/access',
    name: 'accessDenied',
    component: () => import('@/views/pages/auth/AccessDenied.vue'),
  },
  {
    path: '/auth/access2',
    name: 'accessDenied2',
    component: () => import('@/views/pages/auth/AccessDenied2.vue'),
  },
  {
    path: '/auth/error',
    name: 'error',
    component: () => import('@/views/pages/auth/Error.vue'),
  },
  {
    path: '/auth/error2',
    name: 'error2',
    component: () => import('@/views/pages/auth/Error2.vue'),
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('@/views/pages/auth/Register.vue'),
  },
  {
    path: '/auth/esqueciMinhaSenha',
    name: 'forgotpassword',
    component: () => import('@/views/pages/auth/ForgotPassword.vue'),
  },
  {
    path: '/auth/newpassword',
    name: 'newpassword',
    component: () => import('@/views/pages/auth/NewPassword.vue'),
  },
  {
    path: '/auth/verification',
    name: 'verification',
    component: () => import('@/views/pages/auth/Verification.vue'),
  },
  {
    path: '/auth/lockscreen',
    name: 'lockscreen',
    component: () => import('@/views/pages/auth/LockScreen.vue'),
  },
  {
    path: '/pages/notfound',
    name: 'notfound',
    component: () => import('@/views/pages/NotFound.vue'),
  },
  {
    path: '/landing',
    name: 'landing',
    component: () => import('@/views/pages/Landing.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/views/pages/NotFound.vue'),
  },
];

console.log('era:', routes.length);
console.log(routes);
console.log(routes[0].children);

// import { extendRoutes } from '../../../docplus-front2/src/router/routes.js';
//
// const novasRotas = extendRoutes();
//
// console.log(novasRotas);
//
// routes[0].children = [...routes[0].children, ...novasRotas];

// Mapeia os possíveis caminhos de módulos de rotas
const modules = import.meta.glob('../../../*/src/router/routes.js', { eager: true });

console.log('modules', modules);

Object.keys(modules).forEach((path) => {
  console.log(`Importando rotas do arquivo: ${path}`);
  const subprojetoRoutes = modules[path].default; // As rotas devem estar exportadas como `default`

  console.log('subprojetoRoutes', subprojetoRoutes);

  if (Array.isArray(subprojetoRoutes)) {
    console.log('Adicionando rotas do subprojeto:', subprojetoRoutes);

    // Adiciona as rotas ao conjunto principal
    routes[0].children = [...routes[0].children, ...subprojetoRoutes];
  } else {
    console.error(`O arquivo de rotas em "${path}" não exporta um array de rotas.`);
  }
});

console.log('depois..');

// Adiciona as rotas dinamicamente
// routes[0].children = [...routes[0].children, ...novasRotas];

console.log('agora:', routes.length);

console.log(routes);
console.log(routes[0].children);

console.log('createRouter');

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

console.log('afterRouter');

router.beforeEach(async (to) => {
  const publicPages = ['/auth/login', '/auth/esqueciMinhaSenha'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  authStore.loadAllFromLocalStorage();

  if (to.path !== '/auth/login') {
    if (authStore.isTokenExpired()) {
      await authStore.doRefreshToken();
    }
    if (authRequired && authStore.isTokenExpired()) {
      authStore.returnUrl = to.fullPath;
      return '/auth/login';
    }
  }
});

export default router;
