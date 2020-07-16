<template>
  <div class="tracking-pagination">
    <div class="tracking-pagination__amount">
      <span>Количество на странице:</span>
      <div class="tracking-pagination__count">25</div>
      <Btn without-default-class>
        <img src="../assets/img/ikons/tracking-open.svg" alt="">
      </Btn>
    </div>
    <div class="tracking-pagination__range">
      <div class="tracking-pagination__current">1-25 из</div>
      <div class="tracking-pagination__all">{{totalCount}}</div>
    </div>
    <div class="tracking-pagination__actions">
      <Btn without-default-class @click="prevHandler">
        <img src="../assets/img/ikons/prev.svg" alt="">
      </Btn>
      <Btn without-default-class @click="nextHandler">
        <img src="../assets/img/ikons/next.svg" alt="">
      </Btn>
    </div>
  </div>
</template>

<script>
  import Btn from "../shared-components/Btn";

  export default {
    name: "TrackingPagination",
    components: {Btn},
    props: {
      totalCount: {
        type: Number,
        required: true,
      },
      prevHandler: {
        type: Function,
        required: true,
      },
      nextHandler: {
        type: Function,
        required: true,
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";

  .tracking-pagination {
    background: white;
    padding: 1.64rem 2.28rem;
    border: 1px solid $drayDevider;
    border-top: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .tracking-pagination__amount {
    display: flex;
    align-items: center;
    margin-right: 3.35rem;

    span {
      letter-spacing: .3px;
      color: $titleColor;
    }
  }

  .tracking-pagination__count {
    margin: .5rem;
  }

  .tracking-pagination__range {
    display: flex;
    align-items: center;
    letter-spacing: .3px;
    color: $titleColor;
    margin-right: 1.71rem;
  }

  .tracking-pagination__current {
    margin-right: .3rem;
  }

  .tracking-pagination__actions {

    button {

      &:first-child {
        margin-right: .85rem;
      }
    }
  }
</style>