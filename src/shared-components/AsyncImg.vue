<template>
  <img ref="image" alt/>
</template>

<script>
  export default {
    name: "AsyncImg",
    props: {
      src: {
        type: String,
        required: true
      }
    },
    methods: {
      loadImage() {
        const image = new Image;
        image.src = this.src;

        image.onload = () => {
          this.$refs.image.src = this.src;
        }
      }
    },
    created() {
      this.loadImage();
    },
    watch: {
      src: function () {
        this.loadImage();
      }
    }
  };
</script>

<style scoped>

</style>