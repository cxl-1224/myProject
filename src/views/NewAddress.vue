<template>
  <div class="new-address">
    <van-nav-bar
      :title="aid ? '编辑地址' : '新增地址'"
      left-text="返回"
      left-arrow
      fixed
      @click-left="back"
    />
    <van-address-edit
      :area-list="areaList"
      show-postal
      :show-delete="!!aid"
      show-set-default
      :area-columns-placeholder="['选择省', '选择市', '选择区']"
      :address-info="addressInfo"
      save-button-text="保存地址"
      @save="save"
      @delete="removeAddress"
    />
  </div>
</template>

<script>
import areaList from "../assets/js/area";

export default {
  name: "NewAddress",

  data() {
    return {
      areaList,

      //地址初始值
      addressInfo: {},
      //地址aid
      aid: "",
    };
  },
  created() {
    this.aid = this.$route.query.aid;
    if (this.aid) {
      this.getAddressDataByAid();
    }
  },

  methods: {
    //返回上一级
    back() {
      this.$router.go(-1);
    },

    //保存地址
    save(content) {
      let tokenString = localStorage.getItem("__tk");
      if (!tokenString) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }

      
      //复制content
      let addressInfo = Object.assign({}, content);

      //删除多余的属性country
      delete addressInfo.country;

      addressInfo.tokenString = tokenString;
      addressInfo.appkey = this.appkey;
      addressInfo.isDefault = Number(addressInfo.isDefault);

      

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      if (!this.aid) {
        //新增地址
        this.address(addressInfo, "/addAddress");
      } else {
        let isModify = false;
        for (let key in this.addressInfo) {
          if (content[key] != this.addressInfo[key]) {
            isModify = true;
          }
        }
        if (isModify) {
          this.address(addressInfo, "/editAddress");
        } else {
           this.$toast("请修改地址信息");
        }
      }
    },

    //新增地址
    address(addressInfo, url) {
      this.axios({
        method: "POST",
        url,
        data: addressInfo,
      })
        .then((result) => {
          this.$toast.clear();
          
          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == 9000 || result.data.code == 30000) {
            setTimeout(() => {
              this.$router.push({ name: "Address" });
            },1000)
          }
          this.$toast(result.data.msg);
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    //根据地址aid查询地址数据
    getAddressDataByAid() {
      let tokenString = localStorage.getItem("__tk");
      if (!tokenString) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }


      this.axios({
        method: "GET",
        url: "/findAddressByAid",
        params: {
          appkey: this.appkey,
          tokenString,
          aid: this.aid,
        },
      })
        .then((result) => {
          
          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == 40000) {
            let data = result.data.result[0];
            data.isDefault = Boolean(data.isDefault);
            this.addressInfo = data;
          }
        })
        .catch((err) => {
          
        });
    },
     //删除地址
    removeAddress() {
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
        url: "/deleteAddress",
        data: {
          appkey: this.appkey,
          tokenString,
          aid: this.aid
        }
      })
        .then((result) => {
          this.$toast.clear();
          
          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == 10000) {
            setTimeout(() => {
              this.$router.push({name: 'Address'});
            }, 800)
          }

          this.$toast(result.data.msg);

        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    }
  },
};
</script>

<style lang="less" scoped>
.new-address {
  padding-top: 46px;
  /deep/ .van-nav-bar .van-icon {
    color: #222779;
  }

  /deep/ .van-nav-bar__text {
    color: #222779;
  }

  /deep/ .van-button--danger {
    background-color: #222779;
    border-color: #222779;
  }

  /deep/ .van-switch--on {
    background-color: #222779;
  }
}
</style>