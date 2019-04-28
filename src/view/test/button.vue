<template>
  <div class="components-button">
    <button v-on:click="add()">{{obj.number}}——点我加1{{obj.text}}</button>
    <button v-on:click="sendMsgToParent()">向父组件传值</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      obj: this.count
    }
  },
  created () {},
  methods: {
    sendMsgToParent () {
      this.$emit('listenToChildEvent', 'this message is from child')
    },
    add () {
      this.obj.number++
    }
  },
  props: {
    count: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.components-button {
  button {
    background: skyblue;
  }
}
</style>