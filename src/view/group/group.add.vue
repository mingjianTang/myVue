<template>
  <div class="middle-content" id="groupAdd">
    <div class="content-header bg-light b-b b-t clearfix">
      <h4 class="title pull-left">通道列表</h4>
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
              <el-select v-model="item.id" placeholder="请选择通道">
                <el-option
                  v-for="(v,i) in channelList[index]"
                  :key="i"
                  :label="v.name"
                  :value="v.id">
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
            <el-button plain icon="el-icon-plus" circle @click="channelAdd(index)" v-if="ruleForm.weightList.length<channelAll.length"></el-button>
          </div>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="haha()">点我呀</el-button>
        </el-form-item>
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
        channelAll: [
          {
            id: '111111111',
            name: '通道111'
          },
          {
            id: '222222222',
            name: '通道222'
          },
          {
            id: '333333333',
            name: '通道333'
          },
          {
            id: '444444444',
            name: '通道444'
          }
        ],
        channelList: []
      }
    },
    computed: {
      
    },
    methods: {
      channelAdd (index) {
        this.ruleForm.weightList.splice(index+1, 0, { id: null, weight: 1 })
        this.channelList.splice(index+1, 0, this.common.copy(this.channelAll))
      },
      channelDel (index) {
        Vue.delete(this.ruleForm.weightList, index)
        Vue.delete(this.channelList, index)
      },
      // 有任一通道select选中时，更新所有的通道select
      channelChange () {

      },
      // 排除已选中的通道select，剩下的即为待选的通道
      getOtherChannel () {
        let arr = this.common.copy(this.channelAll)
        for(let i = 0; i < arr.length; i++) {
          for (let y = 0; y < this.ruleForm.weightList.length; y++) {
            if(arr[i].id === this.ruleForm.weightList[y].id) {
              arr.splice(i,1)
              i--
              break
            }
          }
        }
        return arr
      },
      haha () {
        console.log(this.getOtherChannel())
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          console.log(this.ruleForm)
          // if (valid) {
          //   alert('submit!');
          // } else {
          //   console.log('error submit!!');
          //   return false;
          // }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted () {
      this.ruleForm.weightList = [{}]
      this.channelList[0] = this.common.copy(this.channelAll)
    }
  }
</script>
