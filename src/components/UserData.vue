<template>
  <div class="user-data block_container">
    <ValidationObserver v-slot="{handleSubmit}">
      <form action="" class="user-data-form">
        <div class="user-data__item">
          <ValidationProvider :rules="{required: true}" v-slot="{errors}">
            <InputField label="ФИО" v-model="userName" :error="$getValidationError(errors)"/>
          </ValidationProvider>
        </div>
        <div class="user-data__item">
          <ValidationProvider :rules="{required: true}" v-slot="{errors}">
            <InputField label="Компания" v-model="companyName" :error="$getValidationError(errors)"/>
          </ValidationProvider>
        </div>
        <div class="user-data__item">
          <ValidationProvider :rules="{required: true, phonenumber: true}" v-slot="{errors}">
            <InputField label="Телефонный номер"
                        v-model="phoneNumber"
                        placeholder="8 (___) ___-__-__"
                        :mask="'8 (###) ###-##-##'"
                        :error="$getValidationError(errors)"/>
          </ValidationProvider>
        </div>
        <div class="user-data__item">
          <InputField :buttonLabel="'Отменить подписку'" @buttonEvent="cancelSubscription" label="Ваш тариф" :value="subscriptionType" disabled/>
        </div>
        <div class="user-data__item">
          <template>
            <InputField :disabled="codeStatus === 'valid'" :label="promocodeLabel" type="text" clazz="input-field__input" placeholder="Введите промокод" v-model="promocode"/>
            <button @click="setPromocode" class="modal-form__promocod-done" type="button"/>
          </template>
        </div>
      </form>

      <div class="user-data-change">
        <Btn label="Изменить" disabled clazz="button__change" @click="handleSubmit(postUser)"/>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
  import InputField from "../shared-components/InputField";
  import Btn from "../shared-components/Btn";
  import {ValidationObserver, ValidationProvider} from 'vee-validate';
  import {POST_USER_ACTION, SET_USER_MUTATION} from "@/store/modules/user/constants";
  import {SHOW_MODAL_MUTATION, SET_MODAL_RESPONSE_MUTATION} from "@/store/modules/modal/constants";
  import {mapMutations} from "vuex";
  import Warning from "@/components/blackbox/Warning";
  import {AuthService} from "@/services/auth_service";

  export default {
    name: "UserData",
    components: {InputField, Btn, ValidationObserver, ValidationProvider},
    data: () => ({
      promocode: '',
      codeStatus: null
    }),
    computed: {
      user() {
        return this.$store.state.user.data;
      },
      userName: {
        get: context => context.user?.userName,
        set(value) {
          this.setUserData('userName', value);
        }
      },
      companyName: {
        get: context => context.user?.companyName,
        set(value) {
          this.setUserData('companyName', value);
        }
      },
      phoneNumber: {
        get: context => context.user?.phoneNumber,
        set(value) {
          this.setUserData('phoneNumber', value);
        }
      },
      subscriptionType() {
        return this.$store.state.user.subscription?.subscriptionType;
      },
      promocodeLabel() {
        let text = ''
        if(this.codeStatus === 'valid') {
          text = 'Промокод активирован'
        } else if (this.codeStatus === 'notValid') {
          text = 'Промокод не активирован'
        } else {
          text = 'Промокод'
        }
        return text
      }
    },
    methods: {
      async postUser() {
        const result = await this.$store.dispatch(`user/${POST_USER_ACTION}`);
        if (result) {
          // this[SHOW_MODAL_MUTATION]({component: Warning, data: {title: 'Информация сохранена'}});
          this.$store.commit('notifications/ADD_NOTIFICATION', {text: 'Информация сохранена', status: 'success'})
        }
      },
      setUserData(type, value) {
        const payload = {...this.user};

        payload[type] = value;

        this.$store.commit(`user/${SET_USER_MUTATION}`, payload);
      },
      async setPromocode() {
        const service = AuthService.getInstance();
        const promocodeStatus = await service.getPromocode(this.promocode)
        if(promocodeStatus && promocodeStatus != 'promocode is not valid') {
          this.codeStatus = 'valid'
          await service.setPromocode(this.promocode, this.user.email);
          this.$store.commit('notifications/ADD_NOTIFICATION', {text: 'Промокод активирован', status: 'success'})
        } else if(promocodeStatus && promocodeStatus === 'promocode is not valid') {
          this.codeStatus = 'notValid'
        }
      },
      cancelSubscription() {
        alert('Отменить подписку')
      },
      ...mapMutations('modal', [SET_MODAL_RESPONSE_MUTATION]),
      ...mapMutations('modal', [SHOW_MODAL_MUTATION])
    }
  }
</script>

<style scoped lang="scss">
  .user-data {
    margin-top: 1.85rem;
  }

  .user-data-form {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .user-data__item {
    flex-basis: calc((100% - (2.28rem * 3)) / 4);
    margin: .3rem 0px;
    position: relative;
  }

  @media screen and (max-width: 968px) {
    .user-data__item {
      flex-basis: calc((100% - 1rem) / 2);
      margin: .5rem 0px;
      position: relative;
    }
  }
  @media screen and (max-width: 580px) {
    .user-data__item {
      flex-basis: 100%;
      margin: .5rem 0px;
      position: relative;
    }
  }
  @media screen and (max-width: 420px) {
    .user-data {
      padding: 0px 10px;
    }
  }

  .user-data-change {
    width: 12.14rem;
    margin: 2.14rem auto 0;
  }
</style>