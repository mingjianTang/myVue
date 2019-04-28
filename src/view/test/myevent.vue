<template>
  <div>
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >我是checkbox
  </div>
</template>

<script>
export default {
  data () {
    return {
      prop: 'checked',
      event: 'change'
    }
  },
  created () {},
  methods: {},
  props: {
    checked: Boolean
  }
}
</script>

<style scoped lang="less">
</style>