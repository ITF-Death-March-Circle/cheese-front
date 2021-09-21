<template>
  <div class="header w-full absolute md:static px-2 z-50">
    <div class="md:max-w-3xl mx-auto md:flex md:items-center">
      <div class="header__navbar w-full md:flex mx-auto px-6 md:px-0 flex justify-between items-center h-16">
        <h1>
          <nuxt-link
            class="header__app-title font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap"
            to="/">
            Cheese
          </nuxt-link>
        </h1>
        <div class="md:hidden flex items-center">
          <button class="focus:outline-none" @click="toggleStatus">
            <!-- ハンバーガーメーニューのSVG：https://reffect.co.jp/html/tailwind-for-beginners-navigation-menu -->
            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path
                v-show="!showMenu"
                d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"
              />
              <path
                v-show="showMenu"
                d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
              />
            </svg>
          </button>
        </div>
      </div>
      <nav
        :class="(showMenu) ? 'block' : 'hidden'"
        class="header__nav w-full md:block absolute left-0 md:static md:bg-none z-20"
      >
        <ul class="md:flex md:justify-end md:items-end">
          <!-- <li class="w-full md:w-auto md:ml-5" @click="toggleStatus">
            <nuxt-link
              to="/"
              class="sm:hover:bg-gray-600 md:block inline-block md:py-1 py-5 px-5 md:px-0 w-full">
              Topページへ
            </nuxt-link>
          </li>
          <li class="w-full md:w-auto md:ml-5" @click="toggleStatus">
            <nuxt-link
              to="about"
              class="sm:hover:bg-gray-600 md:block inline-block md:py-1 py-5 px-5 md:px-0 w-full">
              Cheeseについて
            </nuxt-link>
          </li>
          <li class="w-full md:w-auto md:ml-5" @click="toggleStatus">
            <nuxt-link
              to="demo"
              class="sm:hover:bg-gray-600 md:block inline-block md:py-1 py-5 px-5 md:px-0 w-full">
              デモ
            </nuxt-link>
          </li>
          <li class="w-full md:w-auto md:ml-5" @click="toggleStatus">
            <nuxt-link
              to="beforeshoot"
              class="sm:hover:bg-gray-600 md:block inline-block md:py-1 py-5 px-5 md:px-0 w-full">
              撮影ルームへ
            </nuxt-link>
          </li> -->
          <li v-if="isNavigatorShareButton" class="w-full md:w-auto md:ml-5" @click="navigatorShare">
            <div class="sm:hover:bg-gray-600 md:block inline-block md:py-1 py-5 px-5 md:px-0 w-full">
              アプリを共有
            </div>
          </li>
          <li v-if="!isNavigatorShareButton" class="w-full md:w-auto md:ml-5" @click="twitterShare">
            <div class="sm:hover:bg-gray-600 md:block inline-block md:py-1 py-5 px-5 md:px-0 w-full">
              アプリを共有<font-awesome-icon :icon="['fab', 'twitter']" class="ml-5"/>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api'

export default defineComponent({
  name: 'Header',
  setup() {
    const showMenu = ref(false)
    const toggleStatus = () => {
      showMenu.value = !showMenu.value
    }

    const title = ref<string>("Cheese");
    const text = ref<string>("いつでも、どこでも、誰とでも、みんなで記念写真を");
    const url = ref<string>("https://cheese-itf.azurewebsites.net");
    const isNavigatorShareButton = ref(true);
    const navigatorShare = () => {
      if(navigator.share) {
        navigator.share({
          title: title.value,
          text: title.value + '\n' + text.value,
          url: url.value
        })
      }
    }
    const twitterShare = () => {
      const baseUrl = 'https://twitter.com/intent/tweet?'
      const twitterText = ['text', title.value + '\n' + text.value]
      const TwitterUrl = ['url', url.value]
      const parameter = new URLSearchParams([twitterText, TwitterUrl]).toString()
      const shareUrl = `${baseUrl}${parameter}`
      window.open(shareUrl, 'twitter', 'top=200,left=300,width=600,height=400')
    }
    onMounted(() => {
      if (navigator.share === undefined) {
        isNavigatorShareButton.value = false
      }
    })

    return {
      showMenu,
      toggleStatus,
      title,
      text,
      url,
      isNavigatorShareButton,
      navigatorShare,
      twitterShare
    }
  },
})
</script>

<style lang="scss" scoped>
.header {
  background: $ui-yellow;
  color: $font-main;
  position: fixed;

  &__navbar {
    height: 56px;
  }

  &__nav {
    background: $ui-yellow;
    color: $font-main;
    height: 100vh;
    @include mq(md) {
      height: 56px;
    }
  }

}
</style>
