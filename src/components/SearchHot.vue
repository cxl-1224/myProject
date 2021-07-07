<template>
  <div class="search-hot">
    <div class="title">热门搜索</div>
    <div class="search-hot-box">
      <ul>
        <li @click="$emit('search-hot',item.first)" v-for="(item,index) in hots" :key="index">{{item.first}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchHot",
  props:['hots']
};
</script>

<style scoped lang="less">
.search-hot {
  padding: 14px 20px;
  .title {
    text-align: left;
    margin-bottom: 10px;
  }
  .search-hot-box {
      ul{
          display: flex;
          flex-wrap: wrap;
          li{
              padding: 4px 10px;
              border: 1px solid #999;
              border-radius: 10px;
              margin: 10px 6px;
          }
      }
  }
}
</style>