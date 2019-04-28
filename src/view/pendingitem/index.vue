<template>
  <div class="middle-content" id="pendingitem">
    <div class="content-header bg-light b-b b-t">
      <h4 class="title">待办事项列表</h4>
    </div>
    <div class="panel b-b b-t">
      <div class="content-operate">
        <el-radio-group v-model="obj_init.type" class="pendingitem-radio" @change="selectType()">
          <el-radio :label="0">所有</el-radio>
          <el-radio :label="1">代理申请审核</el-radio>
          <el-radio :label="2">月结单审核</el-radio>
          <el-radio :label="3">佣金审核</el-radio>
        </el-radio-group>
        <div class="pull-right" style="margin-top: 10px;">
          <advance-search :width="900" :options="dataOptions" @modalData="getDataByAdSearch"></advance-search>
        </div>
      </div>
      <div class="content-box-grid">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column fixed label="操作" min-width="90">
            <template slot-scope="scope">
              <el-button type="text" size="small" v-bind:title="'审核'" @click="goAudit(scope.$index,scope.row)">
                <i class="iconfont icon-anniu_xuanzhong button24"></i>
              </el-button>
              <el-button type="text" size="small" v-bind:title="'详情'" @click="goDetail(scope.$index,scope.row)">
                <i class="iconfont icon-guanyu button24"></i>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="relevantName" label="关联用户名" min-width="120"></el-table-column>
          <el-table-column label="待处理类型" min-width="120">
            <template slot-scope="scope">{{ scope.row.type | pendingType }}</template>
          </el-table-column>
          <el-table-column prop="status" label="处理状态" min-width="120">
            <template slot-scope="scope">{{ scope.row.status | pendingStatus }}</template>
          </el-table-column>
          <el-table-column prop="approveAccount" label="处理人" min-width="120"></el-table-column>
          <el-table-column label="处理时间" min-width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.status==2||scope.row.status==4">
                {{scope.row.approveTime | formatDate}}
              </span>
              <span v-else></span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" min-width="150">
            <template slot-scope="scope">{{ scope.row.createdOn | formatDate }}</template>
          </el-table-column>
          <el-table-column prop="createdBy" label="创建者" min-width="150"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style lang="less">
#pendingitem {
  .pendingitem-radio {
    padding: 20px 0;
    label {
      .el-radio__label {
        font-size: 18px;
      }
    }
  }
}
</style>

<script>
import pendingEnums from '../../api/services/allEnumerationValueService.js'
export default {
  data () {
    return {
      obj_init: {
        type: 0
      },
      tableData: [
        {
          approveAccount: 'Admin',
          approveRemark: '代理邀请审核',
          approveTime: '2018-09-27T10:06:23.877+08:00',
          approveUrl: null,
          itemId: 'ab1bacfc-5e1c-450c-850e-2565ef9a01dd',
          relevantID: null,
          relevantName: 'linYYY',
          sources: 0,
          status: 2,
          type: 1,
          createdBy: 'Admin',
          createdOn: '2018-09-26T09:52:41.283+08:00',
          updatedBy: 'Admin',
          updatedOn: '2018-09-27T10:06:23.937+08:00',
          id: '8dc02a65-ca61-4c55-91c1-dffd9140532c'
        },
        {
          approveAccount: 'r3r3',
          approveRemark: null,
          approveTime: '2018-09-28T11:17:43.65+08:00',
          approveUrl: null,
          itemId: '0464172f-e6a0-4030-ac0f-7475d3830791',
          relevantID: null,
          relevantName: 'duchashi',
          sources: 0,
          status: 0,
          type: 2,
          createdBy: 'Admin',
          createdOn: '2018-09-12T18:03:53.79+08:00',
          updatedBy: 'MRGTest002',
          updatedOn: '2018-09-28T11:17:43.65+08:00',
          id: 'b3a8b1e2-c591-455c-84a3-67df98580ea7'
        },
        {
          approveAccount: 'Roal',
          approveRemark: null,
          approveTime: '2018-09-28T11:45:41.773+08:00',
          approveUrl: null,
          itemId: '99a8dfd5-cb0c-4e4e-acb6-f4bd6cf6e4b2',
          relevantID: null,
          relevantName: 'fanyongwu',
          sources: 0,
          status: 4,
          type: 3,
          createdBy: 'Admin',
          createdOn: '2018-09-05T20:22:31.7+08:00',
          updatedBy: 'MRGTest001',
          updatedOn: '2018-09-28T11:45:41.773+08:00',
          id: '41423760-ce6d-4528-bd8f-08c2fbfbe755'
        },
        {
          approveAccount: 'Admin',
          approveRemark: '代理邀请审核',
          approveTime: '2018-08-30T15:39:56.937+08:00',
          approveUrl: null,
          itemId: '3d116fec-ff76-44db-ae23-f36c46081c9f',
          relevantID: null,
          relevantName: 'LMLMLM',
          sources: 0,
          status: 1,
          type: 1,
          createdBy: 'Admin',
          createdOn: '2018-08-09T14:29:51.46+08:00',
          updatedBy: 'Admin',
          updatedOn: '2018-08-30T15:39:56.937+08:00',
          id: 'df45976a-1b43-4df1-a307-f158ef200872'
        },
        {
          approveAccount: 'Admin',
          approveRemark: '代理邀请审核',
          approveTime: '2018-08-09T10:32:48.7+08:00',
          approveUrl: null,
          itemId: '01b38ec2-24bd-4cc3-bb1b-e1b6864da693',
          relevantID: null,
          relevantName: 'msssmg',
          sources: 0,
          status: 2,
          type: 1,
          createdBy: 'Admin',
          createdOn: '2018-08-09T10:31:01.393+08:00',
          updatedBy: 'Admin',
          updatedOn: '2018-08-09T10:32:49.203+08:00',
          id: '42ae1918-e481-44f1-91f1-47243de17534'
        },
        {
          approveAccount: 'wewe',
          approveRemark: '',
          approveTime: '2018-09-28T11:27:39.227+08:00',
          approveUrl: '',
          itemId: 'FC21D66F-22E2-42C8-BF9A-0A2DC329217A',
          relevantID: '',
          relevantName: 'tracy5555',
          sources: 0,
          status: 1,
          type: 2,
          createdBy: 'Admin',
          createdOn: '2018-07-11T18:10:36.577+08:00',
          updatedBy: 'Admin',
          updatedOn: '2018-09-28T11:27:39.227+08:00',
          id: '059822d9-a8be-4e5f-8f5d-338bdd9fceb0'
        },
        {
          approveAccount: 'uiui',
          approveRemark: '月结单审核',
          approveTime: '2018-09-28T11:28:16.803+08:00',
          approveUrl: '',
          itemId: '10C314A8-8D79-4510-A1E3-B94D67716E69',
          relevantID: '',
          relevantName: 'tracy23323',
          sources: 0,
          status: 1,
          type: 2,
          createdBy: 'Admin',
          createdOn: '2018-07-11T10:32:59.58+08:00',
          updatedBy: 'Admin',
          updatedOn: '2018-09-28T11:28:16.803+08:00',
          id: '0aaf20a7-2775-4aef-b7ec-026f3d54d7e3'
        },
        {
          approveAccount: 'Admin',
          approveRemark: '代理邀请审核',
          approveTime: '2018-07-30T15:51:28.99+08:00',
          approveUrl: null,
          itemId: 'bf67006d-0bf7-4e12-97a9-01710044e647',
          relevantID: null,
          relevantName: 'AB010203',
          sources: 0,
          status: 1,
          type: 1,
          createdBy: 'Admin',
          createdOn: '2018-07-06T15:13:35.27+08:00',
          updatedBy: 'Admin',
          updatedOn: '2018-07-30T15:51:28.993+08:00',
          id: '8c91f42a-f311-4284-9fe5-cfb2efced0ec'
        },
        {
          approveAccount: 'Admin',
          approveRemark: '代理邀请审核',
          approveTime: '2018-07-27T15:35:18.383+08:00',
          approveUrl: null,
          itemId: 'e7369366-acbc-4f79-8359-034ac30ee569',
          relevantID: null,
          relevantName: 'lin8888888',
          sources: 0,
          status: 1,
          type: 1,
          createdBy: 'Admin',
          createdOn: '2018-07-06T10:15:06.823+08:00',
          updatedBy: 'Admin',
          updatedOn: '2018-07-27T15:35:18.383+08:00',
          id: '7ba7b7c1-0cae-49f3-b7a5-1d0ea04cf467'
        },
        {
          approveAccount: 'Admin',
          approveRemark: '代理邀请审核',
          approveTime: '2018-07-25T17:12:44.487+08:00',
          approveUrl: null,
          itemId: '4e4f597f-2c57-4652-8fbf-0c8250404181',
          relevantID: null,
          relevantName: 'linlllll',
          sources: 0,
          status: 1,
          type: 3,
          createdBy: 'Admin',
          createdOn: '2018-06-25T15:22:51.02+08:00',
          updatedBy: 'Admin',
          updatedOn: '2018-07-25T17:12:44.487+08:00',
          id: '25219ae6-67ed-4ff5-a5c9-d1fc4c57c80b'
        }
      ],
      userName: 'Admin',
      dataOptions: {
        relevantName: {name: '关联用户名', type: 0},
        status: {
          name: '处理状态',
          type: 1,
          level2Options: {1: {name: '包含', value: ''}, 2: {name: '不包含', value: '!'}},
          level3Options: pendingEnums.pendingStatus
        },
        approveTime: {name: '处理时间', type: 2},
        createdOn: {name: '创建时间', type: 2}
      }
    }
  },
  created () {
    // this.pendingList({})
  },
  methods: {
    selectType () {
      console.log(this.obj_init.type)
    },
    pendingList (obj) {
      this.$api.pending.pendingList(obj).then(res => {
        console.log(res)
      })
    },
    goAudit (index, row) {
      this.$router.push({
        path: '/pendingitemAudit',
        query: {
          id: row.id,
          relevantName: row.relevantName,
          type: row.type
        }
      })
    },
    goDetail (index, row) {
      this.$router.push({
        path: '/pendingitemDetail',
        query: {
          id: row.id,
          relevantName: row.relevantName,
          type: row.type
        }
      })
    },
    getDataByAdSearch (data) {
      console.log(data)
    }
  },
  mounted () {
    // console.log(pendingEnums)
  }
}
</script>