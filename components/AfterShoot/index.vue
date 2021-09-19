<template>
  <div>
    <Demo :subject-path="img" />
    <nuxt-link to="shoot">
      <CommonButton text="再撮影" />
    </nuxt-link>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    img: {
      type: String,
      default: ""
    }
  }
}
</script>
