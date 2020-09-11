<template>
  <header class="header block_container">
    <h1 class="page-title" v-text="header"/>
    <div class="header-right">
      <!-- <div class="education" @click="showTraining">
        <img src="../assets/img/ikons/education.svg" alt="">
        <span class="education__text">Обучение</span>
      </div> -->
      <div class="notifications" >
        <img src="../assets/img/ikons/notification.svg" alt="">
        <div class="notifications__circle"><span></span></div>
      </div>
      <!-- <div class="notifications-wrapper success">
          <p class="notifications-wrapper-text">Произошла ошибка</p>
        </div> -->
      <div class="user-name" @click="$router.push({name: 'profile'}).catch(()=>{})">
        <span class="user-name__text">{{email}}</span>
        <img src="../assets/img/ikons/logout.svg" alt="" @click="logout">
      </div>
    </div>
  </header>
</template>

<script>
  import {mapActions} from "vuex";
  import {SHOW_MODAL_MUTATION} from "@/store/modules/modal/constants";
  import TrainingModal from "@/components/TrainingModal";

  export default {
    name: "Header",
    props: {
      header: {
        type: String,
        default: 'Заголовок'
      }
    },
    computed: {
      email() {
        return this.$store.state.user.data?.email;
      }
    },
    methods: {
      ...mapActions('user', ['logout']),
      showTraining() {
        this.$store.commit(`modal/${SHOW_MODAL_MUTATION}`, {component: TrainingModal})
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";
  
  .notifications-wrapper {
    position: absolute;
    right: 200px;
    top: 50px;
    padding: 12px 24px;
    background: #fff;
    border-radius: 6px;
    z-index: 9999;
    &.success {
      border: 1px solid $green;
    }
    &.error {
      border: 1px solid $red;
    }
    &-text {
      user-select: none;
    }
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1.21rem;
  }

  .header-right {
    flex: 1 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .education {
    display: flex;
    align-items: center;
    margin-right: 2.28rem;
    cursor: pointer;
  }

  .education__text {
    margin-left: .42rem;
    color: black;
  }

  .notifications {
    position: relative;
    margin-right: 2.28rem;
  }

  .notifications__circle {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: $white;
    position: absolute;
    top: -4px;
    right: -4px;

    span {
      width: 6px;
      height: 6px;
      border-radius: 100%;
      background: $blue;
      display: block;
      margin: 2px 0 0 2px;
    }
  }

  .user-name {
    display: flex;
    align-items: center;
    border-left: 1px solid $drayDevider;
    cursor: pointer;

    img {
      cursor: pointer;
    }
  }

  .user-name__text {
    margin: 0 .85rem 0 1.85rem;
    padding: .57rem 0;
  }
</style>