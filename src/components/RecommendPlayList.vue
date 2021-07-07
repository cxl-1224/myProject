<template>
  <section class="recommendPlayList">
    <BorderedTitle :condition="true" @next="$emit('next')"><slot></slot></BorderedTitle>
    <div class="list">
      <ul>
        <li v-for="(item, index) in data" :key="index" @click="go(item.id)">
          <div class="img-box">
            <img
              :src="item.picUrl"
              alt=""
            />
            <span class="number"
              ><span class="iconfont icon-erji"></span><span class="num"
                >{{(item.playCount / 10000).toFixed(1)}}万</span
              ></span
            >
          </div>
          <p class="two-text">{{ item.name }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
defa
<script>
import BorderedTitle from "./BorderedTitle";
export default {
  name: "RecommendPlayList",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default: "推荐歌单",
    },
    p: {
      type: String,
      default:
        "通勤解困良曲｜一个节奏唤醒体内活力通勤解困良曲｜一个节奏唤醒体内活力通勤解困良曲｜一个节奏唤醒体内活力",
    },
  },
  components: {
    BorderedTitle,
  },
  methods: {
    go(id){
      this.$router.push({name:'PlayList',query:{id}})
    }
  },
};
</script>

<style scoped lang="less">
.recommendPlayList {
  padding: 0 6px;
  .list {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        background-color: #000;
        width: 118px;
        height: 160px;
        margin-bottom: 14px;
        font-size: 12px;
        .img-box {
          position: relative;
          // width: 123px;
          width: 100%;
          height: 123px;
          img {
            width: 100%;
          }
          .number {
            position: absolute;
            top: 3px;
            right: 0;
            .iconfont{
              margin-right: 2px;
            }
          }
        }
        p {
          padding: 0 2px;
          text-align: left;
        }
      }
    }
  }
}
</style>