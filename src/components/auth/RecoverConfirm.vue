<template>
  <ValidationObserver v-slot="{handleSubmit}">
    <form action="" class="modal-form" @submit.prevent="handleSubmit(handleRecoverRequest)">
      <div class="modal-form__input-item">
        <ValidationProvider :rules="{required: true}" v-slot="{errors}" name="Email">
          <InputField label="Введите код из письма"
                      clazz="input-field__input_mail"
                      v-model="confimationCode"
                      :error="$getValidationError(errors)"
                      placeholder="Введите код из письма"/>
        </ValidationProvider>
      </div>
      <div class="modal-form__submit-item">
        <Btn label="Восстановить" type="submit"/>
      </div>
      <div class="modal-form__links">
        <router-link :to="{name: 'auth.login'}">Авторизоваться</router-link>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
  import {ValidationObserver, ValidationProvider} from 'vee-validate';
  import InputField from "../../shared-components/InputField";
  import Btn from "../../shared-components/Btn";

  export default {
    name: "RecoverConfirm",
    data() {
      return {
        confimationCode: ''
      }
    },
    components: {Btn, InputField, ValidationObserver, ValidationProvider}
  }
</script>

<style scoped>

</style>