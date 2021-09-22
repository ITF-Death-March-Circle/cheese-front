<template>
  <div>
    <div class='header-text text-center m-4'>出来上がった写真！</div>
    <div class='flex flex-col justify-center frame m-4'>
      <canvas ref='canvas' class='py-2'></canvas>
      <p class='text-center'>出来上がった写真！</p>
    </div>
    <div class='flex flex-row justify-center'>
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
      const token = this.$config.VUE_APP_TOKEN || 'hogehoge'
      this.$axios.$get(`https://cheeseapi.azurewebsites.net/download_preview?token=${token}`)
        .then(res => {
          this.resultImage = res.base64
        }).catch(
        err => {
          console.log(err)
        }
      )
    },
    downloadPicture() {
      // const canvas = this.$refs.canvas
      const a = this.$refs.download
      // Base64文字列をhrefへセット
      // a.href = canvas.toDataURL('image/jpeg', 1)
      const token = this.$config.VUE_APP_TOKEN || 'hogehoge'
      a.href = `https://cheeseapi.azurewebsites.net/download?token=${token}`
      // ダウンロード時のファイル名を指定
      const imageName = moment(new Date()).format('cheese-YYYY-MM-DD_hh-mm-ss')
      a.download = `${imageName}.jpg`
    },
    rendering() {
      const canvas = this.$refs.canvas
      canvas.width = window.innerWidth * 0.8
      canvas.height = (window.innerWidth * 3 * 0.8) / 4
      const ctx = canvas.getContext('2d')
      const subjectImg = new Image()
      subjectImg.onload = function() {
        ctx.drawImage(subjectImg, 0, 0, window.innerWidth * 0.8, (window.innerWidth * 3 * 0.8) / 4)
      }
      subjectImg.src = this.resultImage
    }
  }
}
</script>

<style lang='scss' scoped>
.open-shoot-modal-button {
  background: $ui-yellow;
  border-radius: 4px;
  padding: 1rem 1.5rem;
  margin: 1rem;
}

.header-text {
  font-size: 1.5rem;
  width: auto;
  font-weight: bold;
}

.frame {
  padding: 0.5rem 1rem;
  color: #5d627b;
  background: #F7F8FB;
  border-top: solid 5px #5d627b;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
}
</style>
