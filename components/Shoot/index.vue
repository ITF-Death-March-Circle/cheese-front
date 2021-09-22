<template>
  <div class='shoot'>
    <div class='row'>
      <div class='col-md-6'>
        <div class='text-center header-text'>好きな背景を選んでね！</div>
        <div class='flex flex-row justify-center m-2'>
          <button class='open-shoot-modal-button m-3' @click="voteBackground('BACKGROUND_1')">
            海
          </button>
          <button class='open-shoot-modal-button m-3' @click="voteBackground('BACKGROUND_2')">
            山
          </button>
          <button class='open-shoot-modal-button m-3' @click="voteBackground('BACKGROUND_3')">
            秘密
          </button>
        </div>

        <div class='flex flex-row justify-between text-container m-2'>
          <div class=''>
            現在の背景：{{ resultVote.text }}
          </div>
          <div class=''>
            現在のユーザー数：{{ resultVote.count }}人
          </div>
        </div>
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
          <div class='flex justify-center col-md-12 button-container'>
            <CommonButton text='撮影する' class='m-4' @click.native='onCapture'></CommonButton>
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
      devices: [],
      connection: null,
      resultVote: {
        value: '0',
        text: 'お楽しみ！',
        count: '0'
      }
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
  created() {
    const self = this
    console.log('Starting connection to WebSocket Server')
    this.connection = new WebSocket('wss://cheeseapi.azurewebsites.net/ws')
    this.connection.onmessage = function(event) {
      if (event && event.data) {
        console.log(JSON.parse(event.data))
        self.resultVote = JSON.parse(event.data)
      }
    }
    this.connection.onopen = function(event) {
      console.log(event)
      console.log('Successfully connected to the echo websocket server...')
    }
  },
  beforeDestroy() {
    this.connection.close()
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
        url: 'https://cheeseapi.azurewebsites.net/upload',
        data: data
      })
        // this.$axios.$post("http://localhost/upload",params)
        .then(
          //   res => {
          //   // console.log(res)
          // }
        )
        .catch(
          //   err => {
          //    console.log(err)
          // }
        )
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
    },
    voteBackground(key) {
      console.log(this.connection)
      const object = {
        'action': 'VOTE_BACKGROUND',
        'key': key
      }
      console.log(JSON.stringify(object))
      this.connection.send(JSON.stringify(object))
    }
  }
}
</script>
<style lang='scss' scoped>
.open-shoot-modal-button {
  background: $ui-yellow;
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
  width: auto;
  font-weight: bolder;
  //font-size: 1.5rem;
}

.button-container {
  margin: 0.3rem;
}

.header-text {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.1rem;
}
</style>
