<template>
  <Fragment>
    <div class="promo">
      <div class="promo-info">
        <img src="../assets/img/promo.svg" alt="">
        <img src="../assets/img/promo_logo.svg" alt="" class="promo__logo">
        <p class="promo__text">© Moneyhunter, 2020. info@moneyhunter.pro</p>
      </div>
      <div class="promo-right">
        <div class="modal-title">{{title}}</div>
        <div class="modal-subtitle" v-if="withSubtitle">
          На данный момент сервис находится в режиме бета-тестирования. Оставьте контакты в форме ниже, и мы свяжемся с
          вами сразу же как только запустимся.
        </div>
        <router-view/>
      </div>
    </div>
  </Fragment>
</template>

<style lang="scss" scoped>
  /deep/ form {
    margin-left: 0;
    margin-right: 0
  }

  .promo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
    padding-bottom: 65px;
  }

  .promo-info {
    width: 380px;
    text-align: center;

    img {
      margin-left: auto;
      margin-right: auto;
    }
  }

  .promo__logo {
    margin-top: 42px;
  }

  .promo__text {
    color: #9C9C9C;
    letter-spacing: .2px;
    font-size: .85rem;
    margin-top: 25px;
  }

  .promo-right {
    background: white;
    padding: 58px 26px 52px;
    border-radius: 4px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.04);
    margin-left: 88px;
    width: 385px;
  }
</style>

<script>
  import {Fragment} from 'vue-fragment';

  export default {
    name: "Auth",
    components: {Fragment},
    computed: {
      title() {
        return this.$route.meta?.title
      },
      withSubtitle() {
        return this.$route.meta?.withSubtitle
      }
    }
  };
</script>