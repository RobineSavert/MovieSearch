<template>
  <video
    class="bg-video"
    playsinline="playsinline"
    autoplay="autoplay"
    muted="muted"
    loop="loop"
  >
    <source :src="video" type="video/mp4" />
  </video>
</template>

<script setup>
  import video from "@/assets/mp4/bg.mp4";
</script>

<style scoped>
.bg-video {
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translateX(-50%) translateY(-50%);
  z-index: 0;
}
</style>
