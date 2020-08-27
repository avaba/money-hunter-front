<template>
  <Fragment>
    <ValidationObserver v-slot="{handleSubmit}">
      <form action="" class="modal-form" @submit.prevent="handleSubmit(register)">
        <template v-if="!confirmMessage">
          <div class="modal-form__input-item">
            <ValidationProvider v-slot="{errors}" name="E-mail" :rules="{required: true, email: true}">
              <InputField label="E-mail"
                          clazz="input-field__input_mail"
                          v-model="login"
                          @input="loginError=''"
                          :error="loginError || $getValidationError(errors)"/>
            </ValidationProvider>
          </div>
          <div class="modal-form__input-item">
            <ValidationProvider :rules="{required: true, min: 6}" v-slot="{errors}" name="Пароль">
              <InputField label="Пароль"
                          clazz="input-field__input_password"
                          v-model="password"
                          type="password"
                          @input="passwordError=''"
                          :error="passwordError || $getValidationError(errors)"/>
            </ValidationProvider>
          </div>
          <div class="modal-form__input-item">
            <ValidationProvider name="Имя" :rules="{required: true}" v-slot="{errors}">
              <InputField label="Имя"
                          clazz="input-field__input_name"
                          :error="nameError || $getValidationError(errors)"
                          v-model="name"
                          @input="nameError=''"
              />
            </ValidationProvider>
          </div>
          <div class="modal-form__input-item">
            <ValidationProvider name="Телефонный номер" :rules="{phonenumber: true, required: true}" v-slot="{errors}">
              <InputField label="Телефонный номер"
                          clazz="input-field__input_phone"
                          :error="phoneNumberError || $getValidationError(errors)"
                          v-model="phoneNumber"
                          @input="phoneNumberError=''"
                          placeholder="8 (___) ___-__-__"
                          :mask="'8 (###) ###-##-##'"
              />
            </ValidationProvider>
          </div>
          <div class="modal-form__promocod-item">
            <div class="modal-form__promocod-link"
                 @click="showPromotionField=!showPromotionField"
                 v-if="!showPromotionField">
              У меня есть промокод
            </div>
            <template v-if="showPromotionField">
              <InputField :disabled="codeStatus === 'valid'" type="text" clazz="input-field__input" placeholder="Введите промокод" v-model="code"/>
              <button @click="promocodeCheking" class="modal-form__promocod-done" type="button"/>
            </template>
          </div>
          <p class="promocode-status" :class="codeStatus" v-if="showPromotionField && codeStatus">{{ codeStatus === 'valid' ? 'Промокод применён' : 'Промокод больше не действителен'}}</p>
          <div class="modal-form__submit-item">
            <Btn label="Зарегистрироваться" type="submit"/>
          </div>
          <div class="modal-form__links modal-form__links_align-center">
            <router-link :to="{name: 'auth.login'}">Уже есть учетная запись? Войти</router-link>
          </div>
        </template>
        <template v-else>
          <div class="modal-form__success-reset-password">{{ successText }}
          </div>
          <div class="modal-form__submit-item">
            <Btn label="Хорошо" @click="$router.push({name: 'root'})"/>
          </div>
        </template>
      </form>
    </ValidationObserver>
  </Fragment>
</template>

<script>
  import InputField from "@/shared-components/InputField";
  import Btn from "@/shared-components/Btn";
  import {Fragment} from 'vue-fragment';
  import {AuthService} from "@/services/auth_service";
  import {ValidationObserver, ValidationProvider} from 'vee-validate';

  export default {
    name: "Register",
    components: {Fragment, InputField, Btn, ValidationProvider, ValidationObserver},
    data() {
      return {
        confirmMessage: false,

        showPromotionField: false,

        loginError: null,
        passwordError: null,
        phoneNumberError: null,
        nameError: null,

        login: '',
        password: '',
        code: '',
        phoneNumber: '',
        name: '',
        
        codeStatus: null
      }
    },
    computed: {
      successText() {
        let text = `Сервис работает в тестовом режиме, вы были добавлены в лист ожидания. В ближайшее время с вами свяжется наш менеджер`
        if(this.confirmMessage && this.codeStatus === 'valid') {
          text = `Мы отправили сообщение на адрес ${this.login}.
            Пожалуйста, проверьте свой почтовый ящик и следуйте инструкциям.`
        }
        return text
      }
    },
    methods: {
      async register() {
        const service = AuthService.getInstance();
        const status = await service.register(this.login, this.password, this.name, this.phoneNumber);
        if (typeof status === 'boolean' && status) {
          this.confirmMessage = true;
          if(this.codeStatus === 'valid') {
            const promocodeStatus = await service.setPromocode(this.code, this.login);
          }
        } else {
          this.loginError = status;
        }
      },
      async promocodeCheking () {
        const fields = ['login', 'password', 'phoneNumber', 'name']
        let isError = false
        fields.forEach(elem => {
          if(this[elem] === '') {
            this[`${elem}Error`] = 'Обязательно для заполнения'
            isError = true
          }
        });
        if(!isError) {
          const service = AuthService.getInstance();
          const promocodeStatus = await service.getPromocode(this.code)
          if(promocodeStatus && promocodeStatus != 'promocode is not valid') {
            this.codeStatus = 'valid'
          } else if(promocodeStatus && promocodeStatus === 'promocode is not valid') {
            this.codeStatus = 'notValid'
          }
        }
      }
    }
  }
</script>

<style scoped>
  .valid {
    color: green
  }
  .notValid {
    color: red;
  }
  .promocode-status {
    text-align: center;
    margin-top: 10px;
  }
</style>