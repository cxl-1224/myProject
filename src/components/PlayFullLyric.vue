<template>
  <div @click="$emit('toggle-show-lyric')">
    <div class="view">
      <ul ref="ul" class="lyric-box">
        <li
          ref="li"
          :class="{ active: item.isShow }"
          v-for="(item, index) in lyricArr"
          :key="index"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentMusic", "currentTime"],
  data() {
    return {
      lyricArr: [],
      isFlag: true,
    };
  },
  created() {
    // currentMusic:this
    this.getData();
  },
  methods: {
    // 裁切所需数据
    paresLyric(lyric) {
      // 匹配数字[xx:xx.xx?x]
      var patt = /\[\d{2}:\d{2}\.\d{2,3}\]/gi;
      // 字符切割成数组   清楚最后一个空数组
      var arr = lyric
        .split("\n")
        .filter((e) => e)
        .map((str) => {
          // 每一项字符串匹配正则    把 [ 或者 ] 替换成空''
          var time = str.match(patt)[0].replace(/(\[|\])/gi, "");
          // 把时间转换成秒
          var timeArr = time.split(":");
          time = Number(timeArr[0] * 60 + Number(timeArr[1]));

          // 字符串匹配正则 替换成''
          // 例如 : "[01:41.03]808的鼓点 在我的作品里发力"  替换成   808的鼓点 在我的作品里发力"
          var text = str.replace(patt, "");
          return { time, text, isShow: false };
        });
      return arr;
    },
    // 歌词同步
    synchronization() {
      // console.log(123,this.$props.currentTime);
      let index = this.lyricArr.findIndex((item) => {
        return item.time > this.$props.currentTime;
      });
      this.$refs.ul.style.marginTop = -60 * index + 243 + "px";
      // this.lyricArr[index]
      this.lyricArr.map((item, i) => {
        if (i + 1 == index) {
          // console.log(this.$refs.li[i-1].offsetWidth)
          item.isShow = true;
        } else {
          item.isShow = false;
        }
      });
    },
    getData() {
      // 获取当前音乐数据
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      let id = this.$props.currentMusic.id;
      this.axios.get("/lyric?id=" + id).then((result) => {
        // console.log(result.data.lrc.lyric);
        if (result.data.needDesc) {
          console.log("纯音乐");
          return;
        }
        let lyricArr = result.data.lrc.lyric;
        this.lyricArr = this.paresLyric(lyricArr);
        // console.log(lyricArr);
        this.synchronization();
        this.$toast.clear;
      });
    },
  },
  watch: {
    "$props.currentTime": function () {
      this.synchronization();
    },
    "$props.currentMusic.id": function () {
      this.getData();
    },
  },
};
</script>

<style scoped lang="less">
.view {
  width: 100%;
  height: 400px;
  margin-top: 60px;
  overflow: hidden;
  z-index: 5;
  ul.lyric-box {
    .active {
      color: #ea6e00;
    }
    li {
      margin: 0 auto;
      width: 300px;
      height: 60px;
      line-height: 60px;
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>