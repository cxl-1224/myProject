<template>
  <div class="playList">
    <Songlist :playlist="playlist"></Songlist>
    <div class="list">
      <div class="title" v-if="playlist">歌曲列表</div>
      <RecommendNewMusic
        :newSongData="playListData"
        @update:music="$emit('update:music', $event)"
        :currentMusic="$attrs.music"
        :paused="$attrs.paused"
        @update:allMusicData="$emit('update:allMusicData', $event)"
        :music="$attrs.music"
      ></RecommendNewMusic>
    </div>
  </div>
</template>

<script>
import Songlist from "../components/Songlist.vue";
import RecommendNewMusic from "../components/RecommendNewMusic.vue";

export default {
  name: "PlayList",
  components: { Songlist, RecommendNewMusic },
  data() {
    return {
      playlist: null,
      playListData: [],
      id: null,
    };
  },
  // created() {
  //   this.id = this.$route.query.id;
  // },
  watch: {
    id() {
      this.getId();
    },
  },
  activated() {
    if (this.id == this.$route.query.id) {
      return;
    }
    this.id = this.$route.query.id;
  },

  methods: {
    // 获取歌曲ID
    getId() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.axios
        .get("/playlist/detail?id=" + this.$route.query.id)
        .then((result) => {
          this.playlist = result.data.playlist;
          let idAll = [];
          result.data.playlist.trackIds.map((v) => {
            idAll.push(v.id);
          });
          let str = idAll.join(",");
          this.getPicUrlData(str);

          // this.playListData = result.data.playlist.tracks;
        });
    },
    // 获取歌曲详情
    getPicUrlData(idAll) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.axios.get("/song/detail?ids=" + idAll).then((result) => {
        this.playListData = result.data.songs;
        this.$toast.clear;
      });
    },
  },
  beforeRouteUpdate(to, from, next) {
    console.log('beforeUpdate',to.query.id);
    next();
  },
};
</script>

<style scoped lang="less">
.playList {
  .list {
    .title {
      height: 30px;
      text-align: left;
      color: #fff;
      padding-left: 10px;
      font-size: 16px;
      padding-top: 4px;
    }
  }
}
</style>