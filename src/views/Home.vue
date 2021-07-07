<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="标题" left-text="返回" left-arrow>
      <template #left>
        <div class="top-title">
          <div class="extend">{{ extend }}</div>
          <div class="one-text nick-name">{{ nickName }}</div>
        </div>
      </template>
      <template #right>
        <van-search placeholder="输入商品名称" @focus="searchFocus" />
      </template>
    </van-nav-bar>

    <div class="home-content">
      <!-- 轮播图 -->
      <div class="banner-box">
        <van-swipe :autoplay="5000" loop @change="changeCurrentIndex">
          <van-swipe-item v-for="(item, index) in bannerData" :key="index">
            <img
              class="auto-img"
              :src="item.bannerImg"
              @click="goDetail(item.pid)"
            />
          </van-swipe-item>
          <template #indicator>
            <div class="index-box">
              <div
                :class="{ active: index == currentIndex }"
                v-for="(item, index) in bannerData"
                :key="index"
              ></div>
            </div>
          </template>
        </van-swipe>
      </div>

      <!-- 商品 -->
      <div class="product-box">
        <div>
          <div class="clearfix pro-title-box">
            <span class="pro-title">热卖推荐</span>
          </div>
          <div class="products clearfix">
            <div
              class="pro-item fl"
              v-for="(item, index) in hotProduct"
              :key="index"
              @click="goDetail(item.pid)"
            >
              <div class="img-box">
                <img class="auto-img" :src="item.smallImg" />
                <!-- hot标签 -->
                <div class="hot">hot</div>
              </div>
              <div class="pro-info">
                <div class="pro-name one-text">{{ item.name }}</div>
                <div class="pro-enname one-text">{{ item.enname }}</div>
                <div class="pro-price">￥{{ item.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/home.less";
export default {
  name: "Home",
  data() {
    return {
      // 当前轮播图下标
      currentIndex: 0,
      //轮播数据
      bannerData: [],

      //热卖商品数据
      hotProduct: [],
      // 昵称
      nickName: "",
      // 问候语
      extend: "",
    };
  },
  created() {
    //获取轮播图数据
    this.getBannerData();
    //获取商品数据
    this.getHotProduct();
    // 获取个人资料
    this.getAccountInfo();
    this.setExtend();
  },
  methods: {
    // 获取轮播图下标
    changeCurrentIndex(index) {
      this.currentIndex = index;
    },
    //获取轮播图数据
    getBannerData() {
      this.axios({
        methods: "GET",
        url: "/banner",
        params: {
          appkey: this.appkey,
        },
      })
        .then((result) => {
          //
          if (result.data.code == 300) {
            this.bannerData = result.data.result;
          }
        })
        .catch((err) => {});
    },
    //获取热卖推荐商品
    getHotProduct() {
      this.axios({
        method: "GET",
        url: "/typeProducts",
        params: {
          appkey: this.appkey,
          key: "isHot",
          value: 1,
        },
      })
        .then((result) => {
          if (result.data.code == 500) {
            this.hotProduct = result.data.result;
          }
        })
        .catch((err) => {});
    },
    // 获取商品的参数传递给detail页面
    goDetail(pid) {
      this.$router.push({ name: "Detail", params: { pid } });
      let pro = localStorage.getItem("pro");
      if (pro == null) {
        localStorage.setItem("pro", pid);
        return;
      }
      localStorage.setItem("pro", pro + "-" + pid);
    },
    //搜索栏获取焦点
    searchFocus() {
      this.$router.push({ name: "Search" });
    },
    //获取个人资料
    getAccountInfo() {
      let tokenString = localStorage.getItem("__tk");

      this.axios({
        method: "GET",
        url: "/findAccountInfo",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          if (result.data.code == "B001") {
            this.nickName = result.data.result[0].nickName;
          }
        })
        .catch((err) => {});
    },
    // 设置问候语
    setExtend() {
      let hours = new Date().getHours();
      if (6 <= hours && hours < 12) {
        this.extend = "早上好!";
      } else if (12 <= hours && hours < 16) {
        this.extend = "中午好!";
      } else if (16 <= hours && hours < 18) {
        this.extend = "下午好!";
      } else if (18 <= hours) {
        this.extend = "晚上好!";
      } else if (hours < 6) {
        this.extend = "晚上好!";
      }
    },
  },
};
</script>

