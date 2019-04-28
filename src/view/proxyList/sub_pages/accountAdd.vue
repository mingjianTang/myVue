<template>
  <div>
    <el-dialog
      title="添加代理账号"
      :visible.sync="show"
      width="60%"
      :before-close="handleClose"
      class="account-add"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      >
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item label="姓名">
          <el-col :span="24">
            <el-input v-model="form.name" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="会员账号">
          <el-col :span="24">
            <el-input v-model="form.userName" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="代理类型">
          <el-col :span="24" class="agent-type-line" v-for="(item,index) in form.agentData" :key="index">
            <el-col :span="4">
              <el-checkbox-group v-model="item.isShowItem">
                <el-checkbox :label="item.AccountType | accountType" name="commission" v-model="item.AccountType"></el-checkbox>
              </el-checkbox-group>
            </el-col>
            <div v-show="item.isShowItem">
              <el-col :span="3">
                <div>返佣规则</div>
              </el-col>
              <el-col :span="6">
                <el-form-item :prop="'agentData.' + index + '.CommissionType'" :rules="{required: item.isShowItem, trigger: 'blur,change', message: 'type'}" :show-message="false">
                  <el-select v-model="item.CommissionType" placeholder="请选择" @change="changeCommissionType(item.CommissionType,index)">
                    <el-option 
                      v-for="(value, key) in commissionType"
                      :key="key"
                      :label="value" 
                      :value="key">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11" class="rule-name-col">
                <el-form-item :prop="'agentData.' + index + '.CommissionId'" :rules="{required: item.isShowItem, trigger: 'blur', message: 'name'}" :show-message="false">
                  <el-select v-model="item.CommissionId" placeholder="请选择" class="rule-name" @change="changeCommissionRule(index)">
                    <el-option 
                      v-for="(i,index) in item.commissiomList"
                      :key="index"
                      :label="i.name" 
                      :value="i.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="notify()">click me</el-button>
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="save('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<style lang="less" scoped>
.account-add {
  .agent-type-line {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .rule-name-col {
    padding-left: 20px;
    .rule-name {
      width: 100%;
    }
  }
}
</style>

<script>
  import pendingEnums from '@/api/services/allEnumerationValueService.js'
  export default {
    name: 'AccountAdd',
    props: {
      isVisible: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        show: false,
        form: {
          name: 'tracy',
          userName: 'tracy001',
          agentData: [
            { AccountType: 1, CommissionType: '', CommissionId: '', commissiomList: [], isShowItem: true },
            { AccountType: 2, CommissionType: '', CommissionId: '', commissiomList: [], isShowItem: true },
            { AccountType: 3, CommissionType: '', CommissionId: '', commissiomList: [], isShowItem: true },
            { AccountType: 4, CommissionType: '', CommissionId: '', commissiomList: [], isShowItem: true }
          ]
        },
        commissionType: pendingEnums.commissionType,
        commissionRule: {
          '1': [
            {
              'id': '7ce05c97-f821-4bef-b729-acacb48ccbe5',
              'name': '二级代理85_82_3',
              'type': 1,
              'status': 0,
              'isAdditional': 1,
              'reserve1': '85',
              'reserve2': '82',
              'reserve3': '3',
              'remark': '二级代理85_82_3'
            },
            {'id': '2bd955ec-cd3a-40c6-a0ec-c58cb1add8ab', 'name': '四级代理85_76_8', 'type': 1, 'status': 0, 'isAdditional': 1, 'reserve1': '85', 'reserve2': '76', 'reserve3': '8', 'remark': '四级代理85_76_8'}, {'id': '75e804ae-6511-4444-856c-d48cb7f1a801', 'name': '总代理85_85', 'type': 1, 'status': 0, 'isAdditional': 1, 'reserve1': '85', 'reserve2': '85', 'reserve3': '0', 'remark': '总代理85_85'}, {'id': '46623bc7-26bf-417d-9c23-edd1eba94131', 'name': '常规返佣claire1', 'type': 1, 'status': 0, 'isAdditional': 0, 'reserve1': '20', 'reserve2': '15', 'reserve3': '5', 'remark': '20-15-5'}, {'id': '9917e35c-ca70-482d-8bbb-fbcef69ffab7', 'name': '三级代理85_78_6', 'type': 1, 'status': 0, 'isAdditional': 1, 'reserve1': '85', 'reserve2': '78', 'reserve3': '6', 'remark': '三级代理85_78_6'}
          ],
          '2': [
            {'id': 'cd2816e2-dab3-4e44-bb9a-4ba4512b5c85', 'name': '12月特殊返佣1', 'type': 2, 'status': 0, 'isAdditional': 1, 'reserve1': '5', 'reserve2': '4', 'reserve3': '3', 'remark': '应用额外的特殊返佣1'}, {'id': '51e82d44-8f97-4474-9136-96def5ef955b', 'name': '12月特殊返佣1-不应用额外', 'type': 2, 'status': 0, 'isAdditional': 0, 'reserve1': '8', 'reserve2': '7', 'reserve3': '6', 'remark': '不应用额外的特殊返佣1'}, {'id': 'b602030a-41b2-4d28-8f7f-c62523f0c25b', 'name': '特殊返佣1claire1', 'type': 2, 'status': 0, 'isAdditional': 0, 'reserve1': '8', 'reserve2': '5', 'reserve3': '9', 'remark': '8-5-9'}
          ],
          '3': [
            {'id': 'bbe8d269-8099-446d-ba77-0ddf96548817', 'name': '特殊返佣2_kelen', 'type': 4, 'status': 0, 'isAdditional': 1, 'reserve1': '35', 'reserve2': '35', 'reserve3': '0', 'remark': '35_35_0'}]
        }
      }
    },
    watch: {
      isVisible (newValue, oldValue) {
        this.show = newValue
      }
    },
    methods: {
      handleClose () {
        // console.log('关闭')
        this.show = false
        this.$emit('dialog', this.show)
      },
      save (formName) {
        console.log(this.form.agentData)
        this.$refs[formName].validate((valid, obj) => {
          // console.log(valid)
          if (valid) {
            // console.log('submit')
            let arr = this.form.agentData.filter((v) => {
              if (v.isShowItem) {
                return v
              }
            })
            this.show = false
            this.$refs[formName].resetFields()
            this.$emit('dialog', arr)
          } else {
            // console.log(obj)
            let typeNum = 0
            let nameNum = 0
            for (let key in obj) {
              if (obj[key][0].message === 'type') {
                typeNum++
              } else if (obj[key][0].message === 'name') {
                nameNum++
              } else {
                return
              }
            }
            // console.log(typeNum,nameNum)
            if (typeNum) {
              this.$notify({
                content: '请选择返佣类型',
                type: 'warning'
              })
            }
            if (nameNum) {
              this.$notify({
                content: '请选择返佣规则',
                type: 'warning'
              })
            }
          }
        })
      },
      changeCommissionType (val, index) {
        // console.log(val,index)
        this.form.agentData[index].commissiomList = this.commissionRule[val]
        // console.log(this.form.agentData[index].commissiomList)
        this.$refs['form'].clearValidate('agentData.' + index + '.CommissionType')
      },
      changeCommissionRule (index) {
        this.$refs['form'].clearValidate('agentData.' + index + '.CommissionId')
      },
      notify () {
        this.$notify({
          content: 'test $notify',
          btn: 'close'
        })
      }
    },
    mounted () {
      // this.$notify({
      //   content: 'test $notify',
      //   type: 'success'
      // })
    }
  }
</script>