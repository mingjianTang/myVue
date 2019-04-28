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
          <div class="el-col el-col-18">
            <el-form-item label="分组名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="el-row">
          <div class="el-col el-col-24">
            <el-form-item label="策略" prop="strategy">
              <el-radio-group v-model="ruleForm.strategy">
                <el-radio :label="1">默认</el-radio>
                <el-radio :label="2">权重</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div class="el-row">
          <div class="el-col el-col-24" v-for="(item,index) in ruleForm.weightList" :key="index">
            <el-form-item label="通道" :prop="'weightList.' + index + '.id'" :rules="[{ required: true, message: '请选择通道', trigger: 'change' }]">
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
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>

<script>
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
      submitForm(formName) {
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted () {
      this.ruleForm.weightList = [{}]
      this.channelList[0] = this.common.copy(this.channelAll)
    }
  }
</script>
