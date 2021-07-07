<template>
  <div class="play-full">
    <div class="icon">
      <van-icon name="arrow-left" @click="$emit('leave-play-full')" />
    </div>
    <div class="geci">{{ $attrs.currentMusic.name }}</div>
    <PlayFullChart
      v-show="isShowLyric"
      @toggle-show-lyric="isShowLyric = !isShowLyric"
      :currentMusic="$attrs.currentMusic"
      :isPaused="isPaused"
    ></PlayFullChart>
    <PlayFullLyric
      v-show="!isShowLyric"
      @toggle-show-lyric="isShowLyric = !isShowLyric"
      :currentMusic="$attrs.currentMusic"
      :currentTime="currentTime"
    ></PlayFullLyric>

    <div class="play-full-footer">
      <div class="progress">
        <input
          type="range"
          min="0"
          :max="duration"
          step="1"
          @input="getValue"
          :value="currentTime"
        />
        <span :style="{ width: (currentTime / duration) * 100 + '%' }"></span>
      </div>
      <div class="bottom">
        <div :class="item.class" v-for="(item, index) in icons" :key="index">
          <span
            @click="fn(item.num)"
            :class="'iconfont icon-' + item.icon"
          ></span>
        </div>

        <!-- <div class="menu-box" v-show="isShowMenu">
          <ul>
            <li></li>
          </ul>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import PlayFullChart from "./PlayFullChart";
import PlayFullLyric from "./PlayFullLyric";
export default {
  props: ["currentTime", "duration", "isPaused", "allMusicData"],
  components: { PlayFullChart, PlayFullLyric },
  data: function () {
    return {
      isShowLyric: true,
      icons: [
        // { icon: "shunxubofang", class: "order", num: "1" },
        { icon: "shangyishou", class: "last", num: "3" },
        { icon: "zanting", class: "play", num: "4" },
        { icon: "xiayishou", class: "next", num: "2" },
        // { icon: "gedan", class: "menu", num: "5" },
      ],
      isShowMenu: false,
    };
  },
  created() {
    if (this.$props.isPaused) {
      this.icons[1].icon = "music-play";
    } else {
      this.icons[1].icon = "zanting";
    }
  },
  watch: {
    "$props.isPaused"(n) {
      if (n) {
        this.icons[1].icon = "music-play";
      } else {
        this.icons[1].icon = "zanting";
      }
    },
  },

  methods: {
    getValue: function (e) {
      this.$emit("update:currentTime", e.target.value);
    },
    fn(num) {
      if (num == 1) {
        //   let icon = this.icons[0].icon;
        //  this.icons[0].icon =
        //     icon == "danqu"
        //       ? "suiji"
        //       : icon == "suiji"
        //       ? "shunxubofang"
        //       : icon == "shunxubofang"
        //       ? "danqu"
        //       : "";
        return;
      }
      //  else if (num == 5) {
      //   console.log(123);
      //   this.isShowMenu = true;
      //   return;
      // }

      this.$emit("play", num);
    },
  },
};
</script>

<style scoped lang="less">
.play-full {
  .geci {
    font-size: 20px;
    margin-top: 12px;
  }
  .icon {
    position: absolute;
    top: 10px;
    width: 30px;
    .van-icon {
      font-size: 30px;
      z-index: 12;
    }
  }
  .play-full-footer {
    position: absolute;
    bottom: 50px;
    left: 0;
    width: 100%;
    .progress {
      width: 80%;
      height: 6px;
      background: linear-gradient(to right, lightblue, rgb(231, 199, 130));
      position: relative;
      top: 0;
      left: 0;
      margin: 0 auto;
      border-radius: 3px;
      input {
        width: 100%;
        position: absolute;
        top: -4px;
        left: 0;
        z-index: 99;
        opacity: 0;
      }
      span {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background: #ea6e00;
        border-radius: 3px;
      }
    }
    .bottom {
      height: 50px;
      position: relative;
      margin-top: 20px;
      bottom: 0;
      left: 0;
      display: flex;
      font-size: 50px;
      // .order {
      //   flex: 1;
      // }
      .last {
        flex: 1;
        margin-top: 7px;
        .iconfont {
          font-size: 36px;
        }
      }
      .play {
        flex: 1;
        margin-top: 10px;
        .iconfont {
          font-size: 50px;
        }
      }
      .next {
        flex: 1;
        margin-top: 7px;
        .iconfont {
          font-size: 36px;
        }
      }
      // .menu {
      //   flex: 1;
      //   position: relative;
      // }
      // .menu-box {
      //   position: absolute;
      //   bottom: -10px;
      //   right: 0;
      //   width: 200px;
      //   height: 300px;
      //   background-color: #fff;
      // }
    }
  }
}
.iconfont {
  font-size: 20px;
}
</style>