<template>
  <div class="middle-content pendingitem-audit" id="pendingitemAudit">
    <div class="content-header bg-light b-b b-t">
      <div class="clearfix">
        <h4 class="title pull-left">{{auditType}}详情</h4>
        <div class="pull-right return" @click="back()">
          <i class="iconfont icon-Return"></i>
        </div>
      </div>
    </div>
    <div class="panel b-b b-t">
      <el-form ref="form" label-width="80px">
        <div class="secion-group-title bg-light ng-binding">审核信息</div>
        <div class="el-row">
          <div class="el-col el-col-12">
            <el-form-item label="创建时间">
              <el-input v-model="formData.createdOn" @input="textTransform($event)" :disabled="true"></el-input>
            </el-form-item>
          </div>
          <div class="el-col el-col-12">
            <el-form-item label="处理时间">
              <el-input v-model="formData.updatedOn" :disabled="true"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="el-row">
          <div class="el-col el-col-12">
            <el-form-item label="处理人">
              <el-input v-model="formData.updatedBy" :disabled="true"></el-input>
            </el-form-item>
          </div>
          <div class="el-col el-col-12">
            <el-form-item label="处理状态">
              <el-input v-model="formData.status" :disabled="true"></el-input>
            </el-form-item>
          </div>
        </div>
        <el-form-item label="审核备注">
          <el-input type="textarea" :disabled="true" v-model="formData.approveRemark"></el-input>
        </el-form-item>
        <div class="secion-group-title bg-light ng-binding">基本资料</div>
        <div class="el-row">
          <div class="el-col el-col-12">
            <el-form-item label="会员账号">
              <el-input v-model="formData.relevantName" :disabled="true"></el-input>
            </el-form-item>
          </div>
          <div class="el-col el-col-12">
            <el-form-item label="昵称">
              <el-input :disabled="true"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.pendingitem-audit {
  .panel {
    padding: 15px 15px 0;
    .content-operate {
      margin: 15px 0;
      .audit-btn-wrapper {
        margin-top: 10px;
        button {
          margin-right: 10px;
        }
      }
    }
    form {
      .secion-group-title {
        height: 48px;
        line-height: 48px;
        font-size: 18px;
        padding-left: 25px;
        margin-bottom: 20px;
      }
      .el-form-item {
        padding-left: 16px;
        padding-right: 30px;
      }
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
      formData: {}
    }
  },
  computed: {
    auditType () {
      const type = this.$route.query.type
      let auditType = ''
      if (type === 1) {
        auditType = '代理申请审核'
      } else if (type === 2) {
        auditType = '月结单审核'
      } else if (type === 3) {
        auditType = '佣金审核'
      } else {
        auditType = ''
      }
      return auditType
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    getMemberInfo () {
      this.formData = {
        approveAccount: 'Admin',
        approveRemark: '代理申请审核详情',
        approveTime: '2018-12-28T16:55:39.643+08:00',
        approveUrl: null,
        itemId: '666362c8-d545-4714-92a6-34e1b0fc2b6e',
        relevantID: 'd01b8a88-1508-45f6-8bf5-334e280e235a',
        relevantName: this.$route.query.relevantName,
        sources: 0,
        status: 1,
        type: 1,
        createdBy: 'Admin',
        createdOn: '2018-12-17T15:37:46.83+08: 00',
        updatedBy: 'Admin',
        updatedOn: '2018-12-28T16:55:39.647+08:00',
        id: '19066442-9c91-4044-a25e-29126900b627'
      }
      this.formData.createdOn = this.timeFormat(this.formData.createdOn)
      this.formData.updatedOn = this.timeFormat(this.formData.updatedOn)
      this.formData.status = enumMapData.pendingStatus[this.formData.status]
    },
    timeFormat (value) {
      return moment(value.replace(/T/, ' ')).format('YYYY-MM-DD HH:ss:mm')
    }
  },
  mounted () {
    // console.log(this.$route.query)
    // console.log(enumMapData)
    this.getMemberInfo()
  }
}
</script>
