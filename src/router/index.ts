import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import Auth from '../views/Auth.vue';
import Profile from '../views/Profile.vue';
import Tracking from '../views/Tracking.vue';

import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import RecoverRequest from '../components/auth/RecoverRequest.vue';
import RecoverConfirm from '../components/auth/RecoverConfirm.vue';

import GroupList from '../components/tracking/GroupList.vue';

import {TokenService} from "@/services/token_service";
import {lazyLoad} from "@/helpers";

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
    component: lazyLoad('views/Blackbox'),
    meta: {
      title: 'Black Box'
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
    redirect: {name: 'tracking.group_list'},
    meta: {
      title: 'Отслеживание',
    },
    children: [
      {path: 'groups', name: 'tracking.group_list', component: GroupList},
      {path: 'group/:name', name: 'tracking.group', component: lazyLoad('components/tracking/Group')}
    ]
  },
  {
    path: "/auth",
    name: 'auth',
    component: Auth,
    beforeEnter(to, from, next) {
      const tokenService = new TokenService();
      if (tokenService.isLoggedIn()) {
        next({name: 'profile'});
      } else {
        next();
      }
    },
    children: [
      {path: 'login', name: 'auth.login', component: Login, meta: {title: 'Вход'}},
      {path: 'register', name: 'auth.register', component: Register, meta: {title: 'Регистрация'}},
      {
        path: 'recover_request',
        name: 'auth.recover_request',
        component: RecoverRequest,
        meta: {title: 'Восстановление пароля'}
      },
      {
        path: 'recover_confirm',
        name: 'auth.recover_confirm',
        component: RecoverConfirm,
        meta: {title: 'Восстановление пароля'}
      },
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
  if (!to.name?.startsWith('auth.') && !tokenService.isLoggedIn()) {
    next({name: 'auth.login'})
  } else {
    next();
  }
});

export default router;
