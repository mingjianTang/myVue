<template>
  <div class="middle-content pendingitem-audit" id="pendingitemAudit">
    <div class="content-header bg-light b-b b-t">
      <div class="clearfix">
        <h4 class="title pull-left">{{auditType}}</h4>
        <div class="pull-right return" @click="back()">
          <i class="iconfont icon-Return"></i>
        </div>
      </div>
    </div>
    <div class="panel b-b b-t">
      <div class="content-operate">
          <div class="audit-btn-wrapper pull-right clearfix">
            <el-button type="success" @click.once="saveAudit()">审核通过</el-button>
            <el-button type="danger" @click.once="returnAudit()">审核退回</el-button>
          </div>
      </div>
      <el-form ref="form" label-width="80px">
        <div class="secion-group-title bg-light ng-binding">审核信息</div>
        <el-form-item label="审核备注">
          <el-input type="textarea"></el-input>
        </el-form-item>
        <div class="secion-group-title bg-light ng-binding">基本资料</div>
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
.pendingitem-audit {
  .panel {
    padding: 0 15px;
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
export default {
  data () {
    return {
      formData: {
        relevantName: this.$route.query.relevantName
      }
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
    saveAudit () {
      this.$message({
        message: '审核通过',
        type: 'success'
      })
    },
    returnAudit () {
      this.$message({
        message: '审核通过',
        type: 'success'
      })
    }
  },
  mounted () {
    console.log(this.$route.query)
  }
}
</script>
