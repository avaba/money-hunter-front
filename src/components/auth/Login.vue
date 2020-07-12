<template>
  <Fragment>
    <div class="modal-title">Вход</div>
    <form action="" class="modal-form" @submit.prevent="handleLoginBtn">
      <div class="modal-form__input-item">
        <InputField label="E-mail" clazz="input-field__input_mail" v-model="login" placeholder="Введите E-mail"/>
      </div>
      <div class="modal-form__input-item">
        <InputField label="Пароль"
                    clazz="input-field__input_password"
                    v-model="password"
                    type="password"
                    placeholder="Введите Пароль"
                    :error="loginError"/>
      </div>
      <div class="modal-form__submit-item">
        <Btn label="Войти" type="submit"/>
      </div>
      <div class="modal-form__links">
        <router-link :to="{name: 'auth.register'}">Регистрация</router-link>
        <a href="#">Забыли Пароль?</a>
      </div>
    </form>
  </Fragment>
</template>

<script>
  import {Fragment} from 'vue-fragment';
  import InputField from "@/shared-components/InputField";
  import Btn from "@/shared-components/Btn";
  import {AuthService} from "@/services/auth_service";

  export default {
    name: "Login",
    components: {Fragment, InputField, Btn},
    data() {
      return {
        login: '',
        password: '',

        loginError: ''
      }
    },
    methods: {
      async handleLoginBtn() {
        const authService = new AuthService();

        const result = await authService.authorize(this.login, this.password);
        if (typeof result === 'boolean' && result) {
          await this.$router.push({name: 'auth.temp'});
        } else {
          this.loginError = result;
        }
      }
    }
  }
</script>

<style scoped>
</style>