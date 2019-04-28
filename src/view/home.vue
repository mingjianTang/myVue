<template>
  <div class="home">
    <h1>心有猛虎，细嗅蔷薇。</h1>
  </div>
</template>
<style scoped lang="less">
h1 {
  margin-top: 50px;
  text-align: center;
  color: #333;
}
h2 {
  // display: none;
  text-align: center;
}
</style>

<script>
export default {
  data () {
    return {
      financialObj: {
        urlKey: '',
        type: '',
        Skip: 0,
        Take: 4,
        OrderByDesc: 'PublishDate'
      }
    }
  },
  created () {
    this.financial(this.financialObj)
  },
  methods: {
    financial (obj) {
      this.$api.home.financialNews(obj).then(res => {
        console.log(res)
      })
    }
  },
  mounted () {
    
  }
}
</script>