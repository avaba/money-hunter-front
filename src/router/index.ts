import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import Auth from '../views/Auth.vue';
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: () => '/auth'
  },
  {
    path: "/auth",
    name: 'auth',
    component: Auth,
    redirect: {name: 'auth.login'},
    children: [
      {path: 'login', name: 'auth.login', component: Login},
      {path: 'register', name: 'auth.register', component: Register}
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
