<template>
  <Fragment>
    <div class="modal-title">Регистрация</div>
    <form action="" class="modal-form">
      <div class="modal-form__input-item">
        <InputField label="E-mail" clazz="input-field__input_mail" v-model="login"/>
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

  export default {
    name: "Register",
    components: {Fragment, InputField, Btn},
    data() {
      return {
        showPromotionField: false,

        login: '',
        password: '',
        code: ''
      }
    }
  }
</script>

<style scoped>

</style>