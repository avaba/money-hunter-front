import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import Auth from '../views/Auth.vue';
import Blackbox from '../views/Blackbox.vue';
import Profile from '../views/Profile.vue';
import Tracking from '../views/Tracking.vue';

import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import {TokenService} from "@/services/token_service";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'root',
    redirect: () => {
      const tokenService = new TokenService();

      return tokenService.isLoggedIn() ? '/blackbox' : '/auth/login'
    }
  },
  {
    path: '/blackbox',
    name: 'blackbox',
    component: Blackbox,
    meta: {
      title: 'BlackBox'
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      title: 'Профиль'
    }
  },
  {
    path: '/tracking',
    name: 'tracking',
    component: Tracking,
    meta: {
      title: 'Отслеживание',
    }
  },
  {
    path: "/auth",
    name: 'auth',
    component: Auth,
    children: [
      {path: 'login', name: 'auth.login', component: Login},
      {path: 'register', name: 'auth.register', component: Register},
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const tokenService = new TokenService();
  if (to.name !== 'auth.login' && !tokenService.isLoggedIn()) {
    next({name: 'auth.login'})
  } else {
    next();
  }
});

export default router;
