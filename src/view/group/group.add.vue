<template>
  <div class="middle-content" id="groupAdd">
    <div class="content-header bg-light b-b b-t clearfix">
      <h4 class="title pull-left">
        <span v-if="merchantId">编辑分组</span>
        <span v-else>添加分组</span>
      </h4>
      <div class="pull-right return">
        <router-link to="/groupList"><i class="iconfont icon-Return"></i></router-link>
      </div>
    </div>
    <div class="panel b-b b-t">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="el-row">
          <div class="el-col el-col-20">
            <el-form-item label="分组名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="el-row">
          <div class="el-col el-col-16">
            <el-form-item label="策略" prop="strategy">
              <el-radio-group v-model="ruleForm.strategy">
                <el-radio :label="1">默认</el-radio>
                <el-radio :label="2">权重</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div class="el-row" v-for="(item,index) in ruleForm.weightList" :key="index">
          <div class="el-col el-col-8">
            <el-form-item label="通道" :prop="'weightList.' + index + '.id'" :rules="[{ required: true, message: '请选择通道' }]">
              <el-select v-model="item.id" placeholder="请选择通道" @change="channelChange">
                <el-option
                  v-for="(value,key) in channelList[index]"
                  :key="key"
                  :label="value"
                  :value="key">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col el-col-8" v-if="ruleForm.strategy === 2">
            <el-form-item label="权重" :prop="'weightList.' + index + '.weight'" :rules="[{ required: true, message: '请输入权重' }]">
              <el-input-number v-model="item.weight" :precision="2" :step="1" :min="0"></el-input-number>
            </el-form-item>
          </div>
          <div class="el-col el-col-4">
            <el-button plain icon="el-icon-delete" circle @click="channelDel(index)" v-if="ruleForm.weightList.length>1"></el-button>
            <el-button plain icon="el-icon-plus" circle @click="channelAdd(index)" v-if="ruleForm.weightList.length<channelAllLength"></el-button>
          </div>
        </div>
        <div class="el-row">
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .channel-add-del {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    cursor: pointer;
    i {
      font-size: 24px;
    }
  }
</style>

<script>
  import Vue from 'vue'
  export default {
    name: 'groupAdd',
    props: {
      id: {
        type: [String],
        required: false
      }
    },
    data () {
      return {
        ruleForm: {
          name: '',
          weightList: [],
          strategy: 1
        },
        rules: {
          name: [
            { required: true, message: '请输入分组名称', trigger: 'blur' },
            { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }
          ],
          strategy: [
            { required: true, message: '请选择策略', trigger: 'change' }
          ]
        },
        channelAllLength: 4,
        channelAll: {
          '111111': '通道111',
          '222222': '通道222',
          '333333': '通道333',
          '444444': '通道444'
        },
        channelList: [],
        merchantId: this.$route.query.id
      }
    },
    computed: {
      
    },
    methods: {
      channelAdd (index) {
        this.ruleForm.weightList.splice(index+1, 0, { id: null, weight: 1 })
        this.channelChange()
      },
      channelDel (index) {
        Vue.delete(this.ruleForm.weightList, index)
        Vue.delete(this.channelList, index)
        this.channelChange()
      },
      // 有任一通道select选中时，更新所有的通道select
      channelChange () {
        let otherChannel = this.getOtherChannel()
        let allChannelObj = this.common.copy(this.channelAll)
        this.ruleForm.weightList.forEach((item, index) => {
          let curObjKey = item.id
          this.channelList[index] = this.common.copy(otherChannel)
          if (curObjKey) {
            this.channelList[index][curObjKey] = allChannelObj[curObjKey]
          }
        })
      },
      // 排除已选中的通道select，剩下的即为待选的通道
      getOtherChannel () {
        let arr = this.common.copy(this.channelAll)
        for(let i in arr) {
          for (let y = 0; y < this.ruleForm.weightList.length; y++) {
            if(i === this.ruleForm.weightList[y].id) {
              Vue.delete(arr, i)
            }
          }
        }
        return arr
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          console.log(this.ruleForm)
          let postData = this.common.copy(this.ruleForm)
          if (postData.strategy === 1) {
            postData.weightList.forEach((item, index) => {
              if (item.weight) {
                delete item['weight']
              }
            })
          }
          console.log(postData)
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted () {
      if (this.merchantId) {
        this.ruleForm.strategy = 2
        let requestArr = [
          {
            id: '222222',
            name: '通道222',
            weight: 22
          },
          {
            id: '333333',
            name: '通道333',
            weight: 33
          }
        ]
        requestArr.forEach((item, index) => {
          this.ruleForm.weightList.push({ id: item.id, weight: item.weight })
          this.channelList[index] = this.common.copy(this.channelAll)
        })
        // console.log(this.channelList)
        this.channelChange()
      } else {
        this.ruleForm.weightList = [{}]
        this.channelList[0] = this.common.copy(this.channelAll)
      }
    }
  }
</script>
