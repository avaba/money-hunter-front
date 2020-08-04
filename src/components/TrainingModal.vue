<template>
  <Modal title='Обучение' closable>
    <template v-slot:default>

      <form action="" class="modal-form">
        <div class="modal-form__links">
          <a href="https://ya.ru" target="_blank" @click="handleTrainingLink('Статья')">На ya.ru</a>
          <a href="https://google.com" target="_blank" @click="handleTrainingLink('Видео')">На google.com</a>
        </div>
      </form>

    </template>
  </Modal>
</template>

<script>
  import Modal from "./Modal";
  import {AmplitudeService} from "@/services/amplitude_service";

  export default {
    name: "TrainingModal",
    components: {Modal},
    methods: {
      handleTrainingLink(type) {
        AmplitudeService.tutorial(String(this.$route.name), type)
      }
    }
  }
</script>

<style scoped>

</style>