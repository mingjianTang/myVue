<template>
  <div class="header">
    <div class="project-title">
      <router-link to="/">代理管理后台</router-link>
    </div>
    <div class="navbar-collapse">
      <div class="admin pull-right">
        <div class="pull-left">Admin</div>
        <div class="pull-left">
          <img src="../assets/images/b19.jpg" alt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
.header {
  height: 50px;
  background-color: #fff;
  .project-title {
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    height: 50px;
    line-height: 50px;
    color: #c4d0d9;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    z-index: 30;
  }
  .navbar-collapse {
    height: 50px;
    margin-left: 200px;
    position: relative;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05);
    .admin {
      width: 100px;
      height: 50px;
      line-height: 50px;
    }
    img {
      display: block;
      width: 40px;
      height: 40px;
      margin: 5px 0 0 10px;
    }
  }
}
</style>
