<template>
  <div class="select-field">
    <label for="" class="select-field__label">Выберите категории</label>
    <div class="categories">
      <ul class="categories__list">
        <li class="categories__item">
          <a href="" class="categories__link categories__link_open">
            Спортивные костюмы
          </a>
          <ul class="categories__sub-categories">
            <li class="categories__sub-categories-item">
              <label for=""><input type="checkbox"></label>
              <span>Спортивные костюмы</span>
            </li>
            <li class="categories__sub-categories-item">
              <label for=""><input type="checkbox"></label>
              <span>Спортивные костюмы</span>
            </li>
            <li class="categories__sub-categories-item">
              <label for=""><input type="checkbox"></label>
              <span>Спортивные костюмы</span>
            </li>
            <li class="categories__sub-categories-item">
              <label for=""><input type="checkbox"></label>
              <span>Спортивные костюмы</span>
            </li>
            <li class="categories__sub-categories-item">
              <label for=""><input type="checkbox"></label>
              <span>Спортивные костюмы</span>
            </li>
            <li class="categories__sub-categories-item">
              <label for=""><input type="checkbox"></label>
              <span>Спортивные костюмы</span>
            </li>
            <li class="categories__sub-categories-item">
              <label for=""><input type="checkbox"></label>
              <span>Спортивные костюмы</span>
            </li>
            <li class="categories__sub-categories-item">
              <label for=""><input type="checkbox"></label>
              <span>Спортивные костюмы</span>
            </li>
            <li class="categories__sub-categories-item">
              <label for=""><input type="checkbox"></label>
              <span>Спортивные костюмы</span>
            </li>
          </ul>
        </li>
        <li class="categories__item"><a href="" class="categories__link">Спортивные костюмы</a></li>
        <li class="categories__item"><a href="" class="categories__link">Спортивные костюмы</a></li>
        <li class="categories__item"><a href="" class="categories__link">Спортивные костюмы</a></li>
        <li class="categories__item"><a href="" class="categories__link">Спортивные костюмы</a></li>
        <li class="categories__item"><a href="" class="categories__link">Спортивные костюмы</a></li>
        <li class="categories__item"><a href="" class="categories__link">Спортивные костюмы</a></li>
        <li class="categories__item"><a href="" class="categories__link">Спортивные костюмы</a></li>
        <li class="categories__item"><a href="" class="categories__link">Спортивные костюмы</a></li>
        <li class="categories__item"><a href="" class="categories__link">Спортивные костюмы</a></li>
        <li class="categories__item"><a href="" class="categories__link">Спортивные костюмы</a></li>
        <li class="categories__item"><a href="" class="categories__link">Спортивные костюмы</a></li>
        <li class="categories__item"><a href="" class="categories__link">Спортивные костюмы</a></li>
        <li class="categories__item"><a href="" class="categories__link">Спортивные костюмы</a></li>
        <li class="categories__item"><a href="" class="categories__link">Спортивные костюмы</a></li>
        <li class="categories__item"><a href="" class="categories__link">Спортивные костюмы</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MultiSelect"
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";

  .select-field {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-content: center;
    flex-wrap: wrap;
  }

  .select-field__label {
    letter-spacing: .2px;
    color: $titleColor;
    font-weight: bold;
    display: block;
  }

  .categories {
    background: white;
    border-radius: 0 0 4px 4px;
    border: 1px solid $drayDevider;
    width: 240px;
    overflow: hidden;
  }

  .categories__link {
    padding: 8px 14px;
    display: block;
    background: url("../assets/img/ikons/categories-open.svg") no-repeat calc(100% - 12px) center;
    transition: all ease-in .2s;

    pointer-events: none;

    &:hover {
      background: url("../assets/img/ikons/categories-open.svg") no-repeat calc(100% - 12px) center, $yellow;
    }
  }

  .categories__link_open, .categories__link_open:hover {
    background: url("../assets/img/ikons/categories-close.svg") no-repeat calc(100% - 12px) center, $yellow;
  }

  .categories__sub-categories-item {
    cursor: pointer;
    padding: 7px 14px 7px 30px;
    transition: all ease-in .2s;
    display: flex;

    &:hover {
      background: #EFF6FD;

      span {
        color: $blue;
      }
    }

    label {
      display: flex;
      align-items: center;
    }

    input {
      margin-right: 10px;
    }

    span {
      color: #9FA2B4;
      letter-spacing: .2px;
      transition: all ease-in .2s;
    }
  }
</style>