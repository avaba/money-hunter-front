<template>
  <ValidationObserver v-slot="{handleSubmit}">
    <form action="" class="modal-form" @submit.prevent="handleSubmit(handleRecoverRequest)">
      <div class="modal-form__input-item">
        <ValidationProvider :rules="{required: true, min: 6}" v-slot="{errors}" name="Пароль">
          <InputField label="Введите новый пароль"
                      clazz="input-field__input_password"
                      v-model="password"
                      type="password"
                      :error="$getValidationError(errors)"/>
        </ValidationProvider>
      </div>
      <div class="modal-form__submit-item">
        <Btn label="Восстановить" type="submit"/>
      </div>
      <div class="modal-form__links modal-form__links_align-center">
        <router-link :to="{name: 'auth.login'}">Авторизоваться</router-link>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
  import {ValidationObserver, ValidationProvider} from 'vee-validate';
  import InputField from "../../shared-components/InputField";
  import Btn from "../../shared-components/Btn";
  import {AuthService} from "@/services/auth_service";

  export default {
    name: "RecoverConfirm",
    data() {
      return {
        password: ''
      }
    },
    components: {Btn, InputField, ValidationObserver, ValidationProvider},
    methods: {
      async handleRecoverRequest() {
        const service = AuthService.getInstance();
        const response = await service.setPassword(
          this.password,
          this.$route.params.uidb64,
          this.$route.params.token
        );

        if (response) {
          alert('Пароль успешно изменен');
          await this.$router.push({name: 'auth.login'});
        } else {
          alert('Возникла ошибка');
        }
      }
    }
  }
</script>

<style scoped>

</style>