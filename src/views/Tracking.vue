<template>
  <div class="tracking block_container">
    <div class="tracking-navigation">
      <div class="tracking-navigation-wrapper">
        <TrackingNav
          :list="trackingList"
        />
      </div>
      <Btn clazz="tracking-add-category"/>
    </div>

    <router-view/>

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
        <div class="tracking-pagination__all">1240</div>
      </div>
      <div class="tracking-pagination__actions">
        <Btn without-default-class>
          <img src="../assets/img/ikons/prev.svg" alt="">
        </Btn>
        <Btn without-default-class>
          <img src="../assets/img/ikons/next.svg" alt="">
        </Btn>
      </div>
    </div>
  </div>
</template>

<script>
  import TrackingNav from "@/components/TrackingNav";
  import Btn from "@/shared-components/Btn";

  export default {
    name: "Tracking",
    components: {TrackingNav, Btn},
    data() {
      return {
        trackingList: [
          {label: "Список групп", system: true},
          {label: "Спортивные костюмы"},
          {label: "Кросовки", actions: true, active: true},
          {label: "Носки"},
          {label: "кепки"},
          {label: "очки"},
          {label: "Сумочки"},
          {label: "трусы"},
          {label: "ремни"},
          {label: "пиджаки"},
          {label: "джинсы"},
          {label: "рубашки"},
        ],
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";

  .tracking {
    margin-top: 1.92rem;
  }

  .tracking-navigation {
    display: flex;
  }

  .tracking-navigation-wrapper {
    overflow: auto hidden;
  }

  .tracking-add-category {
    flex: 0 0 4.14rem;
    height: 4.14rem;
    background: url("../assets/img/ikons/plus2.svg") no-repeat center, $yellow;
    border-radius: 4px 4px 0 0;
  }

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