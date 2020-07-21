<template>
  <Fragment>
    <Btn clazz="action tracking-table__cell-action" without-default-class v-if="!isRecycle"/>
    <template v-else>
      <span @click="$event=>clickHandler($event, this.articul)">
        <svg width="22"
             height="19"
             viewBox="0 0 22 19"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
             class="action tracking-table__cell-action-recycle">
          <path d="M19.2774 11.875H8.08088L8.33086 13.0625H18.5829C19.1712 13.0625 19.6072 13.5932 19.4768 14.1505L19.2661 15.0514C19.98 15.3881 20.4722 16.0991 20.4722 16.9219C20.4722 18.0798 19.4975 19.0165 18.3019 18.9998C17.1628 18.9839 16.226 18.0857 16.1952 16.9793C16.1784 16.3749 16.4277 15.8271 16.837 15.4375H8.82964C9.22598 15.8147 9.47222 16.3402 9.47222 16.9219C9.47222 18.1024 8.459 19.0531 7.23136 18.9977C6.14129 18.9485 5.25475 18.0928 5.19746 17.034C5.15323 16.2163 5.59606 15.4956 6.26886 15.1197L3.58581 2.375H0.916667C0.410399 2.375 0 1.97626 0 1.48437V0.890625C0 0.39874 0.410399 0 0.916667 0H4.83271C5.26816 0 5.6435 0.297654 5.73077 0.712129L6.08086 2.375H21.083C21.6712 2.375 22.1072 2.9057 21.9768 3.46301L20.1713 11.1818C20.0764 11.5873 19.7054 11.875 19.2774 11.875ZM15.5833 6.23437H13.75V4.75C13.75 4.42206 13.4764 4.15625 13.1389 4.15625H12.5278C12.1903 4.15625 11.9167 4.42206 11.9167 4.75V6.23437H10.0833C9.74581 6.23437 9.47222 6.50019 9.47222 6.82812V7.42187C9.47222 7.74981 9.74581 8.01562 10.0833 8.01562H11.9167V9.5C11.9167 9.82793 12.1903 10.0937 12.5278 10.0937H13.1389C13.4764 10.0937 13.75 9.82793 13.75 9.5V8.01562H15.5833C15.9209 8.01562 16.1944 7.74981 16.1944 7.42187V6.82812C16.1944 6.50019 15.9209 6.23437 15.5833 6.23437Z"
                fill="red"/>
        </svg>
      </span>
    </template>
  </Fragment>
</template>

<script>
  import Btn from "../../shared-components/Btn";
  import {Fragment} from 'vue-fragment';

  export default {
    name: "ProductAction",
    components: {Btn, Fragment},
    props: {
      isRecycle: {
        type: Boolean,
        default: false
      },
      clickHandler: {
        type: Function,
        default: () => null
      },
      articul: {
        type: String,
        required: false,
      }
    }
  }
</script>

<style scoped lang="scss">
  .action {
    opacity: .5;
    z-index: 1;

    &.tracking-table__cell-action {
      width: 3px;
      height: 12px;
      background: url("../../assets/img/ikons/navlist-action.svg") no-repeat;
    }

    &.tracking-table__cell-action-recycle {
      width: 22px;
      height: 19px;
      cursor: pointer;
    }
  }

  span {

  }
</style>