<template>
  <div class="hot-list">
    <div class="bg-box">
      <div class="hot-img"></div>
      <div class="time">
        <span>更新时间 :</span>
        <span>{{oMonth}}月{{oDay}}日</span>
      </div>
    </div>
    <div class="play-list">
      <RecommendNewMusic
        :newSongData="hotListData"
        @update:music="$emit('update:music', $event)"
        :currentMusic="$attrs.music"
        :paused="$attrs.paused"
        @update:allMusicData="$emit('update:allMusicData', $event)"
        :music="$attrs.music"
        :isNum="isNum"
      ></RecommendNewMusic>
    </div>
  </div>
</template>

<script>
import RecommendNewMusic from "../components/RecommendNewMusic.vue";
export default {
  name: "HotList",
  components: {
    RecommendNewMusic,
  },
  data() {
    return {
      hotListData: [],
      oMonth :'',
      oDay :'',
      isNum:true
    };
  },
  created() {
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
    });
    // 获取音乐id
    this.axios.get("/top/list?idx=1").then((result) => {
      let oDate = result.data.playlist.updateTime;
      let time = new Date(oDate).toLocaleString().split('/');
      this.oMonth =  time[1];
      this.oDay =  time[2].slice(0,2);
      let dataList = result.data.playlist.trackIds.slice(0, 20);
      let idArr = [];
      dataList.map((v) => {
        idArr.push(v.id);
      });
      let idStr = idArr.join(",");
      // 获取歌曲详情
      this.axios.get("/song/detail?ids=" + idStr).then((result) => {
        this.hotListData = result.data.songs;
        
        this.$toast.clear;
      });
    });
  },
 

};
</script>
<style scoped lang="less">
.hot-list {
  .bg-box {
    height: 146px;
    background: url("../assets/images/hot_music_bg.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
    padding-left: 20px;
    text-align: left;
    .hot-img {
      width: 142px;
      height: 67px;
      background: url("../assets/images/icon_2x.png") no-repeat;
      background-size: cover;
      background-position: -18px -20px;
      display: inline-block;
      margin-top: 20px;
      box-sizing: border-box;
    }
  }
}
</style>