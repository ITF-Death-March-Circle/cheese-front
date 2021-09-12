<template>
  <div>
    <canvas ref="canvas" class="demo__canvas"></canvas>
  </div>
</template>

<script lang="js">
// 以下サイトを参考にVue風味に改良
// https://note.affi-sapo-sv.com/js-globalcompositeoperation.php
export default {
  props: {
    subjectPath: {
      type: String,
      default: "/image/selfy.png"
    },
    capPath: {
      type: String,
      default: "/image/image02.png"
    }
  },
  data() {
    return {
      subject: this.subjectPath,
      cap: this.capPath,
      canvasWidth: 500,
      canvasHeight: 700
    }
  },
  mounted() {
    const canvas = this.$refs.canvas;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;

    const ctx = canvas.getContext('2d');

    // 描画処理
    const setImage = () => {
      ctx.drawImage(image[0] , 0, 0);
      ctx.drawImage(image[1] , 0, 0);
    };

      // イメージオブジェクト作成 ＆ 画像読み込み待ち
    const composePhoto = (imagePath) => {
      const im = imagePath.map(() => new Image());
      im.forEach(e => (e.onload = (() => (im.every(e => e.complete) ? setImage() : null))));
      im.forEach((e, i) => (e.src = imagePath[i]));
      return im;
    }
    const image = composePhoto([this.subject, this.cap]);
  }
}
</script>

<style lang="scss" scoped>
.demo {
  &__canvas {
    max-width:100%
  }
}
</style>
