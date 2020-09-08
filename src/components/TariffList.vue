<template>
  <div class="tarifes block_container">
    <Tariff
      v-for="item in tariffs"
      :key="item.name"
      :price="item.price"
      :clazz="item.clazz"
      :name="item.name"
      :list="item.list"
      :is-buyable="item.name!=='Free'"
    />
  </div>
</template>

<script>
  import Tariff from "./Tariff";

  export default {
    name: "TariffList",
    components: {Tariff},
    data() {
      return {
        tariffs: [
          {
            name: "Free",
            price: 0,
            clazz: "tarif__item_fourth",
            list: [
              {text: "Максимум 5 товаров на отслеживании", success: true},
              {text: "Добавление оповещений", success: true},
              {text: "Полный функционал бота Telegram", error: true},
              {text: "Аналитика по товарам", error: true},
              {text: "Скачивание отчётов", error: false},
              {text: "Автоподсорт", error: true},
              {text: "Анализ категорий", error: true},
              {text: "Запрос истории товаров", error: true}
            ]
          },
          {
            name: "BASIC",
            price: 3999,
            clazz: "tarif__item_fourth",
            list: [
              {text: "Максимум 5 товаров на отслеживании", success: true},
              {text: "Добавление оповещений", success: true},
              {text: "Полный функционал бота Telegram", success: true},
              {text: "Аналитика по товарам", success: true},
              {text: "Скачивание отчётов", success: true},
              {text: "Автоподсорт", error: true},
              {text: "Анализ категорий", error: true},
              {text: "Запрос истории товаров", error: true}
            ]
          },
          // {
          //   name: "CUSTOM",
          //   price: 4999,
          //   clazz: "tarif__item_fourth",
          //   list: [
          //     {text: "Максимум 5 товаров на отслеживании", success: true},
          //     {text: "Добавление оповещений", custom: true},
          //     {text: "Полный функционал бота Telegram", success: true},
          //     {text: "Аналитика по товарам", custom: true},
          //     {text: "Скачивание отчётов", success: true},
          //     {text: "Автоподсорт", custom: true},
          //     {text: "Анализ категорий", error: true},
          //     {text: "Запрос истории товаров", error: true}
          //   ]
          // },
          // {
          //   name: "PRO",
          //   price: 7999,
          //   clazz: "tarif__item_fourth",
          //   list: [
          //     {text: "Максимум 5 товаров на отслеживании", success: true},
          //     {text: "Добавление оповещений", success: true},
          //     {text: "Полный функционал бота Telegram", success: true},
          //     {text: "Аналитика по товарам", success: true},
          //     {text: "Скачивание отчётов", success: true},
          //     {text: "Автоподсорт", success: true},
          //     {text: "Анализ категорий", success: true},
          //     {text: "Запрос истории товаров", success: true}
          //   ]
          // },
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  .tarifes {
    margin-top: 2.5rem;
    display: flex;
    justify-content: flex-start;
  }
</style>