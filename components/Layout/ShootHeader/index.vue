<template>
  <div class="shoot-header">
    <h1 class="shoot-header__title">
      撮影する
    </h1>
    <div class="shoot-header__close-button">
      <nuxt-link to="beforeshoot">
        <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path
            d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
          />
        </svg>
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shoot-header {
  background: $ui-yellow;
  position: fixed;
  width: 100%;
  color: $font-main;
  height: 56px;

  &__title {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 56px;
    width: 100%;
  }

  &__close-button {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 56px;
    width: 100%;
    padding-right: 20px;
  }
}
</style>
