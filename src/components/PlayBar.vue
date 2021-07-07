<template>
  <div class="play-bar">
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
    >
      <div class="bar-box">
        <!-- <div class="bar-box" v-if="musicStatus.music.id != ''"> -->
        <img :src="musicStatus.music.picUrl" alt="" />
        <div class="song-info">
          <div class="title">{{ musicStatus.music.name }}</div>
          <div class="singer">
            {{
              musicStatus.music.id != ""
                ? musicStatus.music.song.artists[0].name
                : ""
            }}
          </div>
        </div>
        <div class="control">
          <canvas ref="circle" width="50" height="50"></canvas>
          <van-icon name="play" />
          <!-- <van-icon name="pause" /> -->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "PlayBar",
  props: ["musicStatus"],
  mounted() {
      
      this.drawCircle()
  },
  
  methods: {
    drawCircle: function (n, total) {
      let canvas = this.$refs.circle;
      let ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, 50, 50);
      ctx.beginPath();
      ctx.strokeStyle = "rgb(234, 110, 0)";
      ctx.arc(25, 25, 20, 0, Math.PI * 2, false); // 绘制
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255)";
      ctx.arc(
        25,
        25,
        19,
        Math.PI * -0.5,
        Math.PI * ((n / total) * 2 - 0.5),
        false
      ); // 绘制
      ctx.stroke();
      ctx.closePath();
    },
  },
};
</script>

<style scoped lang="less">

</style>