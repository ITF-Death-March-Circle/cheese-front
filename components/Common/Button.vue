<template>
  <button class="open-shoot-modal-button">
    <p class="open-shoot-modal-button__text">
      {{text}}
    </p>
    <font-awesome-icon :icon="icon" class="ml-5"/>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      default: "撮影する"
    },
    icon: {
      type: Array,
      default: () => ['fas', 'camera']
    }
  }
}
</script>

<style lang="scss" scoped>
.open-shoot-modal-button {
  display: flex;
  align-items: center;
  background: $ui-yellow ;
  border-radius: 50px;
  padding: 10px 20px;
}
</style>
