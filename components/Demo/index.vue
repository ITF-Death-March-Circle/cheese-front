<template>
  <div>
    <canvas ref="canvas" class="demo__canvas"></canvas>
    <a ref="download" @click="download">帽子合成ダウンロード</a>
    <a ref="load" @click="load">ロード</a>
  </div>
</template>

<script lang="js">
import moment from 'moment';
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

    // 描画処理
    // const setImage = () => {
    //   ctx.drawImage(image[0] , 0, 0);
    //   ctx.drawImage(image[1] , 0, 0);
    // };

    //   // イメージオブジェクト作成 ＆ 画像読み込み待ち
    // const composePhoto = (imagePath) => {
    //   const im = imagePath.map(() => new Image());
    //   // im.forEach(e => (e.onload = (() => (im.every(e => e.complete) ? setImage() : null))));
    //   im.forEach((e, i) => (e.src = imagePath[i]));
    //   return im;
    // }
    // const image = composePhoto([this.subject, this.cap]);
    // setImage()
  },
  methods: {
    download() {
      const canvas = this.$refs.canvas;
      const a = this.$refs.download;
      // Base64文字列をhrefへセット
      a.href = canvas.toDataURL('image/jpeg', 0.85);
      // ダウンロード時のファイル名を指定
      const now = moment(new Date()).format('YYYY-MM-DD_hh-mm-ss');
      a.download = `${now}.jpg`;
    },
    load() {
      const canvas = this.$refs.canvas;
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;

      const ctx = canvas.getContext('2d');

      const subjectImg = new Image();
      subjectImg.onload = function(){
        ctx.drawImage(subjectImg, 0, 0, 200, 200);
      }
      subjectImg.src = this.subject;


      const capImg = new Image();
      capImg.onload = function(){
        ctx.drawImage(capImg, 0, 0, 200, 200);
      }
      capImg.src = this.cap;


    }
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
