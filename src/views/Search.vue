<template>
  <div class="search">
    <div class="input-box">
      <van-icon name="search" class="search-icon" /><input
        type="text"
        @input="search"
        v-model="value"
      />
      <van-icon
        @click="value = ''"
        class="clear"
        name="clear"
        v-if="isSearch"
      />
      <div class="record-box" v-if="isSearch">
          <RecommendNewMusic
            :newSongData="songs"
            :currentMusic="$attrs.music"
            @update:music="$emit('update:music', $event)"
            :paused="$attrs.paused"
            @update:allMusicData="$emit('update:allMusicData', $event)"
            :music="$attrs.music"
          >
            <div class="sou">
              搜索 <span v-if="value">"{{ value }}"</span>
            </div></RecommendNewMusic
          >
      </div>
    </div>

    <div v-if="!isSearch">
      <SearchHot @search-hot="getData" :hots="hots"></SearchHot>
      <SearchTrack name="underway-o"><van-icon name="cross" /></SearchTrack>
    </div>
  </div>
</template>

<script>
import SearchHot from "../components/SearchHot.vue";
import SearchTrack from "../components/SearchTrack";
import RecommendNewMusic from "../components/RecommendNewMusic.vue";
export default {
  name: "Search",
  components: { SearchHot, SearchTrack, RecommendNewMusic },
  data() {
    return {
      hots: [],
      value: "",
      timer: null,
      isSearch: false,
      songs: [],
    };
  },
  created() {
    // 获取热搜标签
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
    });
    this.axios.get("/search/hot").then((result) => {
      this.hots = result.data.result.hots;
      this.$toast.clear;
    });
  },
  methods: {
    // 根据关键词获取相关数据
    search() {
      clearInterval(this.tiemr);
      this.tiemr = setTimeout(() => {
        if (this.value) {
          this.$toast.loading({
            message: "加载中...",
            forbidClick: true,
          });
          this.axios.get("/search?keywords= " + this.value).then((result) => {
            let arr = [];
            result.data.result.songs.map((v) => {
              arr.push(v.id);
            });
            let str = arr.join(",");
            this.getPicUrlData(str);
            this.$toast.clear;
          });
        }
      }, 500);
    },
    // 获取相关歌曲id
    getData(value) {
      this.value = value;

      this.axios.get("/search?keywords= " + value).then((result) => {
        let arr = [];
        result.data.result.songs.map((v) => {
          arr.push(v.id);
        });
        let str = arr.join(",");
        this.getPicUrlData(str);
      });
    },
    // 获取歌曲详情
    getPicUrlData(idAll) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.axios.get("/song/detail?ids=" + idAll).then((result) => {
        this.songs = result.data.songs;
      });
      this.$toast.clear;
    },
  },
  watch: {
    value(n) {
      if (n) {
        this.isSearch = true;
      } else {
        this.isSearch = false;
      }
    },
  },
};
</script>
<style scoped lang="less">
.search {
  .input-box {
    width: 100%;
    position: relative;
    margin: 20px 0;
    .search-icon {
      position: absolute;
      top: 8px;
      left: 30px;
      font-size: 18px;
      color: #333;
    }
    .clear {
      position: absolute;
      top: 5px;
      right: 30px;
      text-align: right;
      width: 17px;
      color: #000;
      font-size: 20px;
    }
    input {
      width: calc(100% - 40px);
      height: 30px;
      background-color: #ccc;
      box-sizing: border-box;
      border-radius: 20px;
      border: none;
      color: #333;
      padding: 0 40px;
    }
    .record-box {
      text-align: left;
      margin-top: 10px;
    }
  }
}
</style>