<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods:{
    // 屏幕适配
    setRem() {
      var windowWidth = document.body.offsetWidth;
      var RootFontSize = windowWidth / 750 * 100;
      document.getElementsByTagName("html")[0].style.fontSize = RootFontSize + "px";
      if(screen&&screen.availHeight>800){
        // document.getElementsByTagName("html")[0].style.paddingBottom = "34px"
        document.getElementsByTagName("html")[0].style.height = "calc(100vh - 34px)"
      }
    }
  },
  created(){
    // console.log(Paho)
    this.setRem();
    window.onresize = ()=> {
      this.setRem();
    }
  }
}
</script>

<style lang='less'>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
  #app {
    font-size: 0.3rem;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
