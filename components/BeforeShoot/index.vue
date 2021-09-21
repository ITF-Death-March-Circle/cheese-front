<template>
  <section class='before-shoot'>
    <div class='text-center header-text m-8'>よおこそ！</div>
    <div class='text-center content-text m-2'>
      <p class='before-shoot__message m-2'>カメラへのアクセスを求められたら「許可」を選択して下さい！</p>
      <h1 class='before-shoot__title'>
        よき想い出の1枚を！！
      </h1>
    </div>
    <div class='flex justify-center m-4'>
      <nuxt-link to='shoot'>
        <CommonButton text='写真を撮りに行く' />
      </nuxt-link>
    </div>
  </section>
</template>

<style lang='scss' scoped>
.open-shoot-modal-button {
  background: $ui-yellow;
  border-radius: 16px;
  padding: 0.6rem 1.5rem;
  margin: 0 1rem;
  font-size: 1.5rem;
}

.button-container {
  margin: 0.3rem;
}

.header-text {
  font-size: 2rem;
  font-weight: bold;
  margin: 0.1rem;
}
</style>
