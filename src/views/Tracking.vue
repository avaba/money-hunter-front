<template>
  <div class="tracking block_container">
    <div class="tracking-navigation">
      <div class="tracking-navigation-wrapper">
        <TrackingNav
          :list="trackingList"
        />
      </div>
      <Btn clazz="tracking-add-category" @click="handleCreateGroupBtn"/>
    </div>

    <router-view/>
  </div>
</template>

<script>
  import TrackingNav from "@/components/TrackingNav";
  import Btn from "@/shared-components/Btn";
  import {SHOW_MODAL_MUTATION} from "@/store/modules/modal/constants";
  import CreateGroup from "@/components/tracking/CreateGroup";

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
    },
    methods: {
      handleCreateGroupBtn(){
        this.$store.commit(`modal/${SHOW_MODAL_MUTATION}`, {component: CreateGroup});
      },
      prevHandler(){
        console.log('prev clicked')
      },
      nextHandler(){
        console.log('next clicked')
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
</style>