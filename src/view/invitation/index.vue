<template>
  <div class="middle-content" id="invitation">
    <div class="content-header bg-light b-b b-t">
      <h4 class="title">邀请列表</h4>
    </div>
    <div class="panel b-b b-t">
      <div class="content-operate">
        <div class="pull-left" style="margin-top: 10px;">
          <el-button type="success" size="medium" icon="el-icon-plus" @click="dialogFormVisible = true">邀请</el-button>
          <el-dialog title="邀请" :visible.sync="dialogFormVisible">
            <el-form :model="invitationForm">
              <el-form-item label="被邀请人姓名" :label-width="formLabelWidth">
                <el-input autocomplete="off" v-model="invitationForm.name"></el-input>
              </el-form-item>
              <el-form-item label="被邀请人邮箱" :label-width="formLabelWidth">
                <el-input autocomplete="off" v-model="invitationForm.email"></el-input>
              </el-form-item>
              <el-form-item label="客服" :label-width="formLabelWidth">
                <el-input autocomplete="off" v-model="invitationForm.customerService"></el-input>
              </el-form-item>
              <el-form-item label="推荐人" :label-width="formLabelWidth">
                <el-input autocomplete="off" v-model="invitationForm.referrer"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelInvitation()">取 消</el-button>
              <el-button type="primary" @click="sendInvitation()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="pull-right" style="margin-top: 10px;">
          <advance-search :width="900" :options="dataOptions" @modalData="getDataByAdSearch"></advance-search>
        </div>
      </div>
      <div class="content-box-grid">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="被邀请人姓名" min-width="120"></el-table-column>
          <el-table-column prop="email" label="被邀请人邮箱" min-width="120"></el-table-column>
          <el-table-column prop="referrer" label="推荐人" min-width="120"></el-table-column>
          <el-table-column prop="inviter" label="邀请人" min-width="120"></el-table-column>
          <el-table-column prop="customerService" label="客服" min-width="120"></el-table-column>
          <el-table-column label="邀请时间" min-width="150">
            <template slot-scope="scope">
              {{scope.row.createdOn | formatDate}}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style lang="less">

</style>

<script>
export default {
  data () {
    return {
      tableData: [
        {'memberId': '346e42bc-55a6-4317-8e3b-2057918805ce', 'name': '王雨薇', 'email': '971768572@qq.com', 'type': 0, 'inviter': 'Admin', 'inviterId': '3569a5ce-c723-40bc-8dce-9d078fe77a3e', 'referrer': null, 'referrerId': '00000000-0000-0000-0000-000000000000', 'customerService': 'cs001', 'customerServiceId': '90e376a7-5a0a-4add-8cd5-3accb0f3795b', 'ruleReserve': '[{"AccountType":1,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"75e804ae-6511-4444-856c-d48cb7f1a801"}]', 'createdBy': 'Admin', 'createdOn': '2018-12-29T10:21:19.28+08:00', 'updatedBy': 'Admin', 'updatedOn': '2018-12-29T10:21:19.28+08:00', 'id': '7a161268-6cc2-4583-abd2-c239f4e70d75'}, {'memberId': '428d1ca1-51d1-4aae-8580-278928758e7e', 'name': 'sss流程', 'email': '2276928595@qq.com', 'type': 0, 'inviter': 'Admin', 'inviterId': '3569a5ce-c723-40bc-8dce-9d078fe77a3e', 'referrer': null, 'referrerId': '00000000-0000-0000-0000-000000000000', 'customerService': 'kefutest', 'customerServiceId': '43bf7398-18dc-4d3e-9f65-27502008d00f', 'ruleReserve': '[{"AccountType":1,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"fd0ce9a6-d659-410b-9510-21368b7afdf8"}]', 'createdBy': 'Admin', 'createdOn': '2018-12-25T10:58:37.647+08:00', 'updatedBy': 'Admin', 'updatedOn': '2018-12-25T10:58:37.647+08:00', 'id': 'fa8c82df-593b-4dc4-a83d-1eee0e967c7b'}, {'memberId': '8a41ef00-348d-4b9c-a44c-454ae228be91', 'name': '测试流程跟踪', 'email': '971768572@qq.com', 'type': 0, 'inviter': 'cs001', 'inviterId': '90e376a7-5a0a-4add-8cd5-3accb0f3795b', 'referrer': null, 'referrerId': '00000000-0000-0000-0000-000000000000', 'customerService': 'cs001', 'customerServiceId': '90e376a7-5a0a-4add-8cd5-3accb0f3795b', 'ruleReserve': '[{"AccountType":1,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"d45cc87a-ed62-476f-9e88-1ebaa7fc2697"},{"AccountType":2,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"e99fade7-1e94-49ac-9e93-58425fb8865b"}]', 'createdBy': 'cs001', 'createdOn': '2018-12-25T10:54:01.94+08:00', 'updatedBy': 'cs001', 'updatedOn': '2018-12-25T10:54:01.94+08:00', 'id': '24376e2b-d2ec-45d0-bca0-751a3f932c6e'}, {'memberId': '5b8cd567-47e4-44bf-8fb3-e602df02c375', 'name': '验收', 'email': '2276928595@qq.com', 'type': 0, 'inviter': 'Admin', 'inviterId': '3569a5ce-c723-40bc-8dce-9d078fe77a3e', 'referrer': null, 'referrerId': '00000000-0000-0000-0000-000000000000', 'customerService': 'kelenagent', 'customerServiceId': '562f938b-0a1c-4c25-b2ba-02f1a0695290', 'ruleReserve': '[{"AccountType":1,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"86f312fa-f50a-4d8b-8989-f9263e817430"},{"AccountType":2,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"86f312fa-f50a-4d8b-8989-f9263e817430"}]', 'createdBy': 'Admin', 'createdOn': '2018-12-24T18:46:38.86+08:00', 'updatedBy': 'Admin', 'updatedOn': '2018-12-24T18:46:38.86+08:00', 'id': 'b16c4089-78b7-4115-8e71-9bdfe861503a'}, {'memberId': '11682624-8ae6-4aeb-a065-981d6dbc0930', 'name': '青莲六', 'email': 'qinglian6@qq.com', 'type': 0, 'inviter': 'Admin', 'inviterId': '3569a5ce-c723-40bc-8dce-9d078fe77a3e', 'referrer': null, 'referrerId': '00000000-0000-0000-0000-000000000000', 'customerService': 'linlemon', 'customerServiceId': '89cd935c-7536-44f2-8ec3-f3d83a68a369', 'ruleReserve': '[{"AccountType":1,"ParentAccount":"","Server":"","CommissionType":"2","CommissionId":"62df68a0-299f-4795-89dd-08426e7b50ac"},{"AccountType":2,"ParentAccount":"","Server":"","CommissionType":"2","CommissionId":"62df68a0-299f-4795-89dd-08426e7b50ac"}]', 'createdBy': 'Admin', 'createdOn': '2018-12-24T18:15:11.853+08:00', 'updatedBy': 'Admin', 'updatedOn': '2018-12-24T18:15:11.853+08:00', 'id': '07ff7fc5-0b42-417f-98be-7bb5228e9c2f'}, {'memberId': '7e87b6e2-d932-42dd-8cb9-54407d142d1f', 'name': '验证码', 'email': '2276928595@qq.com', 'type': 0, 'inviter': 'Admin', 'inviterId': '3569a5ce-c723-40bc-8dce-9d078fe77a3e', 'referrer': null, 'referrerId': '00000000-0000-0000-0000-000000000000', 'customerService': 'kelenagent', 'customerServiceId': '562f938b-0a1c-4c25-b2ba-02f1a0695290', 'ruleReserve': '[{"AccountType":1,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"1e4ba700-b3ff-4ebc-8555-108a0070fa68"}]', 'createdBy': 'Admin', 'createdOn': '2018-12-24T18:09:03.05+08:00', 'updatedBy': 'Admin', 'updatedOn': '2018-12-24T18:09:03.05+08:00', 'id': '6719a02e-ea62-47bd-b43c-bc2cd2c237d5'}, {'memberId': 'ebb813d9-1894-4a70-bdda-7bb07f7ed9e7', 'name': '孟颖', 'email': '821249022@qq.com', 'type': 0, 'inviter': 'Admin', 'inviterId': '3569a5ce-c723-40bc-8dce-9d078fe77a3e', 'referrer': null, 'referrerId': '00000000-0000-0000-0000-000000000000', 'customerService': 'kelenagent', 'customerServiceId': '562f938b-0a1c-4c25-b2ba-02f1a0695290', 'ruleReserve': '[{"AccountType":1,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"d45cc87a-ed62-476f-9e88-1ebaa7fc2697"},{"AccountType":2,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"1e4ba700-b3ff-4ebc-8555-108a0070fa68"},{"AccountType":3,"ParentAccount":"","Server":"","CommissionType":"2","CommissionId":"0ce4a77d-5596-4d4b-82fb-0fb2d2b1889c"},{"AccountType":4,"ParentAccount":"","Server":"","CommissionType":"4","CommissionId":"39cc1cde-0611-4908-abd8-651435d46d14"}]', 'createdBy': 'Admin', 'createdOn': '2018-12-21T15:52:51.617+08:00', 'updatedBy': 'Admin', 'updatedOn': '2018-12-21T15:52:51.617+08:00', 'id': '9aa84879-eeb4-449d-b882-940cb6cb7cc4'}, {'memberId': '77d4dfc9-27e9-4ce6-84e0-8ca1977dd84b', 'name': '多账号', 'email': '2276928595@qq.com', 'type': 0, 'inviter': 'Admin', 'inviterId': '3569a5ce-c723-40bc-8dce-9d078fe77a3e', 'referrer': null, 'referrerId': '00000000-0000-0000-0000-000000000000', 'customerService': 'kelenagent', 'customerServiceId': '562f938b-0a1c-4c25-b2ba-02f1a0695290', 'ruleReserve': '[{"AccountType":1,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"fd0ce9a6-d659-410b-9510-21368b7afdf8"}]', 'createdBy': 'Admin', 'createdOn': '2018-12-21T15:42:53.31+08:00', 'updatedBy': 'Admin', 'updatedOn': '2018-12-21T15:42:53.31+08:00', 'id': '9332c369-6b76-4f7c-a782-96bb558d02f0'}, {'memberId': 'b6a9130a-3a3a-45f6-9ecf-efe76c0543df', 'name': '多种账号', 'email': '2276928595@qq.com', 'type': 0, 'inviter': 'Admin', 'inviterId': '3569a5ce-c723-40bc-8dce-9d078fe77a3e', 'referrer': null, 'referrerId': '00000000-0000-0000-0000-000000000000', 'customerService': 'kefutest', 'customerServiceId': '43bf7398-18dc-4d3e-9f65-27502008d00f', 'ruleReserve': '[{"AccountType":1,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"75e804ae-6511-4444-856c-d48cb7f1a801"},{"AccountType":2,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"75e804ae-6511-4444-856c-d48cb7f1a801"},{"AccountType":3,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"75e804ae-6511-4444-856c-d48cb7f1a801"},{"AccountType":4,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"75e804ae-6511-4444-856c-d48cb7f1a801"}]', 'createdBy': 'Admin', 'createdOn': '2018-12-21T15:15:46.367+08:00', 'updatedBy': 'Admin', 'updatedOn': '2018-12-21T15:15:46.367+08:00', 'id': 'c04c8630-88ce-46e2-acdf-4e1deb484484'}, {'memberId': 'ba0f911c-e284-4c4c-98fc-84a667ac168b', 'name': 'mengy', 'email': 'ertyui@ertyui.com', 'type': 0, 'inviter': 'Admin', 'inviterId': '3569a5ce-c723-40bc-8dce-9d078fe77a3e', 'referrer': null, 'referrerId': '00000000-0000-0000-0000-000000000000', 'customerService': 'kelenagent', 'customerServiceId': '562f938b-0a1c-4c25-b2ba-02f1a0695290', 'ruleReserve': '[{"AccountType":1,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"1e4ba700-b3ff-4ebc-8555-108a0070fa68"},{"AccountType":2,"ParentAccount":"","Server":"","CommissionType":"2","CommissionId":"1e3fa495-bb67-43e7-ba38-26ff3d6e8477"},{"AccountType":3,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"fd0ce9a6-d659-410b-9510-21368b7afdf8"},{"AccountType":4,"ParentAccount":"","Server":"","CommissionType":"1","CommissionId":"fd0ce9a6-d659-410b-9510-21368b7afdf8"}]', 'createdBy': 'Admin', 'createdOn': '2018-12-21T11:41:18.657+08:00', 'updatedBy': 'Admin', 'updatedOn': '2018-12-21T11:41:18.657+08:00', 'id': '75be40b6-7ec3-4be5-a4e1-03d196137ce0'}
      ],
      userName: 'Admin',
      dataOptions: {
        Name: {name: '被邀请人的姓名', type: 0},
        Email: {name: '被邀请人邮箱', type: 0},
        Inviter: {name: '邀请人', type: 0},
        Referrer: {name: '推荐人', type: 0},
        CustomerService: {name: '客服', type: 0},
        createdOn: {name: '邀请时间', type: 2}
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      invitationForm: {
        name: '',
        email: '',
        customerService: '',
        referrer: ''
      }
    }
  },
  methods: {
    getDataByAdSearch (data) {
      console.log(data)
    },
    sendInvitation () {
      this.dialogFormVisible = false
      let invitationData = JSON.parse(JSON.stringify(this.invitationForm))
      this.invitationDataInit()
      console.log(invitationData)
    },
    cancelInvitation () {
      this.dialogFormVisible = false
      this.invitationDataInit()
    },
    invitationDataInit () {
      this.invitationForm = {
        name: '',
        email: '',
        customerService: '',
        referrer: ''
      }
    }
  },
  mounted () {

  }
}
</script>