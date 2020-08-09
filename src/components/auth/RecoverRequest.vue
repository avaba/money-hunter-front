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
      <div class="modal-form__links modal-form__links_align-center">
        <router-link :to="{name: 'auth.login'}">Авторизоваться</router-link>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
  import {ValidationProvider, ValidationObserver} from 'vee-validate';
  import InputField from "../../shared-components/InputField";
  import Btn from "../../shared-components/Btn";
  import {AuthService} from "@/services/auth_service";

  import Warning from "@/components/blackbox/Warning";
  import {SHOW_MODAL_MUTATION} from "@/store/modules/modal/constants";
  import {mapMutations} from "vuex";

  export default {
    name: "RecoverRequest",
    components: {Btn, InputField, ValidationProvider, ValidationObserver},
    data() {
      return {
        email: ''
      }
    },
    methods: {
      async handleRecoverRequest() {
        const service = AuthService.getInstance();
        if (await service.sendPasswordResetLink(this.email)) {
          this[SHOW_MODAL_MUTATION]({component: Warning, data: {title: 'Сообщение отправлено'}});
          await this.$router.push({name: 'auth.login'});
        } else {
          this[SHOW_MODAL_MUTATION]({component: Warning, data: {title: 'Не найден такой email'}});
        }
      },
      ...mapMutations('modal', [SHOW_MODAL_MUTATION])
    }
  }
</script>

<style scoped>

</style>