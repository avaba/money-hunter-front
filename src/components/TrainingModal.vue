<template>
  <Modal title='Обучение' closable>
    <template v-slot:default>

      <form action="" class="modal-form">
        <!-- <div class="modal-form__links"> -->
          <!-- <a href="https://ya.ru" target="_blank" @click="handleTrainingLink('Статья')">На ya.ru</a>
          <a href="https://google.com" target="_blank" @click="handleTrainingLink('Видео')">На google.com</a> -->
          <iframe v-if="isShowGoodsSearch" width="100%" height="100%" src="https://www.youtube.com/embed/pRK9KHqLcgI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <iframe v-if="isShowGoodsFolowing" width="100%" height="100%" src="https://www.youtube.com/embed/i90wOf9a95k" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <!-- </div> -->
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
    },
    computed: {
      isShowGoodsSearch () {
        return this.$route.matched[0].path=== '/blackbox'
      },
      isShowGoodsFolowing () {
        return this.$route.matched[0].path=== '/tracking'
      }
    }
  }
</script>

<style scoped>
  .modal-form {
    margin-left: 10px;
    margin-right: 10px;
    overflow-y: auto;
  }

  .modal-form iframe {
    min-width: 560px;
    margin: 20px 0px;
    min-height: 315px;
    max-width: 100%;
  }

  @media screen and (max-width: 550px) {
    .modal-form  iframe {
      width: 95vw;
      height: calc(95vw * 9 / 16);
      min-width: 95vw;
      min-height: calc(95vw * 9 / 16);
      max-width: 95vw;
      max-height: calc(95vw * 9 / 16);
      margin: 10px auto;
    }
  }
</style>