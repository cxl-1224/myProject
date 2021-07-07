<template>
  <div class="top">
    <div class="shu"></div>
    <div class="title"><slot></slot></div>
    <van-button
      v-if="condition"
      color="linear-gradient(to right, #853f85 ,#ea6e00)"
      size="mini"
      @click="next"
      >下一页</van-button
    >
  </div>
</template>

<script>
export default {
  props: ["condition"],
  methods: {
    next() {
      this.$emit("next");
    },
  },
};
</script>

<style scoped lang="less">
.top {
  display: flex;
  margin: 20px 0 10px;
  .shu {
    width: 3px;
    height: 20px;
    background-color: #ea6e00;
    margin-right: 10px;
  }
  .title {
    font-size: 16px;
    margin-right: auto;
  }
}
</style>