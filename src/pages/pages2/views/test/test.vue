/**
 * @ Author: yxs
 * @ 测试页面
 */
<template>
  <div>
    <div>这是一个测试页面</div>
    <img src="../../assets/logo.png">
    <HelloWorld></HelloWorld>
    <Test></Test>
  </div>
</template>

<script>
import HelloWorld from '../../../../components/HelloWorld'
import Test from '../../components/Test.vue'

export default {
  components: {
    HelloWorld, Test
  },
  mounted() {
    setTimeout(() => {
      this.$toast('测试')
    }, 1000);
  }
}
</script>

<style>

</style>