<template>
  <div class="middle-content" id="proxyList">
    <div class="content-header bg-light b-b b-t">
      <h4 class="title">代理列表</h4>
    </div>
    <div class="panel b-b b-t">
      <div class="content-operate">
        <div class="pull-left" style="margin-top: 10px;">
          <el-button type="success" size="medium" icon="el-icon-plus"><router-link to="/proxyOpenaccount">开户申请</router-link></el-button>
          <el-button type="warning" size="medium" icon="el-icon-edit" @click="editCustomerServer()">修改客服</el-button>
        </div>
        <div class="pull-right" style="margin-top: 10px;">
          <div class="search-box" style="display: inline-block;margin-right: 10px;">
            <el-input :placeholder="searchPlaceholder" v-model="searchInput" class="input-with-select">
              <el-select v-model="searchValue" slot="prepend" placeholder="请选择" @change="changeOptions(searchValue)">
                <el-option
                  v-for="item in searchOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
            </el-input>
          </div>
          <div style="display: inline-block;">
            <advance-search :width="900" :options="dataOptions" @modalData="getDataByAdSearch"></advance-search>
          </div>
        </div>
      </div>
      <div class="content-box-grid">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column fixed label="操作" width="110">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                v-bind:title="'查看代理资料'"
                @click="goDetail(scope.$index,scope.row)"
              >
                <i class="iconfont icon-guanyu button24"></i>
              </el-button>
              <el-button
                type="text"
                size="small"
                v-bind:title="'查看代理账号'"
                @click="goAccount(scope.$index,scope.row)"
              >
                <i class="iconfont icon-liebiao button24"></i>
              </el-button>
              <el-button
                type="text"
                size="small"
                v-bind:title="'添加代理账号'"
                @click="addAccountBtn(scope.$index,scope.row)"
              >
                <i class="iconfont icon-shuliang-zengjia button24"></i>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" min-width="120"></el-table-column>
          <el-table-column prop="userName" label="会员账号" min-width="120"></el-table-column>
          <el-table-column prop="status" label="会员状态" min-width="120">
            <template slot-scope="scope">{{ scope.row.status | proxyListStatus }}</template>
          </el-table-column>
          <el-table-column label="注册时间" min-width="150">
            <template slot-scope="scope">
              {{scope.row.registerOn | formatDate}}
            </template>
          </el-table-column>
          <el-table-column prop="customerService" label="客服" min-width="120"></el-table-column>
        </el-table>
      </div>
      <div class="pagination-wrapper clearfix">
        <div class="page-text pull-left">共有{{pageTotal}}条记录，每页显示{{pageSize}}条，当前{{currentPage}}/{{Math.ceil(pageTotal/pageSize)}}页</div>
        <div class="block pagination pull-right">
          <el-pagination
            :current-page.sync="currentPage"
            :page-size.sync="pageSize"
            layout="prev, pager, next, jumper"
            :total="pageTotal">
          </el-pagination>
        </div>
      </div>
      <account-add :isVisible.sync="dialogVisible" @dialog="addAccount"></account-add>
    </div>
  </div>
</template>

<style lang="less">
#proxyList {
  .search-box {
    .el-select {
      .el-input.el-input--suffix {
        .el-input__inner {
          width: 108px;
        }
      }
    }
    .el-input__inner {
      width: 160px;
      height: 38px;
      line-height: 38px;
    }
  }
  .content-box-grid {
    .el-button+.el-button {
      margin-left: 0;
    }
  }
}
</style>

<script>
import pendingEnums from '../../api/services/allEnumerationValueService.js'
import AccountAdd from './sub_pages/accountAdd.vue'
export default {
  data () {
    return {
      tableData: [
        {
          userId: 'e1003e40-b3c6-4bd5-b260-1bfe0a5be578',
          userName: 'OAkaidl',
          name: 'OA开出代理的',
          customerServiceId: null,
          customerService: null,
          parentUserName: null,
          parentName: null,
          parentUserId: null,
          rootUserName: null,
          rootName: null,
          rootId: null,
          type: 2,
          status: 1,
          registerOn: '2019-01-09T09:13:01',
          deletedBy: null,
          deletedOn: null,
          isDeleted: null,
          isEnabled: null,
          createdBy: null,
          createdOn: '2019-01-09T09:34:39.597+08:00',
          updatedBy: null,
          updatedOn: '2019-01-09T09:34:39.597+08:00',
          id: '96bcbb94-669b-4fee-8644-10e56d265a2c'
        },
        {
          userId: '85db9d42-0f40-4090-aa91-3a3d77456139',
          userName: 'blackts2',
          name: '黑名单特殊返佣二',
          customerServiceId: '562f938b-0a1c-4c25-b2ba-02f1a0695290',
          customerService: 'kelenagent',
          parentUserName: null,
          parentName: null,
          parentUserId: null,
          rootUserName: null,
          rootName: null,
          rootId: null,
          type: 2,
          status: 2,
          registerOn: '2018-12-29T11:45:25',
          deletedBy: null,
          deletedOn: null,
          isDeleted: null,
          isEnabled: null,
          createdBy: 'Admin',
          createdOn: '2018-12-29T11:45:24.83+08:00',
          updatedBy: 'Admin',
          updatedOn: '2018-12-29T11:49:12.553+08:00',
          id: 'c6b8e1e1-3f76-4c5f-90be-2060fa652ec4'
        },
        {
          userId: 'db194c59-e96f-4cd1-b443-3e301d6c9364',
          userName: 'agenthand1',
          name: '代理手持一',
          customerServiceId: '90e376a7-5a0a-4add-8cd5-3accb0f3795b',
          customerService: 'cs001',
          parentUserName: null,
          parentName: null,
          parentUserId: null,
          rootUserName: null,
          rootName: null,
          rootId: null,
          type: 2,
          status: 3,
          registerOn: '2018-12-25T16:00:28',
          deletedBy: null,
          deletedOn: null,
          isDeleted: null,
          isEnabled: null,
          createdBy: null,
          createdOn: '2018-12-25T16:00:33.503+08:00',
          updatedBy: null,
          updatedOn: '2018-12-25T16:00:33.503+08:00',
          id: 'b05e995f-e293-49f3-999e-1f91c7376a62'
        },
        {
          userId: '6a3963f3-004c-4884-a8ef-a1738b011eae',
          userName: 'sssyaoqing',
          name: 'sss流程',
          customerServiceId: '43bf7398-18dc-4d3e-9f65-27502008d00f',
          customerService: 'kefutest',
          parentUserName: null,
          parentName: null,
          parentUserId: null,
          rootUserName: null,
          rootName: null,
          rootId: null,
          type: 2,
          status: 1,
          registerOn: '2018-12-25T11:01:04',
          deletedBy: null,
          deletedOn: null,
          isDeleted: null,
          isEnabled: null,
          createdBy: null,
          createdOn: '2018-12-25T11:01:04.273+08:00',
          updatedBy: 'Admin',
          updatedOn: '2018-12-25T11:02:07.723+08:00',
          id: '428d1ca1-51d1-4aae-8580-278928758e7e'
        },
        {
          userId: '873e9775-4ff1-4eb9-8e8f-ae1d9c779346',
          userName: 'qinglian8',
          name: '青莲八',
          customerServiceId: '90e376a7-5a0a-4add-8cd5-3accb0f3795b',
          customerService: 'cs001',
          parentUserName: null,
          parentName: null,
          parentUserId: null,
          rootUserName: null,
          rootName: null,
          rootId: null,
          type: 2,
          status: 1,
          registerOn: '2018-12-24T18:51:34',
          deletedBy: null,
          deletedOn: null,
          isDeleted: null,
          isEnabled: null,
          createdBy: 'Admin',
          createdOn: '2018-12-24T18:51:38.753+08:00',
          updatedBy: 'Admin',
          updatedOn: '2018-12-24T18:52:33.207+08:00',
          id: '420e9896-85b9-448f-b098-60cbc61bfe18'
        },
        {
          userId: 'f89185c1-df11-4ba9-bf41-354c03894677',
          userName: 'yanshou1224',
          name: '验收',
          customerServiceId: '562f938b-0a1c-4c25-b2ba-02f1a0695290',
          customerService: 'kelenagent',
          parentUserName: null,
          parentName: null,
          parentUserId: null,
          rootUserName: null,
          rootName: null,
          rootId: null,
          type: 2,
          status: 1,
          registerOn: '2018-12-24T18:47:59',
          deletedBy: null,
          deletedOn: null,
          isDeleted: null,
          isEnabled: null,
          createdBy: 'Admin',
          createdOn: '2018-12-24T18:47:59.787+08:00',
          updatedBy: 'Admin',
          updatedOn: '2018-12-25T10:57:05.063+08:00',
          id: '5b8cd567-47e4-44bf-8fb3-e602df02c375'
        },
        {
          userId: '9624950e-fdb6-48fb-913e-ffd90abcbc39',
          userName: 'qinglian7',
          name: '青莲七',
          customerServiceId: '90e376a7-5a0a-4add-8cd5-3accb0f3795b',
          customerService: 'cs001',
          parentUserName: null,
          parentName: null,
          parentUserId: null,
          rootUserName: null,
          rootName: null,
          rootId: null,
          type: 2,
          status: 1,
          registerOn: '2018-12-24T18:26:32',
          deletedBy: null,
          deletedOn: null,
          isDeleted: null,
          isEnabled: null,
          createdBy: 'Admin',
          createdOn: '2018-12-24T18:26:36.677+08:00',
          updatedBy: 'Admin',
          updatedOn: '2018-12-24T18:32:12.577+08:00',
          id: 'a185cc95-3fee-4ae0-bb2c-5e9d8ad61a38'
        },
        {
          userId: 'd423a261-3f54-4664-a6e7-f64184b35058',
          userName: 'qinglian6',
          name: '青莲六',
          customerServiceId: '89cd935c-7536-44f2-8ec3-f3d83a68a369',
          customerService: 'linlemon',
          parentUserName: null,
          parentName: null,
          parentUserId: null,
          rootUserName: null,
          rootName: null,
          rootId: null,
          type: 2,
          status: 1,
          registerOn: '2018-12-24T18:17:16',
          deletedBy: null,
          deletedOn: null,
          isDeleted: null,
          isEnabled: null,
          createdBy: null,
          createdOn: '2018-12-24T18:17:16.673+08:00',
          updatedBy: 'Admin',
          updatedOn: '2018-12-24T18:19:53.083+08:00',
          id: '11682624-8ae6-4aeb-a065-981d6dbc0930'
        },
        {
          userId: '136c9a20-bf7f-4d19-b0a6-a719b9e5411c',
          userName: 'qinglian5',
          name: '青莲五',
          customerServiceId: '90e376a7-5a0a-4add-8cd5-3accb0f3795b',
          customerService: 'cs001',
          parentUserName: null,
          parentName: null,
          parentUserId: null,
          rootUserName: null,
          rootName: null,
          rootId: null,
          type: 2,
          status: 1,
          registerOn: '2018-12-24T17:16:54',
          deletedBy: null,
          deletedOn: null,
          isDeleted: null,
          isEnabled: null,
          createdBy: 'Admin',
          createdOn: '2018-12-24T17:16:57.533+08:00',
          updatedBy: 'Admin',
          updatedOn: '2018-12-24T18:27:40.427+08:00',
          id: 'd75624ca-c043-4a8b-801c-6913e468346e'
        },
        {
          userId: '2b84ebcb-b7d1-4d18-8036-570b70679607',
          userName: 'qinglian1',
          name: '青莲一',
          customerServiceId: '89cd935c-7536-44f2-8ec3-f3d83a68a369',
          customerService: 'linlemon',
          parentUserName: null,
          parentName: null,
          parentUserId: null,
          rootUserName: null,
          rootName: null,
          rootId: null,
          type: 2,
          status: 1,
          registerOn: '2018-12-24T14:49:35',
          deletedBy: null,
          deletedOn: null,
          isDeleted: null,
          isEnabled: null,
          createdBy: 'Admin',
          createdOn: '2018-12-24T14:49:42.497+08:00',
          updatedBy: 'Admin',
          updatedOn: '2018-12-24T18:13:21.673+08:00',
          id: '1087cb52-2991-43ec-8964-e52dc7632d60'
        }
      ],
      dataOptions: {
        Name: { name: '姓名', type: 0 },
        UserName: { name: '会员账号', type: 0 },
        status: {
          name: '会员状态',
          type: 1,
          level3Options: pendingEnums.proxyListStatus
        },
        CustomerService: { name: '会员账号', type: 0 },
        registerOn: { name: '注册时间', type: 2 }
      },
      searchOptions: [
        {
          value: 'userName',
          label: '会员账号'
        }, {
          value: 'account',
          label: '交易账号'
        }, {
          value: 'name',
          label: '姓名'
        }
      ],
      searchValue: 'userName',
      searchInput: '',
      searchPlaceholder: '请输入会员账号',
      financialObj: {
        Skip: 0,
        Take: 10,
        OrderByDesc: 'PublishDate'
      },
      currentPage: 1,
      pageSize: 10,
      pageTotal: 10,
      dialogVisible: false,
      openVisible: false,
      old_password: '123456'
    }
  },
  methods: {
    goDetail (index, row) {
      console.log('查看代理资料')
    },
    goAccount (index, row) {
      console.log('查看代理账号')
    },
    addAccountBtn (index, row) {
      console.log('添加代理账号')
      this.dialogVisible = true
    },
    changeOptions (val) {
      if (val === 'userName') {
        this.searchPlaceholder = '请输入会员账号'
      } else if (val === 'account') {
        this.searchPlaceholder = '请输入交易账号'
      } else if (val === 'name') {
        this.searchPlaceholder = '请输入姓名'
      } else {

      }
    },
    search () {
      if (!this.searchInput || this.searchInput === '') {
        return
      } else {
        this.financialObj[this.searchValue] = this.searchInput
      }
      console.log(this.financialObj)
    },
    getDataByAdSearch (data) {
      console.log(data)
    },
    editCustomerServer () {
      console.log('修改客服')
    },
    addAccount (obj) {
      console.log(obj)
      this.dialogVisible = false
    }
  },
  mounted () {
    // console.log(pendingEnums)
  },
  components: {
    AccountAdd
  }
}
</script>