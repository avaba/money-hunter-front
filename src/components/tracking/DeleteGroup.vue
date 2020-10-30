<template>
  <Modal :title='`Группа "${title}"`' closable @next="deleteHandler">
    <template v-slot:default>

      <form action="" class="modal-form">
        <div class="modal-form-search">
          <div class="modal-form-search__not"><span>Уверены, что хотите удалить?</span>
          </div>
        </div>


        <div class="modal-form__double-submit modal-form__double-submit_save-project">
          <div class="modal-form__double-submit-item">
            <Btn label="Отмена" clazz="button_gray" @click="cancelHandler"/>
          </div>
          <div class="modal-form__double-submit-item">
            <Btn label="Удалить" @click="deleteHandler"/>
          </div>
        </div>
      </form>

    </template>
  </Modal>
</template>

<script>
  import Modal from "../Modal";
  import Btn from "../../shared-components/Btn";
  import {HIDE_MODAL_MUTATION} from "../../store/modules/modal/constants";
  import {DELETE_GROUP} from "@/store/modules/tracking/constants";

  export default {
    name: "DeleteGroup",
    components: {Btn, Modal},
    props: {
      title: {
        type: String,
        required: true,
      }
    },
    methods: {
      cancelHandler() {
        this.$store.commit(`modal/${HIDE_MODAL_MUTATION}`);
      },
      async deleteHandler() {
        const res = await this.$store.dispatch(`tracking/${DELETE_GROUP}`, this.title);

        if (res) {
          if (this.$isCurrentRouteEquals({name: 'tracking.group', params: {name: this.$route.params.name}})) {
            await this.$router.push({name: 'tracking.group_list'});
          }
          this.$store.commit(`modal/${HIDE_MODAL_MUTATION}`);
        }
      }
    }
  }
</script>

<style scoped>

</style>