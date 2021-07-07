<template>
  <div class="newMusicList">
    <slot></slot>
    <ul>


      <li class="item" v-for="(item, index) in newSongData" :key="index">
        <div class="num" v-if="isNum">
          {{ index + 1 > 9 ?  index + 1:"0" + (index + 1)  }}
        </div>
        <div class="text clearfix">
          <div class="fl">
            <van-image  :src="item.picUrl || item.al.picUrl" :lazy-load="true"/>
          </div>
          <div class="fl ttt">
            <h5 class="title one-text">{{ item.name }}</h5>
            <p class="songMsgs" v-if="item.song">
              {{ item.song.artists[0].name }}
            </p>
            <p class="songMsgs" v-else-if="item.ar[1]">
              {{ item.ar[0].name + " / " + item.ar[1].name }}
            </p>
            <p class="songMsgs" v-else>{{ item.ar[0].name }}</p>
          </div>
        </div>
        <div class="play" @click="play(item, index)">
          <span
            class="playing"
            :class="{ paused: paused }"
            v-if="currentMusic && currentMusic.item.id === item.id"
          >
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </span>
          <van-icon v-else name="play-circle-o" />
        </div>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: "NewMusicList",

  props: {
    // 控制暂停播放
    paused: {
      type: Boolean,
      default: false,
    },
    // 当前音乐数据
    currentMusic: {
      type: Object,
      default() {
        return {};
      },
    },
    songName: {
      type: String,
      default: "是初恋是心动的你",
    },

    singer: {
      type: String,
      default: "房东的猫",
    },
    newSongData: {
      type: Array,
      default() {
        return [];
      },
    },
    isNum: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    play(item, index) {
      this.$emit("update:music", { item, index });
      this.$emit("update:allMusicData", this.newSongData);
      // this.$router.push({name:'PlayFull',query:{id:item.id}})
    },
  },
};
</script>

<style scoped lang="less">
.newMusicList {
  padding: 0 10px;
  ul {
    border-top: 1px solid#ea6e00;
    .item {
      text-align: left;
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #ea6e00;
      &:first-of-type .num,
      &:nth-of-type(2) .num,
      &:nth-of-type(3) .num {
        color: #ea6e00;
      }
      .num {
        font-size: 24px;
        margin-right: 10px;
        line-height: 40px;
      }
      .text {
        flex: auto;
        .ttt {
          margin-left: 16px;
        }
        .van-image {
          width: 36px;
          height: 36px;
        }
        .title {
          font-size: 15px;
          font-weight: 500;
        }
        .songMsgs {
          font-size: 12px;
          color: #ccc;
        }
      }
      .play {
        .playing {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 30px;
          margin-top: 5px;
          i {
            width: 6px;
            height: 30px;
            background-image: linear-gradient(to bottom right, red, yellow);
            transform-origin: center bottom;
            animation: playing 0.6s linear -0.2s infinite alternate-reverse;
            &:first-of-type {
              animation-delay: 0s;
            }
            &:nth-of-type(2) {
              animation-delay: -0.2s;
            }

            &:nth-of-type(3) {
              animation-delay: -0.4s;
            }

            &:last-of-type {
              animation-delay: -0.6s;
            }
          }
          &.paused {
            i {
              animation-play-state: paused;
            }
          }
        }
        .van-icon {
          font-size: 26px;
          margin-top: 7px;
        }
      }
    }
  }
  .sou {
    line-height: 50px;
    font-size: 16px;
    color: #ea6e00;
    border-bottom: 1px solid #ea6e00;
    padding-left: 10px;
  }
}

@keyframes playing {
  from {
    // height: 50px;
    transform: scaleY(1);
  }
  to {
    // height: 10px;
    transform: scaleY(0.2);
  }
}
</style>