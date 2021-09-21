<template>
  <div>
    <div class='header-text text-center m-4'>出来上がった写真！</div>
    <canvas ref='canvas' class='m-4'></canvas>
    <div class='flex flex-row justify-center m-8'>
      <nuxt-link to='shoot'>
        <CommonButton class='open-shoot-modal-button' text='再撮影' />
      </nuxt-link>
      <button class='open-shoot-modal-button'>
        <a ref='download' @click='downloadPicture'>ダウンロードする</a>
      </button>
    </div>
  </div>
</template>

<script lang='js'>
/* eslint-disable no-console */
import moment from 'moment'

export default {
  data() {
    return {
      resultImage: ''
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
      this.$axios.$get('http://localhost/download')
        .then(res => {
          console.log(res)
          this.resultImage = res.base64
        }).catch(err => {
        console.log(err)
      })
    },
    downloadPicture() {
      const canvas = this.$refs.canvas
      const a = this.$refs.download
      // Base64文字列をhrefへセット
      a.href = canvas.toDataURL('image/jpeg', 1)
      // ダウンロード時のファイル名を指定
      const imageName = moment(new Date()).format('cheese-YYYY-MM-DD_hh-mm-ss')
      a.download = `${imageName}.jpg`
    },
    rendering() {
      const canvas = this.$refs.canvas
      canvas.width = window.innerWidth
      canvas.height = (window.innerWidth * 3) / 4
      const ctx = canvas.getContext('2d')
      const subjectImg = new Image()
      subjectImg.onload = function() {
        ctx.drawImage(subjectImg, 0, 0, window.innerWidth, (window.innerWidth * 3) / 4)
      }
      subjectImg.src = this.resultImage
    }
  }
}
</script>

<style lang='scss' scoped>
.open-shoot-modal-button {
  background: $ui-yellow;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin: 1rem;
  font-size: 1.5rem;
}

.header-text {
  font-size: 2rem;
  font-weight: bold;
}
</style>
