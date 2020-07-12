<template>
  <Fragment>
    <div class="modal-title">Регистрация</div>
    <form action="" class="modal-form" @submit.prevent="register">
      <div class="modal-form__input-item">
        <InputField label="E-mail" clazz="input-field__input_mail" v-model="login" :error="loginError"/>
      </div>
      <div class="modal-form__input-item">
        <InputField label="Пароль"
                    clazz="input-field__input_password"
                    v-model="password"
                    type="password"
                    error=""/>
      </div>
      <div class="modal-form__promocod-item">
        <div class="modal-form__promocod-link"
             @click="showPromotionField=!showPromotionField"
             v-if="!showPromotionField">
          У меня есть промокод
        </div>
        <template v-if="showPromotionField">
          <InputField type="text" clazz="input-field__input" placeholder="Введите промокод" v-model="code"/>
          <button class="modal-form__promocod-done" type="button"/>
        </template>
      </div>
      <div class="modal-form__submit-item">
        <Btn label="Войти" type="submit"/>
      </div>
      <div class="modal-form__links">
        <router-link :to="{name: 'auth.login'}">Уже есть учетная запись? Войти</router-link>
      </div>
    </form>
  </Fragment>
</template>

<script>
  import InputField from "@/shared-components/InputField";
  import Btn from "@/shared-components/Btn";
  import {Fragment} from 'vue-fragment';
  import {AuthService} from "@/services/auth_service";

  export default {
    name: "Register",
    components: {Fragment, InputField, Btn},
    data() {
      return {
        showPromotionField: false,

        loginError: '',

        login: '',
        password: '',
        code: ''
      }
    },
    methods: {
      async register() {
        const service = new AuthService();
        const status = await service.register(this.login, this.password);

        this.loginError = typeof status === 'boolean' && status ? '' : status;
      }
    }
  }
</script>

<style scoped>

</style>