<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div 
      :class="['notification', `message-${ type ? type : 'info' }`]"
      :style="style"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
    >
      <span class="content">{{content}}</span>
      <a class="btn" @click="handleClose"><i class="iconfont icon-guanbi"></i></a>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    content: {
      type: String,
      required: true
    },
    type: {
      type: String
    }
  },
  data () {
    return {
      visible: true
    }
  },
  computed: {
    style () {
      return {}
    }
  },
  methods: {
    handleClose (e) {
      e.preventDefault()
      this.$emit('close')
    },
    afterLeave () {
      this.$emit('closed')
    },
    afterEnter () {
    },
    clearTimer () {
    },
    createTimer () {
    }
  }
}
</script>

<style lang="less" scoped>
.notification {
  display: flex;
  background-color: #409EFF;
  box-shadow: 0 4px 12px 0 rgba(42,117,237,.2);
  color: rgba(255,255,255,1);
  border-radius: 2px;
  align-items: center;
  padding: 12px;
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 220px;
  flex-wrap: wrap;
  transition: all 0.3s;
  z-index: 99999;
  &.message-info {
    background-color: #409EFF;
    box-shadow: 0 4px 12px 0 rgba(42,117,237,.2);
  }
  &.message-success {
    background-color: #ffbb5e;
    box-shadow: 0 4px 12px 0 rgba(240,109,107,.2);
  }
  &.message-warning {
    background-color: #f06d6b;
    box-shadow: 0 4px 12px 0 rgba(240,109,107,.2);
  }
  .content {
    padding: 0;
  }
  .btn {
    color: #ff4081;
    padding: 0 10px;
    margin-left: auto;
    cursor: pointer;
    font-weight: 700;
  }
}
</style>
