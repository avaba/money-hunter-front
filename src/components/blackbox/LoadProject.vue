<template>
  <Modal title="Загрузить проект" @next="saveHandler">
    <template v-slot:default>
      <form action="" class="modal-form" @submit.prevent>
        <div class="modal-form__download-project">
          <div class="modal-form__download-project-item" v-for="(item, idx) in positions" :key="idx">
            <Btn :label="item.name"
                 :clazz="{'button_align-left': true, 'button_empty':idx!==checked, 'button_check': idx===checked}"
                 @click="checked=idx"/>
          </div>
        </div>
        <div class="modal-form__double-submit modal-form__double-submit_save-project">
          <div class="modal-form__double-submit-item">
            <Btn label="Отмена" clazz="button_gray" @click="hideModal"/>
          </div>
          <div class="modal-form__double-submit-item">
            <Btn label="Загрузить" @click="saveHandler"/>
          </div>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script>
  import Modal from "../Modal";
  import {mapActions, mapMutations} from "vuex";
  import {HIDE_MODAL_MUTATION} from "../../store/modules/modal/constants";
  import Btn from "../../shared-components/Btn";
  import {BlackboxService} from "@/services/blackbox_service";
  import {FIND_SEARCH_ID_BY_NAME_ACTION} from "../../store/modules/blackbox/constants";


  export default {
    name: "LoadProject",
    components: {Btn, Modal},
    data() {
      return {
        checked: null,
        positions: []
      }
    },
    computed: {
      checkedPositionName() {
        return this.checked === null ? null : this.positions[this.checked].name;
      }
    },
    async created() {
      const blackboxService = new BlackboxService();
      const searches = await blackboxService.getSavedSearches();

      this.positions = [...searches.userSavedSearches];
    },
    methods: {
      async saveHandler() {
        if (this.checkedPositionName === null) {
          return;
        }

        const searchResult = await this[FIND_SEARCH_ID_BY_NAME_ACTION](this.checkedPositionName);
        if (searchResult) {
          this.$eventBus.$emit('find_search_id_data', searchResult);
        }

        this[HIDE_MODAL_MUTATION]();
      },
      ...mapMutations('modal', [HIDE_MODAL_MUTATION]),
      ...mapActions('blackbox', [FIND_SEARCH_ID_BY_NAME_ACTION])
    }
  }
</script>

<style scoped>

</style>