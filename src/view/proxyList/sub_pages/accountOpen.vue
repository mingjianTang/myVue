<template>
  <div class="middle-content pendingitem-audit" id="pendingitemAudit">
    <div class="content-header bg-light b-b b-t">
      <div class="clearfix">
        <h4 class="title pull-left">开户申请</h4>
        <div class="pull-right return" @click="$router.back(-1)">
          <i class="iconfont icon-Return"></i>
        </div>
      </div>
    </div>
    <div class="panel b-b b-t">
      <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="80px">
        <div class="secion-group-title bg-light-blue">基本资料</div>
        <div class="el-row">
          <div class="el-col el-col-12">
            <el-form-item label="会员账号" prop="relevantName">
              <el-input v-model="formData.relevantName"></el-input>
            </el-form-item>
          </div>
          <div class="el-col el-col-12">
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="formData.nickName"></el-input>
            </el-form-item>
          </div>
          <div class="el-col el-col-12">
            <el-form-item label="会员密码">
              <el-input v-model="formData.password"></el-input>
            </el-form-item>
          </div>
          <div class="el-col el-col-12">
            <el-form-item label="推荐人">
              <el-input v-model="formData.inviter"></el-input>
            </el-form-item>
          </div>
          <div class="el-col el-col-12">
            <el-form-item label="客服" prop="customerService">
              <el-select v-model="formData.customerService" placeholder="请选择客服" style="width: 100%">
                <el-option v-for="(item,index) in customerServiceList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="secion-group-title bg-light-blue">申请表信息</div>
        <div class="el-row">
          <div class="el-col el-col-12">
            <el-form-item label="会员账号">
              <el-input v-model="formData.relevantName"></el-input>
            </el-form-item>
          </div>
          <div class="el-col el-col-12">
            <el-form-item label="昵称">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .panel {
    form {
      .secion-group-title {
        color: #fff;
      }
    }
  }
</style>

<script>
import moment from 'moment'
import enumMapData from '@/api/services/allEnumerationValueService'
export default {
  data () {
    return {
      formData: {},
      rules: {
        relevantName: [
          {required: true, message: '请输入会员账户', trigger: 'blur'}
        ],
        nickName: [
          {required: true, message: '请输入昵称', trigger: 'blur'}
        ],
        customerService: [
          { required: true, message: '请选择客服', trigger: 'change' }
        ]
      },
      customerServiceList: []
    }
  },
  computed: {

  },
  methods: {
    timeFormat (value) {
      return moment(value.replace(/T/, ' ')).format('YYYY-MM-DD HH:ss:mm')
    },
    getCustomerServiceList () {
      this.customerServiceList = [
        { name: '客服1', id: '10001' },
        { name: '客服2', id: '10002' },
        { name: '客服3', id: '10003' },
        { name: '客服4', id: '10004' }
      ]
    }
  },
  mounted () {
    this.getCustomerServiceList()
  }
}
</script>
