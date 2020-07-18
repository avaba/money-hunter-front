<template>
  <div class="tracking block_container">
    <div class="tracking-navigation">
      <div class="tracking-navigation-wrapper">
        <TrackingNav
          :list="trackingNavList"
        />
      </div>
      <Btn clazz="tracking-add-category" @click="handleCreateGroupBtn"/>
    </div>

    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
  import TrackingNav from "@/components/TrackingNav";
  import Btn from "@/shared-components/Btn";
  import {SHOW_MODAL_MUTATION} from "@/store/modules/modal/constants";
  import CreateGroup from "@/components/tracking/CreateGroup";
  import {GROUP_NAMES_GETTER, LOAD_GROUPS_ACTION} from "@/store/modules/tracking/constants";
  import {mapGetters} from "vuex";

  export default {
    name: "Tracking",
    components: {TrackingNav, Btn},
    computed: {
      ...mapGetters('tracking', [GROUP_NAMES_GETTER]),
      trackingNavList() {
        return [
          {label: "Список групп", system: true},
          ...this[GROUP_NAMES_GETTER].map(name => ({label: name}))
        ]
      }
    },
    methods: {
      handleCreateGroupBtn() {
        this.$store.commit(`modal/${SHOW_MODAL_MUTATION}`, {component: CreateGroup});
      },
    },
    mounted() {
      this.$store.dispatch(`tracking/${LOAD_GROUPS_ACTION}`);
    },
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