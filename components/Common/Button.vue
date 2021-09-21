<template>
  <button class="flex flex-row items-center open-shoot-modal-button">
    <p>
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
  background: $ui-yellow;
}
</style>
