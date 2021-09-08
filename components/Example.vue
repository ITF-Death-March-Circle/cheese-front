<template>
<div>
  <div class="example">
    <ul class="example__list">
      <li class="example__item">
        <img src="~/assets/image/36b2e96791f5c36875bfcbc2e922745f.png" alt="ぺんぎんちゃん">
        <p>ぺんぎんちゃん</p>
      </li>
      <li class="example__item">
        <img src="~/assets/image/00000422.png" alt="ぺんぎんさん">
        <p>ぺんぎんさん</p>
      </li>
      <li class="example__item">
        <img src="~/assets/image/illustkun-04058-penguin.png" alt="ぺんぎんくん">
        <p>ぺんぎんくん</p>
      </li>
    </ul>
    <img src="~/assets/image/Penguin.png" alt="penguin" class="penguin">
  </div>
  <div class="example">
    <ul class="example__list">
      <li class="example__item">
        <img src="~/assets/image/36b2e96791f5c36875bfcbc2e922745f.png" alt="ぺんぎんちゃん">
        <p>ぺんぎんちゃん</p>
      </li>
      <li class="example__item">
        <img src="~/assets/image/00000422.png" alt="ぺんぎんさん">
        <p>ぺんぎんさん</p>
      </li>
      <li class="example__item">
        <img src="~/assets/image/illustkun-04058-penguin.png" alt="ぺんぎんくん">
        <p>ぺんぎんくん</p>
      </li>
    </ul>
    <img src="~/assets/image/Penguin.png" alt="penguin" class="penguin">
  </div>
  <div class="example">
    <ul class="example__list">
      <li class="example__item">
        <img src="~/assets/image/36b2e96791f5c36875bfcbc2e922745f.png" alt="ぺんぎんちゃん">
        <p>ぺんぎんちゃん</p>
      </li>
      <li class="example__item">
        <img src="~/assets/image/00000422.png" alt="ぺんぎんさん">
        <p>ぺんぎんさん</p>
      </li>
      <li class="example__item">
        <img src="~/assets/image/illustkun-04058-penguin.png" alt="ぺんぎんくん">
        <p>ぺんぎんくん</p>
      </li>
    </ul>
    <img src="~/assets/image/Penguin.png" alt="penguin" class="penguin">
  </div>
</div>
</template>

<style lang="scss" scoped>
.example {
  width: 100%;
  background: rgb(37, 53, 77);
  position: relative;
  z-index: -2;

  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;

    @include mq(sm) {
      justify-content: center;
      flex-direction: row;
    }
  }

  &__item {
    color: white;
    text-align: center;

    img {
      width: 200px;
    }
  }

  .penguin {
    position: absolute;
    top: 250px;
    right: 0;
    transform: rotate(-90deg);
    z-index: -1;

    @include mq(sm) {
      top: 50px;
    }
  }
}
</style>
