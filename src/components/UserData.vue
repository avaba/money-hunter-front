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
                        :mask="{mask: '8 (999) 999-99-99'}"
                        :error="$getValidationError(errors)"/>
          </ValidationProvider>
        </div>
        <div class="user-data__item">
          <InputField label="Ваш тариф" :value="subscriptionType" disabled/>
        </div>
      </form>

      <div class="user-data-change">
        <Btn label="Изменить" clazz="button__change" @click="handleSubmit(postUser)"/>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
  import InputField from "../shared-components/InputField";
  import Btn from "../shared-components/Btn";
  import {ValidationObserver, ValidationProvider} from 'vee-validate';
  import {POST_USER_ACTION, SET_USER_MUTATION} from "@/store/modules/user/constants";

  export default {
    name: "UserData",
    components: {InputField, Btn, ValidationObserver, ValidationProvider},
    mounted() {
      this.userName = 'some val'
    },
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
      subscriptionType(){
        return this.$store.state.user.subscription?.subscriptionType;
      }
    },
    methods: {
      postUser() {
        this.$store.dispatch(`user/${POST_USER_ACTION}`);
      },
      setUserData(type, value) {
        const payload = {...this.user};

        payload[type] = value;

        this.$store.commit(`user/${SET_USER_MUTATION}`, payload);
      }
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
  }

  .user-data__item {
    flex-basis: calc((100% - (2.28rem * 3)) / 4);
  }

  .user-data-change {
    width: 12.14rem;
    margin: 2.14rem auto 0;
  }
</style>