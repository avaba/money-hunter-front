<template>
  <div 
    :style="`
      max-width: ${maxWidth};
      border-radius: ${borderRadius};
      border-color: ${borderColor}
    `"
    class="progressBar">
    <span 
      :style="`
        background: ${fillColor};
        border-radius: ${borderRadius};
        height: ${height};
        width: ${progressData}%;
      `"
      class="filled"
    ></span>
    <span 
    :style="`
      font-size: ${fontSize};
      color: ${fontColor};
      font-weight: ${fontWeight}
    `"
    class="text"
    v-if="fontSize">
      {{ text }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'progressBar',
  data: () => ({
    progressData: 0,
  }),
  props: {
    fillColor: {
      type: String,
      default: '#FFC700'
    },
    maxWidth: {
      type: String,
      default: '400px'
    },
    progress: {
      type: Number,
      default: 0,
      required: true
    },
    borderRadius: {
      type: String,
      default: '12px'
    },
    borderColor: {
      type: String,
      default: '#DFE0EB'
    },
    height: {
      type: String,
      default: '15px'
    },
    fontSize: {
      type: String,
      default: '12px'
    },
    fontColor: {
      type: String,
      default: '#000'
    }, 
    fontWeight: {
      type: String,
      default: '500'
    }, 
    text: {
      type: [String, Boolean],
      default: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.progressData = this.progress
    }, 1);
  },
  watch: {
    progress: function () {
      this.progressData = this.progress
    }
  }
}
</script>

<style lang="scss">
  .progressBar {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 3px 5px;
    width: 100%;
    border: 1px solid transparent;
    position: relative;
    overflow: hidden;
    & .filled {
      display: block;
      transition-duration: .1s;
      transition-timing-function: ease-in-out;
      min-width: 20px;
    }
    & .text {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      text-align: center;
      user-select: none;
    }
  }
</style>