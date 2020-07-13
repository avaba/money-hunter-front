<template>
  <div class="user-data block_container">
    <form action="" class="user-data-form">
      <div class="user-data__item">
        <InputField label="Имя" value="Олег"/>
      </div>
      <div class="user-data__item">
        <InputField label="Фамилия" value="нету"/>
      </div>
      <div class="user-data__item">
        <InputField label="Телефонный номер" value="+375 (15) 786-45-67"/>
      </div>
      <div class="user-data__item">
        <InputField label="Ваш тариф" value="Базовый"/>
      </div>
    </form>
    <div class="user-data-change">
      <Btn label="Изменить" clazz="button__change"/>
    </div>
  </div>
</template>

<script>
  import InputField from "../shared-components/InputField";
  import Btn from "../shared-components/Btn";

  export default {
    name: "UserData",
    components: {InputField, Btn}
  }
</script>

<style scoped lang="scss">
  .user-data {
    margin-top: 1.85rem;
  }

  .user-data-form {
    display: flex;
    justify-content: space-between;
  }

  .user-data__item {
    flex-basis: calc((100% - (2.28rem * 3)) / 4);
  }

  .user-data-change {
    width: 12.14rem;
    margin: 2.14rem auto 0;
  }
</style>