<template>
  <Modal title='Обучение' closable>
    <template v-slot:logo><span/></template>
    <template v-slot:default>

      <form action="" class="modal-form">
        <div class="modal-form__links">
          <a href="https://ya.ru" target="_blank">На ya.ru</a>
          <a href="https://google.com" target="_blank">На google.com</a>
        </div>
      </form>

    </template>
  </Modal>
</template>

<script>
  import Modal from "./Modal";
  export default {
    name: "TrainingModal",
    components: {Modal}
  }
</script>

<style scoped>

</style>