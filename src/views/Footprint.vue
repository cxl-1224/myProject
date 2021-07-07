<template>
  <div class="footprint">
    <van-nav-bar
      title="我的足迹"
      left-text="返回"
      left-arrow
      @click-left="back"
    />
    <BgBox>
      <div class="clearfix" v-if="footPrintData.length > 0">
        <div
          class="fl pro-item"
          v-for="(item, index) in footPrintData"
          :key="item.pid"
        >
          <ProductItem
            :item="item"
            :is-remove="true"
            @remove="removeProduct(index, item.pid)"
          >
          </ProductItem>
        </div>
      </div>
        <div v-else>
        <van-empty description="没有浏览记录" />
      </div>
    </BgBox>
  </div>
</template>

<script>
import BgBox from "../components/BgBox.vue";
import ProductItem from "../components/ProductItem.vue";

export default {
  name: "Footprint",
  components: {
    BgBox,
    ProductItem,
  },
  data() {
    return {
      footPrintData: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 获取浏览过的商品数据
    getData() {
      let proData = [];

      let data = localStorage.getItem("pro").split("-");
      data.forEach((e) => {
        if (proData.indexOf(e) == -1) {
          proData.push(e);

          //获取商品详情数据
          //发起注册请求
          this.axios({
            //请求类型
            method: "GET",
            //请求路径
            url: "/productDetail",

            //GET请求参数, object
            params: {
              appkey: this.appkey,
              pid: e,
            },
          })
            .then((result) => {
              let proData = {};
              if (result.data.code == 600) {
                proData.name = result.data.result[0].name;
                proData.enname = result.data.result[0].enname;
                proData.price = result.data.result[0].price;
                proData.smallImg = result.data.result[0].small_img;
                proData.pid = result.data.result[0].pid;
              }
              this.footPrintData.push(proData);
            })
            .catch((err) => {
              err;
            });
        }
      });
      let str = proData.join("-");
      localStorage.setItem("pro", str);
      //   
    },
    // 删除浏览记录
    removeProduct(index, pid) {
      this.footPrintData.splice(index, 1);
      let data = localStorage.getItem("pro").split("-");
      for (let i = 0; i < data.length; i++) {
        if (data[i] == pid) {
          data.splice(i, 1);
        }
      }
      let str = data.join("-");
      localStorage.setItem("pro", str);
    },
  },
};
</script>

<style lang="less" scoped>
.footprint {
  /deep/ .van-nav-bar__text,
  /deep/ .van-nav-bar .van-icon,
  /deep/ .van-nav-bar__title {
    color: #222779;
  }
  .pro-item {
    width: calc(~"100% / 2 - 10px + 10px / 2");
    margin-right: 10px;
    margin-bottom: 10px;
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
}
</style>