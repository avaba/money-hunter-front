<template>
  <ul class="tracking-navlist">
    <li class="tracking-navlist__item"
        @click="navigateTo(item)"
        v-for="(item, idx) in list"
        :key="idx"
        :class="{'tracking-navlist__item_active':  isActive(item) , 'tracking-navlist__item_actions': item.actions}">
      <span>{{item.label}}</span>
      <template v-if="item.actions">
        <button class="tracking-navlist-trigger" @click.stop="$event=>showActions($event, idx)"/>
        <div class="tracking-navlist-actions" ref="actionsBlock">
          <div class="tracking-navlist-actions__item tracking-navlist-actions__item_change"
               @click.stop="handleChangeAction(idx)">
            <span>изменить</span>
            <img src="../assets/img/ikons/change2.svg" alt="">
          </div>
          <div class="tracking-navlist-actions__item tracking-navlist-actions__item_delete"
               @click.stop="handleRemoveAction(idx)">
            <span>удалить</span>
            <img src="../assets/img/ikons/delete.svg" alt="">
          </div>
        </div>
      </template>
    </li>
  </ul>
</template>

<script>
  import {SHOW_MODAL_MUTATION} from "@/store/modules/modal/constants";
  import ChangeGroupName from "@/components/tracking/ChangeGroupName";
  import DeleteGroup from "@/components/tracking/DeleteGroup";

  export default {
    name: "TrackingNav",
    props: {
      list: {
        type: Array,
        required: true
      },
    },
    data() {
      return {
        openedActionBlock: null,
      }
    },
    methods: {
      isActive(item) {
        if (item.system) {
          return this.$route.name === 'tracking.group_list';
        }

        return this.$route.params.name === item.label
      },
      navigateTo(item) {
        if (item.system) {
          if (this.$route.name !== 'tracking.group_list') {
            this.$router.push({name: 'tracking.group_list'});
          }
        } else {
          if (!(this.$route.name === 'tracking.group' && this.$route.params.name === item.label)) {
            this.$router.push({name: 'tracking.group', params: {name: item.label}});
          }
        }
      },
      /**
       *
       * @param {MouseEvent} $event
       * @param {number} idx
       */
      showActions($event, idx) {
        this.openedActionBlock = this.$refs.actionsBlock[idx - 1];
        this.$refs.actionsBlock.forEach(this.hideActionBlock);

        this.openedActionBlock.style.top = ($event.clientY + 20) + 'px';
        this.openedActionBlock.style.left = ($event.clientX - 10) + 'px';
      },
      hideActionBlock(actionBlock = this.openedActionBlock) {
        if (actionBlock) {
          actionBlock.style.left = '-300px';
        }
      },
      handleChangeAction(idx) {
        this.$store.commit(`modal/${SHOW_MODAL_MUTATION}`, {
          component: ChangeGroupName,
          data: {title: this.list[idx].label}
        });

        this.hideActionBlock();
      },
      handleRemoveAction(idx) {
        this.$store.commit(`modal/${SHOW_MODAL_MUTATION}`, {
          component: DeleteGroup,
          data: {title: this.list[idx].label}
        });

        this.hideActionBlock();
      },
    },
    mounted() {
        this.$nextTick(() => {
          this.$refs.actionsBlock.forEach(this.hideActionBlock);
        })
        setTimeout(() => {
          this.$refs.actionsBlock.forEach(this.hideActionBlock);
        }, 1000);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.hideActionBlock);
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";

  .tracking-navlist {
    display: flex;
    flex: 1;
  }

  .tracking-navlist__item {
    cursor: pointer;
    flex: 1 0 auto;
    padding: 0.71rem 1.42rem;
    background: $drayDevider;
    border-radius: 4px 4px 0 0;
    border: 1px solid $drayDevider;
    border-bottom: none;
    margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /*position: relative;*/

    &.tracking-navlist__item_active {
      background: white;
      box-shadow: inset 0px 3px 0px $yellow;
    }

    &:last-child {
      margin-right: 0;
    }

    > span {
      text-transform: uppercase;
      font-size: .85rem;
      font-weight: 500;
      color: black;
    }
  }

  .tracking-navlist-trigger {
    width: 3px;
    height: 12px;
    background: url("../assets/img/ikons/navlist-action.svg") no-repeat right;
    padding-left: .85rem;
    cursor: pointer;
  }

  .tracking-navlist-actions {
    position: absolute;
    background: white;
    z-index: 3;
    width: 6.35rem;
    top: 30px;
    right: -20%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border: 1px solid $drayDevider;
  }

  .tracking-navlist-actions__item {
    padding: 0 .64rem 2px;
    border-bottom: 1px solid $drayDevider;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:last-child {
      border-bottom: none;
    }

    span {
      font-size: .85rem;
    }

    &.tracking-navlist-actions__item_delete {

      span {
        color: $red;
      }
    }
  }
</style>