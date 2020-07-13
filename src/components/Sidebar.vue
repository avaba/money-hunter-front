<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <img src="../assets/img/logo.svg" alt="">
      <div class="sidebar-header__company-name">MoneyHunter</div>
    </div>
    <div class="sidebar-navigation">
      <nav>
        <ul>
          <li class="sidebar-navigation-item"
              :class="{'sidebar-navigation-item_active': isActive(item.systemName)}"
              v-for="item in links"
              @click="$router.push(item.systemName)"
              :key="item.name">
            <span class="sidebar-navigation-item__text">{{item.name}}</span>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Sidebar",
    data() {
      return {
        links: [
          {name: 'Отслеживание', systemName: 'tracking'},
          {name: 'BlackBox', systemName: 'blackbox'},
          {name: 'Профиль', systemName: 'profile'},
        ]
      }
    },
    methods: {
      isActive(name) {
        return this.$route.matched.find(item => item.name === name) !== undefined
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";

  .sidebar {
    background-color: $black;
    width: 5.71rem;
    position: fixed;
    z-index: 99;
    top: 0px;
    left: 0px;
    height: 100%;
    transition: all ease-in .2s;
    overflow: hidden;

    &:hover {
      width: 18.21rem;

      .sidebar-header__company-name {
        opacity: 1;
      }

      .sidebar-navigation-item__text {
        opacity: 1;
      }
    }
  }

  .sidebar-header {
    padding: 2.28em 2.14rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(223, 224, 235, .06);
  }

  .sidebar-header__company-name {
    margin-left: .78rem;
    color: $gray;
    opacity: .7;
    font-size: 1.42rem;
    font-weight: bold;
    letter-spacing: .4px;
    opacity: 0;
    transition: all ease-in .2s;
  }

  .sidebar-navigation {
    padding-bottom: 1.42rem;
    border-bottom: 1px solid rgba(223, 224, 235, .06);
  }

  .sidebar-navigation-item {
    padding: 1.42rem 2.28rem 1.42rem 5.14rem;
    font-size: 1.14rem;
    letter-spacing: .2px;
    color: $gray;
    cursor: pointer;

    &.sidebar-navigation-item_active {
      background-color: rgba(159, 162, 180, .08);
      color: $yellow;
      border-left: 3px solid $yellow;
    }

    &:nth-child(1) {
      background: url("../assets/img/ikons/nav-ikon_1.svg") no-repeat;
      background-position: 2.28rem center;

      &.sidebar-navigation-item_active {
        background: url("../assets/img/ikons/nav-ikon_1_active.svg") no-repeat, rgba(159, 162, 180, .08);
        background-position: calc(2.28rem - 3px) center;
      }
    }

    &:nth-child(2) {
      background: url("../assets/img/ikons/nav-ikon_2.svg") no-repeat;
      background-position: 2.28rem center;

      &.sidebar-navigation-item_active {
        background: url("../assets/img/ikons/nav-ikon_2_active.svg") no-repeat, rgba(159, 162, 180, .08);
        background-position: calc(2.28rem - 3px) center;
      }
    }

    &:nth-child(3) {
      background: url("../assets/img/ikons/nav-ikon_3.svg") no-repeat;
      background-position: 2.28rem center;

      &.sidebar-navigation-item_active {
        background: url("../assets/img/ikons/nav-ikon_3_active.svg") no-repeat, rgba(159, 162, 180, .08);
        background-position: calc(2.28rem - 3px) center;
      }
    }
  }

  .sidebar-navigation-item__text {
    opacity: 0;
    transition: all ease-in .2s;
  }
</style>