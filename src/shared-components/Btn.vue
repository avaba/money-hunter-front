<template>
  <button :class="`${defaultClass} ${_clazz}`" :type="type" @click="$emit('click', $event.target.value)">{{label}}
    <slot/>
  </button>
</template>

<script>
  export default {
    name: "Btn",
    props: {
      type: {
        type: String,
        default: 'button',
      },
      clazz: {
        value: [String, Object],
        default: '',
      },
      label: {
        type: String,
        default: '',
      },
      withoutDefaultClass: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      defaultClass() {
        return this.withoutDefaultClass ? '' : 'button';
      },
      _clazz() {
        if (typeof this.clazz === 'string') {
          return this.clazz;
        }

        return Object.keys(this.clazz).filter(key => this.clazz[key]).join(' ');
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";

  button {
    cursor: pointer;
  }

  .button {
    background: $yellow;
    height: 2.85rem;
    border-radius: 4px;
    width: 100%;
    font-weight: bold;
    color: black;
    letter-spacing: .2px;
    padding: 0 .92rem;

    &.button_gray {
      background: $drayDevider;
    }

    &.button_empty {
      border: 1px solid $drayDevider;
      background: white;
    }

    &.button_align-left {
      text-align: left;
    }
  }

  .button__change {
    background: url("../assets/img/ikons/edit.svg") no-repeat, $yellow;
    background-position: calc(100% - 2.5rem) center;
    padding-right: 1.14rem;
  }

  .button_add {
    background: url("../assets/img/ikons/plus3.svg") no-repeat, $yellow;
    background-position: calc(100% - .78rem) center;
    text-align: left;
    padding-left: 1rem;
  }

  .button_save {
    background: url("../assets/img/ikons/search2.svg") no-repeat, $yellow;
    background-position: 2.85rem center;
    padding-left: 2.2rem;
  }

  .button_check {
    background: url("../assets/img/ikons/check.svg") no-repeat, $yellow;
    background-position: calc(100% - .64rem) center;
  }
</style>