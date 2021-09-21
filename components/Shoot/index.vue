<template>
  <div class='shoot'>
    <div class='row'>
      <div class='col-md-6'>
        <!-- <h2>Current Camera</h2>
        <code v-if='device'>{{ device.label }}</code> -->
        <div class='border'>
          <vue-web-cam
            ref='webcam'
            :device-id='deviceId'
            width='100%'
            @started='onStarted'
            @stopped='onStopped'
            @error='onError'
            @cameras='onCameras'
            @camera-change='onCameraChange'
          />
        </div>

        <div class='row'>
          <div class='col-md-12'>
            <select v-model='camera'>
              <option>-- Select Device --</option>
              <option
                v-for='d in devices'
                :key='d.deviceId'
                :value='d.deviceId'
              >{{ d.label }}
              </option>
            </select>
          </div>
          <div class='flex flex-row col-md-12'>
            <button type='button' class='open-shoot-modal-button btn btn-primary' @click='onCapture'>Capture Photo
            </button>
            <!-- <button type='button' class='open-shoot-modal-button btn btn-danger' @click='onStop'>Stop Camera</button>
            <button type='button' class='open-shoot-modal-button btn btn-success' @click='onStart'>Start Camera</button> -->
          </div>
        </div>
      </div>
      <!-- <div class='col-md-6'>
        <h2>Captured Image</h2>
        <figure class='figure'>
          <img :src='img' class='img-responsive' />
        </figure>
      </div> -->

      <!-- <a ref='download' @click='download'>撮影元データダウンロード</a> -->

    </div>
  </div>
</template>
<script lang='js'>
/* eslint-disable

 object-shorthand */
/* eslint-disable no-console */
import moment from 'moment'

export default {
  data() {
    return {
      img: null,
      camera: null,
      deviceId: null,
      devices: []
    }
  },
  computed: {
    device: function() {
      return this.devices.find(n => n.deviceId === this.deviceId)
    }
  },
  watch: {
    camera: function(id) {
      this.deviceId = id
    },
    devices: function() {
      // Once we have a list select the first one
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [first, ...tail] = this.devices
      if (first) {
        this.camera = first.deviceId
        this.deviceId = first.deviceId
      }
    }
  },
  methods: {
    upload() {
      // const imageFile = new File([this.img], "hogehoge.jpg", {type: "image/jpg"});
      // const params = new FormData();
      // params.append("file",imageFile)
      const data = {
        image: this.img
      }
      this.$axios({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        url: 'http://localhost:80/upload',
        data: data
      })
        // this.$axios.$post("http://localhost/upload",params)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    download() {
      const a = this.$refs.download
      // Base64文字列をhrefへセット
      a.href = this.img
      // ダウンロード時のファイル名を指定
      const now = moment(new Date()).format('YYYY-MM-DD_hh-mm-ss')
      a.download = `${now}.jpg`
    },
    onCapture() {
      this.img = this.$refs.webcam.capture()
      this.$router.push('aftershoot')
      this.upload()
    },
    onStarted(stream) {
      console.log('On Started Event', stream)
    },
    onStopped(stream) {
      console.log('On Stopped Event', stream)
    },
    onStop() {
      this.$refs.webcam.stop()
    },
    onStart() {
      this.$refs.webcam.start()
    },
    onError(error) {
      console.log('On Error Event', error)
    },
    onCameras(cameras) {
      this.devices = cameras
      console.log('On Cameras Event', cameras)
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId
      this.camera = deviceId
      console.log('On Camera Change Event', deviceId)
    }
  }
}
</script>
<style lang='scss' scoped>
.open-shoot-modal-button {
  display: flex;
  align-items: center;
  background: $ui-yellow;
  border-radius: 50px;
  padding: 10px 20px;
}
</style>
