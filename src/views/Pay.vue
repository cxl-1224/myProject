<template>
  <div class="pay">
    <van-nav-bar
      title="订单结算"
      left-text="返回"
      left-arrow
      fixed
      @click-left="back"
    />
    <div class="pay-box">
      <div class="select-address">
        <div>
          <span class="select" @click="showSelectAddressList"
            >选择收货地址</span
          >
          <van-icon class="arrow" name="arrow" />
        </div>
        <div class="user-box">
          <div class="user-info">
            <div class="user-name">{{ currentAddress.name }}</div>
            <div class="user-phone">{{ currentAddress.tel }}</div>
            <div v-if="list.length > 0">
              <van-tag
                class="label"
                v-if="currentAddress.isDefault"
                round
                type="primary"
                color="#222779"
                >默认</van-tag
              >
            </div>
          </div>
          <div class="detail-address">{{ currentAddress.address }}</div>
        </div>
      </div>
      <div class="order-info">
        <OrderList
          infoTitleLeft="订单信息"
          :count="productInfo.count"
          :total="productInfo.total"
        >
          <OrderItem
            v-for="(item, index) in products"
            :key="index"
            :item="item"
          ></OrderItem>
        </OrderList>
      </div>
    </div>

    <div class="btn-box">
      <van-button type="primary" block round color="#222779" @click="payBox"
        >立即结算</van-button
      >
    </div>

    <van-popup v-model="show" position="bottom">
      <div class="address-title">选择地址</div>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="Add"
        @select="selectAddress"
      />
    </van-popup>
  </div>
</template>

<script>
import "../assets/less/pay.less";
import OrderList from "../components/OrderList.vue";
import OrderItem from "../components/OrderItem.vue";
export default {
  name: "Pay",
  components: {
    OrderList,
    OrderItem,
  },

  data() {
    return {
      show: false,
      chosenAddressId: "1",
      list: [],
      //需要购买的商品数据
      products: [],
      //选择地址的id
      chosenAddressId: "",
      //选择当前地址数据
      currentAddress: {},
      //购物袋的sid
      sids: [],
      //商品数量和订单总价
      productInfo: {
        count: 0,
        total: 0,
      },
    };
  },
  created() {
    if (this.$route.query.sids == undefined) {
      return this.$router.push({ name: "Home" });
    }
    this.sids = this.$route.query.sids.split("-");

    //获取地址列表数据
    this.getAddressData();
    //  提交订单页面查询需要购买商品数据
    this.getShopbagBySids();
  },
  methods: {
    // 返回上一级
    back() {
      this.$router.go(-1);
    },
    // 新建
    Add() {
      this.$router.push({ name: "NewAddress" });
    },
    // 显示选择地址列表
    showSelectAddressList() {
      this.show = true;
    },
    //获取地址列表数据
    getAddressData() {
      let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }

     
      this.axios({
        method: "GET",
        url: "/findAddress",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          
          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == 20000) {
            result.data.result.map((v) => {
              v.isDefault = Boolean(v.isDefault);
              v.id = v.aid;
              v.address = `${v.province}${v.city}${v.county}${v.addressDetail}`;
              if (v.isDefault) {
                this.chosenAddressId = v.aid;
                this.currentAddress = v;
              }
            });
            this.list = result.data.result;
          }
        })
        .catch((err) => {
          
        });
    },
    //  提交订单页面查询需要购买商品数据
    getShopbagBySids() {
      let tokenString = localStorage.getItem("__tk");
      if (!tokenString) {
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      this.axios({
        method: "GET",
        url: "/commitShopcart",
        params: {
          appkey: this.appkey,
          tokenString,
          sids: JSON.stringify(this.sids),
        },
      })
        .then((result) => {
          this.$toast.clear();
          
          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == 50000) {
            if (result.data.result.length == 0) {
              //如果没有商品可购买，则跳转到购物袋页面
              return this.$router.push({ name: "Home" });
            }
            result.data.result.map((v) => {
              this.productInfo.count += v.count;
              this.productInfo.total += v.price * v.count;
            });
            this.products = result.data.result;
          } else {
            this.$toast(result.data.msg);
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },
    // 切换地址
    selectAddress(item) {
      this.show = false;
      this.currentAddress = item;
    },
    //结算订单
    pay() {
      let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "POST",
        url: "/pay",
        data: {
          appkey: this.appkey,
          tokenString,
          sids: JSON.stringify(this.sids),
          phone: this.currentAddress.tel,
          address: this.currentAddress.address,
          receiver: this.currentAddress.name,
        },
      })
        .then((result) => {
          this.$toast.clear();
          
          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else {
            this.$toast(result.data.msg);
            setTimeout(() => {
              //跳转到订单页面
              this.$router.push({ name: "Order" });
            });
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },
    //结算提示
    payBox() {
      if (this.currentAddress.address == undefined) {
        this.$toast("地址不能为空");
        return;
      }

      this.$dialog
        .confirm({
          title: "确认订单",
          message: "是否立即结算?",
          confirmButtonColor: "#222779",
        })
        .then(() => {
          //提交订单
          this.pay();
        })
        .catch((err) => {
          
        });
    },
  },
};
</script>

