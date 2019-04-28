<template>
  <div class="wrapper">
    <my-header></my-header>
    <nav-left></nav-left>
    <div class="middle-wrapper">
      <!-- 中间部分路由 -->
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
    <!-- <my-footer></my-footer> -->
  </div>
</template>

<script>
import MyHeader from './layouts/header.vue'
import NavLeft from './layouts/navLeft.vue'
import MyFooter from './layouts/footer.vue'

export default {
  data () {
    return {}
  },
  created () {},
  methods: {},
  components: {
    MyHeader,
    NavLeft,
    MyFooter
  }
}
</script>

<style scoped lang="less">
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  .middle-wrapper {
    margin-left: 200px;
    overflow: hidden;
    // 路由切换动态效果
    .fade-enter-active {
      transition: all 0.5s;
      margin-left: 0;
    }
    .fade-leave-active {
      transition: all 0s;
    }
    .fade-enter {
      opacity: 0;
      margin-left: -100px;
    }
    .fade-leave-to {
      opacity: 0;
    }
  }
}
</style>