<template>
  <Fragment>
    <table class="tracking-table-dropdown__table">
      <tr class="tracking-table-dropdown__header">
        <th class="tracking-table-dropdown__header-item">Размер</th>
        <th class="tracking-table-dropdown__header-item">Остаток</th>
      </tr>
      <tr class="tracking-table-dropdown__row" v-for="item in sortedSizes" :key="item.key">
        <td class="tracking-table-dropdown__cell">{{item.key}}</td>
        <td class="tracking-table-dropdown__cell">{{item.value}}</td>
      </tr>
    </table>

    <table class="tracking-table-dropdown__table">
      <tr class="tracking-table-dropdown__header">
        <td class="tracking-table-dropdown__header-item tracking-table-dropdown__cell_strong">Цена</td>
        <td class="tracking-table-dropdown__header-item">{{rating.noSalePrice}} ₽</td>
      </tr>
      <tr class="tracking-table-dropdown__row">
        <td class="tracking-table-dropdown__cell tracking-table-dropdown__cell_strong">Цена со скидкой</td>
        <td class="tracking-table-dropdown__cell">{{priceWithDiscount}} ₽</td>
      </tr>
      <tr class="tracking-table-dropdown__row">
        <td class="tracking-table-dropdown__cell tracking-table-dropdown__cell_strong tracking-table-dropdown__cell_border">
          Всего отзывов
        </td>
        <td class="tracking-table-dropdown__cell tracking-table-dropdown__cell_border">{{rating.feedBackCount}}</td>
      </tr>
      <tr class="tracking-table-dropdown__row">
        <td class="tracking-table-dropdown__cell">
          <ProductRating :rating="5" :total-amount="5"/>
        </td>
        <td class="tracking-table-dropdown__cell">{{rating.fiveStars}}</td>
      </tr>
      <tr class="tracking-table-dropdown__row">
        <td class="tracking-table-dropdown__cell">
          <ProductRating :rating="4" :total-amount="5"/>
        </td>
        <td class="tracking-table-dropdown__cell">{{rating.fourStars}}</td>
      </tr>
      <tr class="tracking-table-dropdown__row">
        <td class="tracking-table-dropdown__cell">
          <ProductRating :rating="3" :total-amount="5"/>
        </td>
        <td class="tracking-table-dropdown__cell">{{rating.threeStars}}</td>
      </tr>
      <tr class="tracking-table-dropdown__row">
        <td class="tracking-table-dropdown__cell">
          <ProductRating :rating="2" :total-amount="5"/>
        </td>
        <td class="tracking-table-dropdown__cell">{{rating.twoStars}}</td>
      </tr>
      <tr class="tracking-table-dropdown__row">
        <td class="tracking-table-dropdown__cell">
          <ProductRating :rating="1" :total-amount="5"/>
        </td>
        <td class="tracking-table-dropdown__cell">{{rating.oneStar}}</td>
      </tr>
    </table>

    <div>
      <ProductBlackboxNested :articul="articul"/>
    </div>
  </Fragment>
</template>

<script>
  import ProductRating from "@/components/tracking-table/ProductRating";
  import {Fragment} from 'vue-fragment';
  import ProductBlackboxNested from "@/components/tracking-table/ProductBlackboxNested";
  import {TrackingService} from "@/services/tracking_service";

  export default {
    name: "ProductNestedSizesTable",
    components: {ProductBlackboxNested, ProductRating, Fragment},
    props: {
      articul: {
        type: String,
        required: true
      },
      groupName: {
        type: String,
        required: true,
      },
      priceWithDiscount: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        rating: {},
        sizes: {},
      }
    },
    computed: {
      sortedSizes() {
        return Object.keys(this.sizes).map(key => ({key, value: this.sizes[key]})).sort((a, b) => b.key - a.key);
      }
    },
    methods: {
      async loadRatingAndSizes() {
        const service = new TrackingService();
        const data = await service.getRatingAndSizes(this.groupName, this.articul);

        this.rating = data.ratingBlock || {};
        this.sizes = data.sizesBlock || {};
      }
    },
    created() {
      this.loadRatingAndSizes();
    }
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