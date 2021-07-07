<template>
  <div class="song-list">
    <div class="top" v-if="playlist">
      <div
        class="bg"
        :style="{ backgroundImage: `url('${playlist.coverImgUrl}')` }"
      ></div>
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <div class="info fl">
        <div class="img-box">
          <img :src="playlist.coverImgUrl" alt="" />
          <span class="icon">歌单</span>
          <div class="num">
            <span class="iconfont icon-erji"></span>
            <span>{{ (playlist.playCount / 10000).toFixed(1) }}万</span>
          </div>
        </div>
        <div class="title fl">
          <h3 class="two-text">{{ playlist.name }}</h3>
          <div class="author">
            <img :src="playlist.creator.avatarUrl" alt="" />
            <span class="nickname">
              {{ playlist.creator.nickname }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Songlist",
  props: ["playlist"],
};
</script>

<style scoped lang="less">
.song-list {
  .top {
    position: relative;
    box-sizing: border-box;
    .bg {
      height: 200px;
      background-size: cover;
      background-position: center;
      filter: blur(25px) brightness(0.7);
    }
    .van-icon {
      position: absolute;
      left: 10px;
      top: 10px;
      font-size: 30px;
    }

    .info {
      position: absolute;
      top: 50px;
      left: 15px;
      width: calc(100% - 15px);
      .img-box {
        width: 126px;
        height: 126px;
        position: relative;
        img {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .icon {
          position: absolute;
          top: 16px;
          left: 0;
          font-size: 12px;
          background-color: #ea6e00;
          padding: 0 8px;
          border-top-right-radius: 14px;
          border-bottom-right-radius: 14px;
        }
        .num {
          position: absolute;
          top: 1px;
          right: 2px;
          width: 100%;
          background-image: linear-gradient(
            to right,
            transparent,
            rgba(175, 175, 174, 0.6)
          );
          text-align: right;
          font-size: 12px;
          .iconfont {
            margin-right: 4px;
            font-size: 12px;
          }
        }
      }
      .title {
        width: 198px;
        position: absolute;
        top: 0;
        right: 20px;
        text-align: left;
        h3 {
          font-weight: 500;
        }
        .author {
          margin-top: 40px;
          img {
            width: 30px;
            border-radius: 50%;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>