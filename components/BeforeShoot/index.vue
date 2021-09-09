<template>
  <section class="before-shoot">
    <h1 class="before-shoot__title">
      写真を撮影する！
    </h1>
    <div class="before-preview-image">
      <p class="before-preview-image__message">「撮影する」を押して記念写真用の写真を撮りましょう！
ポーズについて話し合いながらするといいかもしれませんね！</p>
      <p class="before-preview-image__sub-message">※背景は送信時に削除されます。</p>
    </div>
    <p class="before-shoot__message">カメラへのアクセスを求められたら「許可」を選択して下さい！</p>
    <nuxt-link to="shoot">
      <button class="open-shoot-modal-button">
        <p class="open-shoot-modal-button__text">
          撮影する
        </p>
        <font-awesome-icon :icon="['fas', 'camera']" class="ml-5"/>
      </button>
    </nuxt-link>
  </section>
</template>

<script lang="ts">
export default {

}
</script>

<style lang="scss" scoped>
.open-shoot-modal-button {
  display: flex;
  align-items: center;
  background: $ui-yellow ;
  border-radius: 50px;
  padding: 10px 20px;

}
</style>
