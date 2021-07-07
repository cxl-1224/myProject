<template>
  <div class="recommend">
    <RecommendPlayList :data="recommendData" @next="next"
      >推荐歌单</RecommendPlayList
    >

    <BorderedTitle>最新音乐</BorderedTitle>
    <RecommendNewMusic
      :newSongData="newSong"
      @update:music="$emit('update:music', $event)"
      :currentMusic="$attrs.music"
      :paused="$attrs.paused"
      @update:allMusicData="$emit('update:allMusicData', $event)"
      :music="$attrs.music"
    ></RecommendNewMusic>
  </div>
</template>

<script>
import RecommendPlayList from "@/components/RecommendPlayList.vue";
import BorderedTitle from "@/components/BorderedTitle.vue";
import RecommendNewMusic from "@/components/RecommendNewMusic.vue";

export default {
  name: "Recommend",
  components: {
    RecommendPlayList,
    BorderedTitle,
    RecommendNewMusic,
  },
  data() {
    return {
      data: [],
      newSong: [],
      recommendIndex: 1,
    };
  },
  created() {
    // 获取推荐歌曲数据
    this.getData();

    // 获取最新音乐
    this.getNewSong();
  },
  computed: {
    recommendData() {
      return this.data.slice(
        (this.recommendIndex - 1) * 6,
        this.recommendIndex * 6
      );
    },
  },
  methods: {
    // 获取推荐歌曲数据
    getData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.axios.get("/personalized").then((result) => {
        this.data = result.data.result;
        // this.recommendData = this.data.slice(
        //   this.recommendIndex * 6,
        //   (this.recommendIndex + 1) * 6
        // );
        this.$toast.clear;
      });
    },
    // 获取最新音乐
    getNewSong() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.axios.get("/personalized/newsong").then((result) => {
        this.newSong = result.data.result;
        this.$toast.clear;
      });
    },
    next() {
      this.recommendIndex =
        this.recommendIndex >= 5 ? 1 : this.recommendIndex + 1;
      // this.recommendData = this.data.slice(
      //   this.recommendIndex * 6,
      //   (this.recommendIndex + 1) * 6
      // );
    },
  },
  // activated() {
  //   // console.log('activated');
  //   this.recommendIndex =
  //     this.recommendIndex >= 5 ? 1 : this.recommendIndex + 1;
  // },
};
</script>
<style scoped lang="less">
.recommend {
}
</style>