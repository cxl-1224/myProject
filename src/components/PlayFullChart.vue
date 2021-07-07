<template>
  <div class="playFullChart">
    <div class="phonograph" :class="{ Paused: isPaused }">
      <img
        :src="currentMusic.picUrl || currentMusic.al.picUrl "
        alt=""
        @click="$emit('toggle-show-lyric')"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentMusic", "isPaused"],
};
</script>

<style scoped lang="less">
.playFullChart {
  height: 100%;
  .phonograph {
    width: 240px;
    height: 240px;
    position: absolute;
    top: calc(50% - 180px);
    left: calc(50% - 120px);
    border-radius: 50%;
    overflow: hidden;
    animation: phonograph 10s linear infinite;
    box-shadow: 0 0 8px 4px #f0a666;
    &.Paused {
      animation-play-state: paused;
    }
    img {
      width: 100%;
    }
  }
}
@keyframes phonograph {
  form {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>