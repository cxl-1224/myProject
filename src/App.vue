<template>
  <div id="app">
    <keep-alive>
      <router-view
        v-bind:music.sync="music"
        :paused="paused"
        @update:allMusicData="allMusicData = $event"
        @update:music="allMusicData = $event"
      />
    </keep-alive>
    <Play
      v-if="music"
      :currentMusic="music.item"
      :currentIndex="music.index"
      @update:paused="paused = $event"
      :allMusicData="allMusicData"
      @update:music="music = $event"
    />
  </div>
  <!-- @update:music="currentMusic = $event"
      :currentMusic="currentMusic" -->
</template>
<script>
import Play from "./components/Play";
export default {
  data() {
    return {
      music: null,
      paused: null,
      allMusicData: null,
    };
  },
  components: {
    Play,
  },
};
</script>
<style>
/* .xxx {
  height: 300px;
  background-color: #fff;
} */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  color: #f5f5f5;
  font-size: 14px;
  padding-bottom: 70px;
}
/* This changes all the animations globally */
:root {
  --animate-duration: 1000ms;
  /* --animate-delay: 0.9s; */
}
body {
  background-color: #000;
  /* background-color: #f5f5f5; */
}
ul,
li,
p,
h1,
h2,
h3,
h4,
h5,
h6,
input {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.one-text {
  width: 200px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.two-text {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
