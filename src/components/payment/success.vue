<template>
  <div class="payment-wrapper">
    <div class="card">
      <div class="form-ok">
        <p class="form-ok__message">Уважаемый покупатель!</p>
        <h1 class="form-ok__head">Платёж успешно совершён</h1>
        <h2 class="form-ok__desc">Купленная подписка активируется в течении 5 минут. Вы получите уведомление по электронной почте</h2>
        <div class="button btn-back" @click="backToService">Вернуться в сервис</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'payment-results-sucess',
  methods: {
    backToService() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  @import "../../assets/scss/media";
  .payment-wrapper {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .card {
    position: relative;
    border: 1px solid #c3d3e4;
    display: -moz-inline-stack;
    display: inline-block;
    zoom: 1;
    padding: 10px;
    font-family: $mainFont;
    color: $black;
    min-height: 400px;
    display: flex;
    align-items: center;
    background: #fff;
    max-width: 550px;
    text-align: center;
    width: 100%;
}
.form-ok {
    background: url("../../assets/img/payment-ok.png") no-repeat center 0px;
    min-height: 370px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding-top: 40px;
    &__message {
      font-size: 22px;
      font-weight: 300;
      margin-top: auto;
    }
    &__head {
      margin-top: 0px;
      font-size: 36px;
      font-weight: 300;

    }
    &__desc {
      margin-top: 0px;
      font-size: 14px;
      line-height: 1;
      max-width: 400px;
      margin: 10px auto 0px auto;
      color: $gray;
      font-weight: 500;
    }
    & .btn-back {
      background: $yellow;
      height: 2.85rem;
      border-radius: 4px;
      width: 100%;
      font-weight: bold;
      color: black;
      letter-spacing: .2px;
      padding: 0 .92rem;
      max-width: 170px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: auto;
      user-select: none;
      cursor: pointer;
    }
}
</style>