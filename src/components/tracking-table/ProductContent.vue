<template>
  <div class="tracking-table__product">
    <div class="tracking-table__product-photo">
      <template v-if="imagePath">
        <a :href="link" target="_blank" v-if="link && link!=='None'">
          <AsyncImg :src="imagePath" v-if="imagePath" class="tracking-table__product-photo-img"/>
        </a>
        <AsyncImg :src="imagePath" v-else class="tracking-table__product-photo-img"/>
      </template>
    </div>
    <div class="tracking-table__product-info">
      <div class="tracking-table__product-name">{{goodsName}} - {{brand}}</div>
      <div class="tracking-table__product-see" v-if="link && link!=='None'">
        <a :href="link" target="_blank">Посмотреть на Wildberries</a>
      </div>
    </div>
  </div>
</template>

<script>
  import AsyncImg from "@/shared-components/AsyncImg";

  import {BlackboxService} from "@/services/blackbox_service";

  export default {
    name: "ProductContent",
    components: {AsyncImg},
    props: {
      brand: {
        type: String
      },
      articul: {
        type: String
      },
      link: {
        type: String,
        default: null,
      },
      imagePath: {
        type: String,
        default: null
      },
      goodsName: {
        type: String,
        default: null
      }
    },
    // data() {
    //   return {
    //     imagePath: null,
    //     goodsName: null,
    //   }
    // },
    // created() {
    //   this.loadPath();
    // },
    // methods: {
    //   async loadPath() {
    //     const service = new BlackboxService();
    //     const data = await service.getProductImagePathAndName(this.articul);
    //     if (typeof data === 'object') {
    //       this.imagePath = data.imageLink;
    //       this.goodsName = data.name;
    //     }
    //   }
    // },
    // watch: {
    //   articul: async function () {
    //     this.loadPath()
    //   }
    // }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/scss/variables";

  .tracking-table__product {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .tracking-table__product-photo {
    margin-right: 1.42rem;
  }

  /deep/ .tracking-table__product-photo-img {
    width: 44px;
    height: 44px;
    object-fit: cover;
  }

  .tracking-table__product-info {
    text-align: left;
  }

  .tracking-table__product-name {
    letter-spacing: .2px;
  }

  .tracking-table__product-see {
    font-size: .85rem;
    color: $titleColor;
    letter-spacing: .2px;
    margin-top: 3px;
  }
</style>