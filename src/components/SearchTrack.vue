<template>
  <div class="search-track">
    <ul>
      <li v-for="(item,index) in songs" :key="index">
        <van-icon :name="name" />
        <span class="text one-text">{{item.name}}</span>
        <slot></slot>
      </li>
    
    </ul>
  </div>
</template>

<script>
export default {
    props:['name',"songs"]
};
</script>

<style scoped lang="less">
.search-track {
  padding: 0 10px;
  ul {
    li {
      text-align: left;
      height: 50px;
      border-bottom: 1px solid #ea6e00;
      line-height: 50px;
      display: flex;
      margin-bottom: 10px;
      .van-icon {
        font-size: 18px;
        margin-right: 10px;
        line-height: 50px;
      }
      .text {
          flex: auto;
          line-height: 50px;
          padding-right: 40px;
      }
    }
  }
}
</style>