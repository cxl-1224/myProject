<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
  body{
    background-color: rgb(243, 243, 243);

  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    color: #646566;
  }
  .auto-img{
    width: 100%;
    display: block;
  }
  .clearfix::after{
    content: "";
    display: block;
    clear: both;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }

  .one-text{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
// color: #222779 ;
</style>

