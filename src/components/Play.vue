<template>
  <div class="play">
    <audio
      ref="audio"
      :src="
        'https://music.163.com/song/media/outer/url?id=' +
        currentMusic.id +
        '.mp3'
      "
      autoplay
    ></audio>
    <!-- controls -->
    <!-- <PlayBar :musicStatus="{isPaused,currentMusic}" :audio="$refs.audio"/> -->

    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div class="play-full" v-show="!isShowPlayBar">
        <div
          class="mask"
          :style="{
            backgroundImage: `url('${
              currentMusic.picUrl || currentMusic.al.picUrl
            }')`,
          }"
        ></div>
        <PlayFull
          @leave-play-full="isShowPlayBar = true"
          :duration="duration"
          :currentMusic="currentMusic"
          :currentTime="currentTime"
          @update:currentTime="$refs.audio.currentTime = $event"
          :isPaused="isPaused"
          :allMusicData="$props.allMusicData"
          @play="playNext"
        ></PlayFull>
        <!-- sync的bug 使用sync只有在进入界面的时候显示当前的数据,不能实时更新 -->
        <!-- v-bind:currentTime.sync="$refs.audio.currentTime" -->
      </div>
    </transition>

    <div class="play-bar">
      <transition
        name="custom-classes-transition"
        enter-active-class="animate__animated animate__slideInUp"
        leave-active-class="animate__animated animate__slideOutDown"
      >
        <!-- <div class="bar-box"> -->
        <div class="bar-box" v-show="isShowPlayBar">
          <img
            :class="{ paused: isPaused }"
            :src="currentMusic.picUrl || currentMusic.al.picUrl"
            alt=""
            @click="isShowPlayBar = false"
          />
          <div class="song-info">
            <div class="title one-text">{{ currentMusic.name }}</div>
            <div class="singer" v-if="currentMusic.song">
              {{
                currentMusic.id != "" ? currentMusic.song.artists[0].name : ""
              }}
            </div>
            <div v-else>{{ currentMusic.ar[0].name }}</div>
          </div>
          <div class="control" @click="togglePlayState">
            <canvas ref="circle" width="50" height="50"></canvas>
            <van-icon v-if="isPaused" name="play" />
            <van-icon v-else name="pause" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import PlayFull from "./PlayFull.vue";
export default {
  name: "Play",
  props: ["currentMusic", "allMusicData", "currentIndex"],
  components: {
    PlayFull,
  },
  data() {
    return {
      // 是否暂停
      isPaused: null,
      // 歌曲时长
      duration: 0,
      //  当前时长
      currentTime: 0,
      isShowLyric: false,
      isShowPlayBar: true,
    };
  },
  mounted() {
    let audio = this.$refs.audio;
    // console.log("mounted", audio);
    // this.$emit('update:audio',audio);
    audio.addEventListener("pause", () => {
      this.isPaused = true;
    });
    audio.addEventListener("play", () => {
      this.isPaused = false;
    });
    // 监听歌曲时长
    audio.addEventListener("durationchange", () => {
      // console.log("当前歌曲时长", this.duration);
      this.duration = audio.duration;
    });
    // 监听当前播放到
    audio.addEventListener("timeupdate", () => {
      this.currentTime = audio.currentTime;
      // console.log("当前播放到", this.currentTime);

      this.drawCircle(this.currentTime, this.duration);
    });
    audio.addEventListener("ended", () => {
      // 播放完成下一曲
      this.playNext(2);
    });
  },
  methods: {
    // 切换音乐的状态
    togglePlayState() {
      let audio = this.$refs.audio;
      if (this.isPaused) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    // 绘制圆形进度条
    drawCircle: function (n, total) {
      let canvas = this.$refs.circle;
      let ctx = canvas.getContext("2d");

      // ctx.clearRect(0, 0, 50, 50);
      // ctx.beginPath();
      // ctx.strokeStyle = "rgb(234, 110, 0)";
      // ctx.arc(25, 25, 20, 0, Math.PI * 2, false); // 绘制
      // ctx.stroke();
      // ctx.closePath();

      ctx.clearRect(0, 0, 50, 50);
      ctx.beginPath();
      ctx.strokeStyle = "rgb(234, 110, 0)";
      ctx.arc(
        25,
        25,
        20,
        Math.PI * -0.5,
        Math.PI * ((n / total) * 2 - 0.5),
        false
      ); // 绘制
      ctx.stroke();
      ctx.closePath();
    },

    // 根据当前播放模式
    calculateNext(order) {
      let nextIndex;
      switch (order) {
        // case 0:
        //   console.log("随机");
        //   break;
        // case 1:
        //   console.log("单曲循环");
        //   break;
        case 2:
          console.log("下一首");
          if (this.currentIndex < this.allMusicData.length - 1) {
            nextIndex = this.currentIndex + 1;
          } else {
            nextIndex = 0;
          }
          break;
        case 3:
          console.log("上一首");
          if (this.currentIndex == 0) {
            nextIndex = this.allMusicData.length - 1;
          } else {
            nextIndex = this.currentIndex - 1;
          }
          break;
        case 4:
          console.log("暂停播放");
          this.togglePlayState();
          break;
      }
      // if (order == 0) {
      //   console.log("随机");
      // } else if (order == 1) {
      //   console.log("单曲循环");
      // } else if (order == 2) {
      //   console.log("顺序播放");
      //   if (this.currentIndex < this.allMusicData.length - 1) {
      //     nextIndex = this.currentIndex + 1;
      //   } else {
      //     nextIndex = 0;
      //   }
      // }
      return nextIndex;
    },

    // 根据索引决定播放哪首歌
    playNext(order) {
      // 获取当前播放索引
      let index = this.calculateNext(Number(order));
      if (index != undefined) {
        this.$emit("update:music", {
          item: this.allMusicData[index],
          index,
        });
      }
    },
  },
  watch: {
    // 监听是否暂停
    isPaused(n) {
      this.$emit("update:paused", n);
    },
  },
};
</script>

<style scoped lang="less">
.play {
  .play-full {
    // background-image: radial-gradient(rgb(56, 56, 56), transparent, rgb(56, 56, 56));
    background: linear-gradient(
      to right,
      rgb(56, 56, 56),
      rgba(95, 95, 95, 0.2),
      rgb(56, 56, 56)
    );
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    .mask {
      background: url("http://p1.music.126.net/fwXShM46KdIj3hB8_lJ71g==/109951165545588869.jpg");
      background-size: cover;
      background-position: center;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      filter: blur(4px) brightness(0.7);
    }
  }
  .play-bar {
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #000;
    .bar-box {
      height: 60px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        box-shadow: 0 0 8px 4px rgba(234, 110, 0, 0.5);
        animation: rotate 6s linear infinite;
      }
      img.paused {
        animation-play-state: paused;
      }
      .song-info {
        flex: auto;
        text-align: left;
        margin-left: 20px;
        .title {
          font-size: 18px;
        }
        .singer {
          font-size: 12px;
        }
      }
      .control {
        position: relative;
        width: 50px;
        height: 50px;
        .van-icon {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          left: 50%;
          font-size: 30px;
        }
      }
    }
  }
}

@keyframes rotate {
  form {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>