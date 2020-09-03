<template>
  <Fragment>
    <ValidationObserver v-slot="{handleSubmit}">
      <form action="" class="modal-form" @submit.prevent="handleSubmit(handleLoginBtn)">
        <div class="modal-form__input-item">
          <ValidationProvider :rules="{required: true, email: true}" v-slot="{errors}" name="Email">
            <InputField label="E-mail"
                        clazz="input-field__input_mail"
                        v-model="login"
                        :error="$getValidationError(errors)"
                        placeholder="Введите E-mail"/>
          </ValidationProvider>
        </div>
        <div class="modal-form__input-item">
          <ValidationProvider :rules="{required: true, min: 6}" v-slot="{errors}" name="Пароль">
            <InputField label="Пароль"
                        clazz="input-field__input_password"
                        v-model="password"
                        type="password"
                        placeholder="Введите Пароль"
                        :error="loginError || $getValidationError(errors)"/>
          </ValidationProvider>
        </div>
        <div class="modal-form__submit-item">
          <Btn label="Войти" type="submit"/>
        </div>
        <div class="modal-form__links">
          <router-link :to="{name: 'auth.register'}">Регистрация</router-link>
          <router-link :to="{name: 'auth.recover_request'}">Забыли Пароль?</router-link>
        </div>
      </form>
    </ValidationObserver>
  </Fragment>
</template>

<script>
  import {Fragment} from 'vue-fragment';
  import InputField from "@/shared-components/InputField";
  import Btn from "@/shared-components/Btn";
  import {AuthService} from "@/services/auth_service";
  import {ValidationObserver, ValidationProvider} from 'vee-validate';
  export default {
    name: "Login",
    components: {Fragment, InputField, Btn, ValidationObserver, ValidationProvider},
    data() {
      return {
        login: '',
        password: '',

        loginError: null
      }
    },
    methods: {
      async handleLoginBtn() {
        const authService = AuthService.getInstance();
        
        const result = await authService.authorize(this.login, this.password);
        if (typeof result === 'boolean' && result) {
          await this.$router.push({name: 'root'});
        } else {
          this.loginError = result;
        }
      }
    },
  }
</script>

<style scoped>
</style>