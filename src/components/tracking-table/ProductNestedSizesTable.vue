<template>
  <div>
    <table class="tracking-table-dropdown__table">
      <tr class="tracking-table-dropdown__header">
        <th class="tracking-table-dropdown__header-item">Размер</th>
        <th class="tracking-table-dropdown__header-item">Остаток</th>
      </tr>
      <tr class="tracking-table-dropdown__row">
        <td class="tracking-table-dropdown__cell">52</td>
        <td class="tracking-table-dropdown__cell">0</td>
      </tr>
      <tr class="tracking-table-dropdown__row">
        <td class="tracking-table-dropdown__cell">54</td>
        <td class="tracking-table-dropdown__cell">0</td>
      </tr>
      <tr class="tracking-table-dropdown__row">
        <td class="tracking-table-dropdown__cell">50</td>
        <td class="tracking-table-dropdown__cell">0</td>
      </tr>
      <tr class="tracking-table-dropdown__row">
        <td class="tracking-table-dropdown__cell">48</td>
        <td class="tracking-table-dropdown__cell">0</td>
      </tr>
      <tr class="tracking-table-dropdown__row">
        <td class="tracking-table-dropdown__cell">46</td>
        <td class="tracking-table-dropdown__cell">0</td>
      </tr>
    </table>

    <table class="tracking-table-dropdown__table">
      <tr class="tracking-table-dropdown__header">
        <td class="tracking-table-dropdown__header-item tracking-table-dropdown__cell_strong">Цена</td>
        <td class="tracking-table-dropdown__header-item">1080 ₽</td>
      </tr>
      <tr class="tracking-table-dropdown__row">
        <td class="tracking-table-dropdown__cell tracking-table-dropdown__cell_strong">Цена со скидкой</td>
        <td class="tracking-table-dropdown__cell">853 ₽</td>
      </tr>
      <tr class="tracking-table-dropdown__row">
        <td class="tracking-table-dropdown__cell tracking-table-dropdown__cell_strong tracking-table-dropdown__cell_border">
          Всего отзывов
        </td>
        <td class="tracking-table-dropdown__cell tracking-table-dropdown__cell_border">5</td>
      </tr>
      <tr class="tracking-table-dropdown__row">
        <td class="tracking-table-dropdown__cell">
          <ProductRating :rating="5" :total-amount="5"/>
        </td>
        <td class="tracking-table-dropdown__cell">4</td>
      </tr>
      <tr class="tracking-table-dropdown__row">
        <td class="tracking-table-dropdown__cell">
          <ProductRating :rating="4" :total-amount="5"/>
        </td>
        <td class="tracking-table-dropdown__cell">1</td>
      </tr>
      <tr class="tracking-table-dropdown__row">
        <td class="tracking-table-dropdown__cell">
          <ProductRating :rating="3" :total-amount="5"/>
        </td>
        <td class="tracking-table-dropdown__cell">0</td>
      </tr>
      <tr class="tracking-table-dropdown__row">
        <td class="tracking-table-dropdown__cell">
          <ProductRating :rating="2" :total-amount="5"/>
        </td>
        <td class="tracking-table-dropdown__cell">0</td>
      </tr>
      <tr class="tracking-table-dropdown__row">
        <td class="tracking-table-dropdown__cell">
          <ProductRating :rating="1" :total-amount="5"/>
        </td>
        <td class="tracking-table-dropdown__cell">0</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import ProductRating from "@/components/tracking-table/ProductRating";

  export default {
    name: "ProductNestedSizesTable",
    components: {ProductRating}
  }
</script>

<style scoped lang="scss">
  @import "../../assets/scss/variables";

  table {
    border-spacing: 0;
  }

  .tracking-table-dropdown__table {
    border: 1px solid $iconColor;
    margin-right: 3.57rem;
  }

  .tracking-table-dropdown__header-item,
  .tracking-table-dropdown__cell {
    padding: 0 1rem;
    line-height: 2.14rem;
    letter-spacing: .2px;

    &:first-child {
      border-right: 1px solid $iconColor;
    }
  }

  .tracking-table-dropdown__header-item {
    background: rgba(197, 199, 205, 0.3);
  }

  .tracking-table-dropdown__row {

    &:nth-child(odd) {

      .tracking-table-dropdown__cell {
        background: rgba(197, 199, 205, 0.3);
      }
    }
  }

  .tracking-table-dropdown__cell_strong {
    font-weight: 500;
  }

  .tracking-table-dropdown__cell_border {
    border-top: 1px solid $iconColor;
  }
</style>