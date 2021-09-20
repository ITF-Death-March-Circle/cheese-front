<template>
  <div>
    <canvas ref="canvas" class="demo__canvas"></canvas>
    <nuxt-link to="shoot">
      <CommonButton text="再撮影" />
    </nuxt-link>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      resultImage: ""
    }
  },
  watch: {
    rewultImage() {
      console.log(this.resultImage);
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
          alert("受信完了")
        }).catch(err=>{
          console.log(err)
        })
    }
  }
}
</script>
