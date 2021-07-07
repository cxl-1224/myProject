<template>
  <div class="mian">
    <!-- 二级路由 -->
    <div>
      <router-view></router-view>
    </div>
    <!-- 标签栏 -->
    <van-tabbar
      v-model="activeName"
      active-color="#222779"
      inactive-color="#646566"
      route
    >
      <van-tabbar-item
        v-for="(item, index) in tabbarData"
        :key="index"
        :icon="item.icon"
        :name="item.name"
        replace
        :to="item.path"
      >
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.activeImg : item.inactiveImg" />

        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      //激活标签的名称
      activeName: "Home",
      // 标签栏数据
      tabbarData: [
        {
          title: "首页",
          icon: "home-o",

          //标签名称、路由名称
          name: "Home",

          path: "/main/home",

          inactiveImg: require("../assets/images/home.png"),
          activeImg: require("../assets/images/home_active.png"),
        },
        {
          title: "菜单",
          icon: "search",
          name: "Menu",
          path: "/main/menu",
          inactiveImg: require("../assets/images/menu.png"),
          activeImg: require("../assets/images/menu_active.png"),
        },
        {
          title: "购物袋",
          icon: "friends-o",
          name: "Shopbag",
          path: "/main/shopbag",
          inactiveImg: require("../assets/images/shopbag.png"),
          activeImg: require("../assets/images/shopbag_active.png"),
        },
        {
          title: "我的",
          icon: "setting-o",
          name: "My",
          path: "/main/my",
          inactiveImg: require("../assets/images/my.png"),
          activeImg: require("../assets/images/my_active.png")
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.van-tabbar{
  z-index: 100;
}
</style>