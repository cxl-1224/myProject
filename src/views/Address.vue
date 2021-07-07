<template>
  <div class="address">
    <van-nav-bar
      title="地址管理"
      left-text="返回"
      left-arrow
      fixed
      @click-left="back"
      z-index
    />
    <BgBox>
      <div v-if="list.length > 0">
        <van-address-list
          :list="list"
          default-tag-text="默认"
          :switchable="false"
          @add="Add"
          @edit="Edit"
        />
      </div>
      <div v-else>
        <van-empty description="描述文字" />
      </div>
    </BgBox>
  </div>
</template>

<script>
import BgBox from "../components/BgBox";

export default {
  name: "Address",
  components: {
    BgBox,
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getAddressData();
  },
  methods: {
    //返回上一级
    back() {
      this.$router.go(-1);
    },
    //   获取地址列表数据
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
            });

            this.list = result.data.result;
          }
        })
        .catch((err) => {
          
        });
    },
    //   点击新建触发事件
    Add() {
      this.$router.push({ name: "NewAddress" });
    },
    // 点击编辑触发事件
    Edit(item) {
      this.$router.push({ name: "NewAddress", query: { aid: item.aid } });
    },
  },
};
</script>

<style lang="less" scoped>
.address {
  padding: 46px 0 40px;

  /deep/ .van-nav-bar .van-icon {
    color: #222779 ;
  }

  /deep/ .van-nav-bar__text {
    color: #222779 ;
  }

  /deep/ .van-tag--danger {
    background-color: #222779 ;
  }

  /deep/ .van-address-item .van-radio__icon--checked .van-icon {
    background-color: #222779 ;
    border-color: #222779 ;
  }

  /deep/ .van-address-list {
    padding: 0;
  }

  /deep/ .van-address-item {
    padding: 0 0 10px 0;
    border-bottom: 1px solid #e8e8e8;
    &:last-child {
      border-bottom: none;
    }
  }

  /deep/ .van-button--danger {
    background-color: #222779 ;
    border-color: #222779 ;
  }
 /deep/ .bg-box .bg-content[data-v-37cc9f74]{
    height: 450px;
  }
}
</style>
