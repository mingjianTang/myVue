<template>
  <div class="middle-content" id="group">
    <div class="content-header bg-light b-b b-t">
      <h4 class="title">通道列表</h4>
    </div>
    <div class="panel b-b b-t">
      <div class="content-operate">
        <div class="pull-left" style="margin-top: 10px;">
          <el-button type="success" size="medium" icon="el-icon-plus" @click="groupAdd()">添加</el-button>
          <el-button type="warning" size="medium" icon="el-icon-edit" @click="groupEdit()" :disabled="multipleSelection.length===0">修改</el-button>
        </div>
      </div>
      <div class="content-box-grid">
        <el-table ref="multipleTable" :data="tableData" border style="width: 100%" highlight-current-row @current-change="handleSelectionChange">
          <el-table-column label="" width="50" align="center">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.checked"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商户名称" min-width="120"></el-table-column>
          <el-table-column prop="group" label="分组名称" min-width="120"></el-table-column>
          <el-table-column prop="email" label="通道" min-width="140"></el-table-column>
          <el-table-column prop="strategy" label="策略" min-width="120">
            <template slot-scope="scope">{{ scope.row.strategy | strategy }}</template>
          </el-table-column>
          <el-table-column label="更新时间" min-width="150">
            <template slot-scope="scope">
              <span>
                {{scope.row.updatedOn | formatDate}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" min-width="150">
            <template slot-scope="scope">{{ scope.row.createdOn | formatDate }}</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .panel .content-operate {
    margin: 0;
  }
</style>

<script>
export default {
  name: 'groupList',
  data () {
    return {
      tableData: [
        {'memberId': '346e42bc-55a6-4317-8e3b-2057918805ce', 'name': '领峰', 'email': '971768572@qq.com', 'type': 0, 'group': '分组1', 'groupId': '3569a5ce-c723-40bc-8dce-9d078fe77a3e', 'strategy': 1, 'strategyId': '00000000-0000-0000-0000-000000000000', 'customerService': 'cs001', 'customerServiceId': '90e376a7-5a0a-4add-8cd5-3accb0f3795b', 'ruleReserve': '[{"AccountType":1,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"75e804ae-6511-4444-856c-d48cb7f1a801"}]', 'createdBy': 'Admin', 'createdOn': '2018-12-29T10:21:19.28+08:00', 'updatedBy': 'Admin', 'updatedOn': '2018-12-29T10:21:19.28+08:00', 'id': '7a161268-6cc2-4583-abd2-c239f4e70d75'}, 
        {'memberId': '428d1ca1-51d1-4aae-8580-278928758e7e', 'name': '铸博', 'email': '2276928595@qq.com', 'type': 0, 'group': '分组2', 'groupId': '3569a5ce-c723-40bc-8dce-9d078fe77a3e', 'strategy': 2, 'strategyId': '00000000-0000-0000-0000-000000000000', 'customerService': 'kefutest', 'customerServiceId': '43bf7398-18dc-4d3e-9f65-27502008d00f', 'ruleReserve': '[{"AccountType":1,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"fd0ce9a6-d659-410b-9510-21368b7afdf8"}]', 'createdBy': 'Admin', 'createdOn': '2018-12-25T10:58:37.647+08:00', 'updatedBy': 'Admin', 'updatedOn': '2018-12-25T10:58:37.647+08:00', 'id': 'fa8c82df-593b-4dc4-a83d-1eee0e967c7b'}, 
        {'memberId': '8a41ef00-348d-4b9c-a44c-454ae228be91', 'name': '创富', 'email': '971768572@qq.com', 'type': 0, 'group': '分组3', 'groupId': '90e376a7-5a0a-4add-8cd5-3accb0f3795b', 'strategy': 2, 'strategyId': '00000000-0000-0000-0000-000000000000', 'customerService': 'cs001', 'customerServiceId': '90e376a7-5a0a-4add-8cd5-3accb0f3795b', 'ruleReserve': '[{"AccountType":1,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"d45cc87a-ed62-476f-9e88-1ebaa7fc2697"},{"AccountType":2,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"e99fade7-1e94-49ac-9e93-58425fb8865b"}]', 'createdBy': 'cs001', 'createdOn': '2018-12-25T10:54:01.94+08:00', 'updatedBy': 'cs001', 'updatedOn': '2018-12-25T10:54:01.94+08:00', 'id': '24376e2b-d2ec-45d0-bca0-751a3f932c6e'}, 
        {'memberId': '5b8cd567-47e4-44bf-8fb3-e602df02c375', 'name': '领峰环球', 'email': '2276928595@qq.com', 'type': 0, 'group': '分组4', 'groupId': '3569a5ce-c723-40bc-8dce-9d078fe77a3e', 'strategy': 1, 'strategyId': '00000000-0000-0000-0000-000000000000', 'customerService': 'kelenagent', 'customerServiceId': '562f938b-0a1c-4c25-b2ba-02f1a0695290', 'ruleReserve': '[{"AccountType":1,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"86f312fa-f50a-4d8b-8989-f9263e817430"},{"AccountType":2,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"86f312fa-f50a-4d8b-8989-f9263e817430"}]', 'createdBy': 'Admin', 'createdOn': '2018-12-24T18:46:38.86+08:00', 'updatedBy': 'Admin', 'updatedOn': '2018-12-24T18:46:38.86+08:00', 'id': 'b16c4089-78b7-4115-8e71-9bdfe861503a'}
      ],
      multipleSelection: {}
    }
  },
  methods: {
    handleSelectionChange (row) {
      // console.log(row)
      this.tableData.forEach(item => {
        if (item.id !== row.id) {
          item.checked = false
        }
      })
      this.multipleSelection = row;
    },
    groupAdd () {
      this.$router.push({
        path: '/groupAdd'
      })
    },
    groupEdit() {
      // console.log(this.multipleSelection)
      const obj = this.common.copy(this.multipleSelection)
      this.$router.push({
        path: '/groupAdd',
        query: {
          id: obj.id
        }
      })
    }
  },
  mounted () {

  }
}
</script>