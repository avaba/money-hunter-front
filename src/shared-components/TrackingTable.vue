<template>
  <div class="tracking-table-wrapper">
    <table class="tracking-table tracking-table_sticky">
      <tr class="tracking-table__header">
        <th v-for="item in headers" :key="item.name" class="tracking-table__header-item" :class="item.clazz || ''">
          <div>
            <span>{{item.label}}</span>
            <Btn v-if="item.sortable || item.sortable===undefined"
                 without-default-class
                 clazz="tracking-table__sort tracking-table__sort_down"/>
          </div>
        </th>
      </tr>
    </table>
    <table class="tracking-table">
      <TrackingTableRow nested/>
      <TrackingTableRow nested/>
    </table>
  </div>
</template>

<script>
  import Btn from "@/shared-components/Btn";
  import TrackingTableRow from "@/shared-components/TrackingTableRow";

  export default {
    name: "TrackingTable",
    components: {TrackingTableRow, Btn},
    data() {
      return {
        headers: [
          {name: 'goods', label: 'Товар', clazz: 'width30', sortable: false},
          {name: 'price', label: 'Цена', clazz: 'tracking-table__header-item_align-center width10'},
          {name: 'rating', label: 'Рейтинг', clazz: 'tracking-table__header-item_align-center'},
          {name: 'available_count', label: 'Доступно к заказу'},
          {name: 'ordered_today_count', label: 'Заказы Сегодня'},
          {name: 'ordered_yesterday_count', label: 'Заказы Вчера'},
          {name: 'ordered_week_count', label: 'Заказы Неделя'},
          {name: 'ordered_month_count', label: 'Заказы Месяц'},
          {name: 'actions', label: 'Действия', sortable: false},
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";

  .width30 {
    width: 30%;
  }

  .width10 {
    width: 10%;
  }

  .tracking-table-wrapper {
  }

  .tracking-table {
    width: 100%;
    border-spacing: 0;

    &.tracking-table_sticky {
      position: sticky;
      top: 0px;
      z-index: 2;
    }
  }

  .tracking-table__header {
    position: sticky;
    top: 0px;
  }

  .tracking-table__header-item {
    text-align: left;
    padding: 1.85rem 1.21rem;
    background: white;

    &.tracking-table__header-item_align-center {

      div {
        justify-content: center;
      }
    }

    &:first-child {
      padding-left: 1.64rem;
    }

    &:last-child {
      padding-right: .78rem;
    }

    div {
      display: flex;
      align-items: center;
    }

    span {
      color: $titleColor;
      letter-spacing: .2px;
      font-weight: 500;
    }
  }

  .tracking-table__sort {
    flex: 0 0 1.14rem;
    height: 1.14rem;
    margin-left: .42rem;

    &.tracking-table__sort_down {
      background: url("../assets/img/ikons/sort-down.svg") no-repeat;
    }

    &.tracking-table__sort_up {
      background: url("../assets/img/ikons/sort-up.svg") no-repeat;
    }
  }
</style>