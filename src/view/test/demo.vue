<template>
  <div class="demo">
    <h1>我就是力量的化身</h1>
    <h2>{{fullName}} -- {{counter}}</h2>
    <p>A -- {{moduleA}}</p>
    <p>B -- {{moduleB}}</p>
    <p>{{textPlus}}</p>
    <div>
      <input type="text" v-focus>
    </div>
    <div>
      <select v-model="select">
        <option v-for="(option,key) in dataObj" :key="key" :value="key">{{option}}</option>
      </select>
      <h1>{{select}}</h1>
      <h2 v-if="select==6">自定义</h2>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'

export default {
  data () {
    return {
      dataObj: {
        1: '今天',
        2: '昨天',
        3: '一周内',
        4: '一月内',
        5: '三月内',
        6: '自定义'
      },
      select: 1
    }
  },
  computed: {
    // ...mapState(['count']),
    // ...mapState({
    //   counter: 'count'
    // }),
    ...mapState({
      counter: (state) => {
        return state.count
      },
      moduleA: (state) => {
        return state.mA.text
      },
      moduleB: (state) => state.mB.text
    }),
    // count () {
    //   return this.$store.state.count
    // },
    // fullName () {
    //   return this.$store.getters.fullName
    // }
    ...mapGetters({
      fullName: 'fullName',
      textPlus: 'mA/textPlus'
    })
  },
  created () {},
  methods: {
    ...mapActions(['updateCountAsync', 'mA/add']),
    ...mapMutations(['updateCount', 'mA/updateText', 'updateText']),
  },
  mounted () {
    // console.log(this.$store)
    // let i = 0
    // setInterval(() => {
    //   this.updateCount({num: i++, num2: 'num2'})
    // }, 1000)

    // this.updateCountAsync({
    //     num: 5,
    //     time: 2000
    // })

    this['mA/updateText']('我是修改后的modulesA')
    this.updateText('hahaha')
    this['mA/add']()
  }
}
</script>

<style scoped lang="less">
.demo {
  h1 {
    text-align: center;
    margin-top: 50px;
  }
  h2 {
    text-align: center;
  }
}
</style>