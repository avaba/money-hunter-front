<template>
  <ValidationObserver v-slot="{handleSubmit}">
    <form action="" class="modal-form" @submit.prevent="handleSubmit(handleRecoverRequest)">
      <div class="modal-form__input-item">
        <ValidationProvider :rules="{required: true, email: true}" v-slot="{errors}" name="Email">
          <InputField label="E-mail"
                      clazz="input-field__input_mail"
                      v-model="email"
                      :error="$getValidationError(errors)"
                      placeholder="Пожалуйста введите ваш E-mail"/>
        </ValidationProvider>
      </div>
      <div class="modal-form__submit-item">
        <Btn label="Восстановление пароля" type="submit"/>
      </div>
      <div class="modal-form__links">
        <router-link :to="{name: 'auth.login'}">Авторизоваться</router-link>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
  import {ValidationProvider, ValidationObserver} from 'vee-validate';
  import InputField from "../../shared-components/InputField";
  import Btn from "../../shared-components/Btn";

  export default {
    name: "RecoverRequest",
    components: {Btn, InputField, ValidationProvider, ValidationObserver},
    data(){
      return {
        email: ''
      }
    },
    methods: {
      handleRecoverRequest() {
        this.$router.push({name: 'auth.recover_confirm'})
      }
    }
  }
</script>

<style scoped>

</style>