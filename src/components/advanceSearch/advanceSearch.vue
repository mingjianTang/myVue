<template>
  <div class="advance-search">
    <el-button type="primary btn-enter" size="medium" icon="el-icon-plus" @click="toggleModal()">高级搜索</el-button>
    <div class="modal-backdrop" v-show="showModal">
      <div class="modal" :style="mainStyles">
        <div class="modal-header">
          <h3>高级搜索</h3>
        </div>
        <div class="modal-body">
          <div class="row" v-for="(search,index) in searchData" :key="index">
            <div class="option-box option1">
              <select class="form-control" v-model="search.option1" @change="option1Change(search)">
                <option v-for="(option,key) in firstOptions[index]" :key="key" :value="key">
                  {{option.name}}
                </option>
              </select>
            </div>
            <div class="option-box option2" v-if="firstOptions[index][search.option1].level2Options || firstOptions[index][search.option1].type==2 || firstOptions[index][search.option1].type==3">
              <!-- 包含/不包含 -->
              <div v-if="firstOptions[index][search.option1].type==1">
                <select class="form-control" v-model="search.option2">
                  <option v-for="(option,key) in firstOptions[index][search.option1].level2Options" :key="key" :value="key">
                    {{option.name}}
                  </option>
                </select>
              </div>
              <!-- 快速选择时间 -->
              <div v-if="firstOptions[index][search.option1].type==2">
                <select class="form-control" v-model="search.option2" @change="option2Change(search.option2,index)">
                  <option v-for="(option,key) in timeOptions" :key="key" :value="key">
                    {{option}}
                  </option>
                </select>
              </div>
            </div>
            <div class="option-box option3">
              <!-- 输入input框 -->
              <div v-if="firstOptions[index][search.option1].type==0">
                <input class="form-control" type="text" v-model="search.option3">
              </div>
              <!-- 选择level3Options -->
              <div v-if="firstOptions[index][search.option1].type==1">
                <select class="form-control" v-model="search.option3">
                  <option v-for="(option,key) in firstOptions[index][search.option1].level3Options" :key="key" :value="key">
                    {{option}}
                  </option>
                </select>
              </div>
              <!-- 自定义时间 -->
              <div v-if="firstOptions[index][search.option1].type==2&&search.option2==6">
                <el-date-picker
                  class="advance-search-date"
                  v-model="search.option3"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="start"
                  end-placeholder="end"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </div>
            </div>
            <div class="pull-right operate">
              <el-button plain icon="el-icon-delete" circle @click="deleteOptions(index)" v-if="searchData.length>1"></el-button>
              <el-button plain icon="el-icon-plus" circle @click="addOptions()" v-if="searchData.length>0&&searchData.length<dataLength"></el-button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <el-button plain size="small" @click="closeSelf">取消</el-button>
          <el-button type="primary" size="small" @click="confirm">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'AdvanceSearch',
  props: {
    width: {
      type: [Number, String],
      default: 900
    },
    options: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showModal: false,
      searchData: [],
      firstOptions: [],
      timeOptions: {
        1: '今天',
        2: '昨天',
        3: '一周内',
        4: '一月内',
        5: '三月内',
        6: '自定义'
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  computed: {
    // 设置模态框宽度
    mainStyles () {
      let style = {}
      if (this.width < 900) {
        style.width = `900px`
      } else {
        style.width = `${parseInt(this.width)}px`
      }
      return style
    },
    dataLength () {
      let arr = Object.keys(this.options)
      return arr.length
    },
    todayString () {
      let str = moment(new Date()).format('YYYY-MM-DD')
      return str
    }
  },
  created () {
    this.searchData.push(this.setInitData())
    this.firstOptions.push(this.options)
  },
  methods: {
    toggleModal () {
      this.showModal = true
    },
    closeSelf () {
      this.showModal = false
      this.searchData = [this.setInitData()]
      this.firstOptions = [this.options]
    },
    confirm () {
      let dataObj = {}
      for (let item of this.searchData) {
        if (this.options[item.option1].type === 2) { // 值为时间
          dataObj[item.option1] = this.getTimeArray(item)
        } else if (this.options[item.option1].type === 3) { // 值为月份

        } else if (this.options[item.option1].level2Options) { // 有2级菜单
          dataObj[item.option1] = this.options[item.option1].level2Options[item.option2].value + item.option3
        } else { // 没有2级菜单
          dataObj[item.option1] = item.option3
        }
      }
      this.showModal = false
      this.$emit('modalData', dataObj)
      this.searchData = [this.setInitData()]
      this.firstOptions = [this.options]
    },
    // 设置新搜索条件的初始值
    setInitData (param) {
      let obj = {}
      if (!param) {
        obj = JSON.parse(JSON.stringify(this.options))
      } else {
        obj = param
      }
      let initData = {}
      for (let key in obj) {
        initData.option1 = key
        if (obj[key].level2Options || obj[key].type === 2) {
          initData.option2 = '1'
        } else {
          initData.option2 = ''
        }
        if (obj[key].level3Options) {
          initData.option3 = this.getFirstKey(obj[key].level3Options)
        } else {
          initData.option3 = ''
        }
        return initData
      }
    },
    // 获取新的option1
    filterFirstOptions () {
      let obj = JSON.parse(JSON.stringify(this.options))
      // 删除已有的选项
      for (let item of this.searchData) {
        delete obj[item.option1]
      }
      return obj
    },
    // 增加，删除，更改option1时触发的事件--整理各个option1待选项
    filterAllFirstOptions () {
      this.firstOptions.forEach((item, index) => {
        var curObjKey = this.searchData[index].option1
        this.firstOptions[index] = JSON.parse(JSON.stringify(this.options))
        this.searchData.forEach((v, i) => {
          if (v.option1 !== curObjKey) {
            delete this.firstOptions[index][v.option1]
          }
        })
      })
    },
    // 增加查询条件
    addOptions () {
      let obj = this.filterFirstOptions()
      // console.log(obj)
      this.firstOptions.push(obj)
      this.searchData.push(this.setInitData(obj))
      this.filterAllFirstOptions()
    },
    // 删除查询条件
    deleteOptions (index) {
      this.searchData.splice(index, 1)
      this.firstOptions.splice(index, 1)
      this.filterAllFirstOptions()
    },
    // 改变option1
    option1Change (item) {
      // console.log(item)
      let curobj = this.options[item.option1]
      // 设置初始条件
      if (curobj.level2Options || curobj.type === 2) {
        // 有定义2级或者二级为时间
        // 由于二级选项为符号，这里值限定为从1开始
        item.option2 = '1'
      } else {
        item.option2 = ''
      }
      if (curobj.level3Options) {
        item.option3 = this.getFirstKey(curobj.level3Options)
      } else {
        item.option3 = ''
      }
      this.filterAllFirstOptions()
    },
    // 改变option2
    option2Change (val, index) {
      if (val === '6') {
        this.searchData[index].option3 = [this.todayString, this.todayString]
      }
    },
    // 获取对象的第一个属性
    getFirstKey (obj) {
      for (let key in obj) {
        return key
      }
    },
    // 根据时间条件获取时间数组
    getTimeArray (obj) {
      let dateFormatArr = []
      const curDateformate = this.getDateStr(0)
      const yesterday = this.getDateStr(-1)
      const weekday = this.getDateStr(-7)
      const monthday = this.getDateStr(-30)
      const month3day = this.getDateStr(-90)
      switch (parseInt(obj.option2)) {
        case 1:
          dateFormatArr[0] = curDateformate + ' 00:00:00'
          dateFormatArr[1] = curDateformate + ' 23:59:59'
          break
        case 2:
          dateFormatArr[0] = yesterday + ' 00:00:00'
          dateFormatArr[1] = yesterday + ' 23:59:59'
          break
        case 3:
          dateFormatArr[0] = weekday + ' 00:00:00'
          dateFormatArr[1] = curDateformate + ' 23:59:59'
          break
        case 4:
          dateFormatArr[0] = monthday + ' 00:00:00'
          dateFormatArr[1] = curDateformate + ' 23:59:59'
          break
        case 5:
          dateFormatArr[0] = month3day + ' 00:00:00'
          dateFormatArr[1] = curDateformate + ' 23:59:59'
          break
        case 6:
          dateFormatArr[0] = obj.option3[0] + ' 00:00:00'
          dateFormatArr[1] = obj.option3[1] + ' 23:59:59'
          break
      }
      return dateFormatArr
    },
    // 获取日期
    getDateStr (addDayCount) {
      const dd = new Date()
      dd.setDate(dd.getDate() + addDayCount)
      let y = dd.getFullYear()
      let m = dd.getMonth() + 1
      let d = dd.getDate()
      return y + '-' + m + '-' + d
    }
  },
  mounted () {
    // console.log(this.searchData)
    // console.log(this.firstOptions)
  }
}
</script>

<style lang="less" scoped>
.modal-backdrop { 
  position: fixed; 
  top: 0; 
  right: 0; 
  bottom: 0; 
  left: 0; 
  background-color: rgba(0,0,0,.3); 
  display: flex; 
  justify-content: center; 
  align-items: center;
  z-index: 999;
  .modal { 
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff; 
    box-shadow: 2px 2px 20px 1px; 
    overflow-x:auto; 
    border-radius: 10px;
    width: 900px;
    .modal-header { 
      border-bottom: 1px solid #eee; 
      justify-content: space-between;
      padding: 15px; 
      display: flex;
      h3 {
        font-size: 24px;
        margin: 0;
      }
    }
    .modal-footer { 
      border-top: 1px solid #eee; 
      justify-content: flex-end;
      padding: 15px; 
      display: flex; 
    }
    .modal-body { 
      position: relative; 
      padding: 20px 10px;
      .row {
        height: 50px;
        .option-box {
          display: inline-block;
          padding: 0 8px;
          width: 25%;
          vertical-align: top;
          margin-top: 4px;
          .form-control {
            display: block;
            width: 100%;
            height: 34px;
            box-sizing: border-box;
            border-radius: 2px;
            padding: 6px 12px;
            font-size: 14px;
            background-color: #fff;
            border: 1px solid #ccc;
          }
          .advance-search-date {
            width: 250px;
            height: 35px;
            transform: translateY(-1px);
            border-color: #ccc;
            border-radius: 2px;
          }
        }
      } 
    }
  } 
}
</style>
