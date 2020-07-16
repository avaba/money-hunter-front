<template>
  <div class="tracking-pagination" v-if="totalCount>0">
    <div class="tracking-pagination__amount">
      <span>Количество на странице:</span>
      <div class="tracking-pagination__count">{{perPage}}</div>
      <Btn without-default-class @click="perPagePopupOpened=!perPagePopupOpened">
        <img src="../assets/img/ikons/tracking-open.svg" alt="">
      </Btn>
      <div :class="{'tracking-pagination__dropdown_open': perPagePopupOpened, 'tracking-pagination__dropdown': true}">
        <ul class="tracking-pagination__dropdown-list">
          <li class="tracking-pagination__dropdown-item"
              @click="$perPageHandler(item)"
              v-for="(item, idx) in perPageValues"
              :key="idx">{{item}}
          </li>
        </ul>
      </div>
    </div>
    <div class="tracking-pagination__range">
      <div class="tracking-pagination__current">{{(page-1)*perPage + 1}}-{{page*perPage}} из</div>
      <div class="tracking-pagination__all">{{totalCount}}</div>
    </div>
    <div class="tracking-pagination__actions">
      <Btn without-default-class @click="$prevHandler">
        <img src="../assets/img/ikons/prev.svg" alt="">
      </Btn>
      <Btn without-default-class @click="$nextHandler">
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
      perPage: {
        type: Number,
        required: true,
      },
      page: {
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
      },
      perPageHandler: {
        type: Function,
        required: true,
      },
      perPageValues: {
        type: Array,
        default: () => [25, 50, 100],
      }
    },
    data() {
      return {
        perPagePopupOpened: false
      }
    },
    methods: {
      $perPageHandler(value) {
        this.perPagePopupOpened = false;
        this.perPageHandler(value);
      },
      $prevHandler() {
        if (this.page > 1) {
          this.prevHandler();
        }
      },
      $nextHandler() {
        if (this.page < (this.totalCount % this.perPage)) {
          this.nextHandler();
        }
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
    position: relative;

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

  .tracking-pagination__dropdown {
    position: absolute;
    width: 50px;
    padding: 10px 15px;
    background: #fff;
    top: 20px;
    right: -20px;
    border: 1px solid #dfe0eb;
    transition: all ease-in .1s;
    opacity: 0;
    z-index: -1;

    &.tracking-pagination__dropdown_open {
      top: 30px;
      opacity: 1;
      z-index: 10;
    }
  }

  ul {
    list-style: none;
  }

  .tracking-pagination__dropdown-item {
    margin-bottom: 5px;
    cursor: pointer;
  }
</style>