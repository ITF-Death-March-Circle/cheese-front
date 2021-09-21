<template>
  <div>
    <canvas ref="canvas" class="demo__canvas"></canvas>
    <nuxt-link to="shoot">
      <CommonButton text="再撮影" />
    </nuxt-link>
  </div>
</template>

<script lang="js">
export default {
  data() {
    return {
      resultImage: ""
    }
  },
  watch: {
    resultImage() {
      this.rendering()
    }
  },
  mounted() {
    this.download()
  },
  methods: {
    download() {
      this.$axios.$get("http://localhost/download")
        .then(res=>{
          console.log(res)
          this.resultImage = res.base64
        }).catch(err=>{
          console.log(err)
        })
    },
    rendering() {
      const canvas = this.$refs.canvas;
      canvas.width = window.innerWidth;
      canvas.height = (window.innerWidth * 3) / 4
      const ctx = canvas.getContext('2d');
      const subjectImg = new Image();
      subjectImg.onload = function(){
        ctx.drawImage(subjectImg, 0, 0, window.innerWidth, (window.innerWidth * 3) / 4);
      }
      subjectImg.src = this.resultImage;
    }
  }
}
</script>
