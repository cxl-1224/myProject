<template>
  <div class="main">
    <van-tabs
      v-model="active"
      background="#000"
      color="#ea6e00"
      title-active-color="#ea6e00"
      title-inactive-color="#f5f5f5"
    >
      <van-tab
        v-for="(item, index) in tabs"
        :key="index"
        :title="item.title"
        :to="item.path"
        :name="item.name"
      ></van-tab>
    </van-tabs>

    <keep-alive>
      <router-view
        @update:music="$emit('update:music', $event)"
        :music="$attrs.music"
        :paused="$attrs.paused"
        @update:allMusicData="$emit('update:allMusicData', $event)"
      />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      active: this.$route.name,
      tabs: [
        { title: "推荐音乐", path: "recommend", name: "Recommend" },
        { title: "热歌榜", path: "hotList", name: "HotList" },
        { title: "搜索", path: "search", name: "Search" },
      ],
    };
  },
};
</script>
<style scoped lang="less">
.main {
  .van-tabs {
    position: fixed;
    background-color: #000;
    top: 0;
    width: 100%;
    z-index: 1;
  }
  padding-top: 45px;
}
</style>