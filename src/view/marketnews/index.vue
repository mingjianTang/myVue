<template>
  <div class="middle-content" id="invitation">
    <div class="content-header bg-light b-b b-t">
      <h4 class="title">市场快讯</h4>
    </div>
    <div class="panel b-b b-t bg-light">
      <div class="content-operate"></div>
      <div class="content-box-grid">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="TitleNoTag" label="新闻内容" min-width="200" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="Importance" label="重要性" min-width="30"></el-table-column>
          <el-table-column label="添加时间" min-width="80">
            <template slot-scope="scope">
              {{scope.row.AddDate | formatDate}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-wrapper clearfix">
        <div class="page-text pull-left">共有{{pageTotal}}条记录，每页显示{{pageSize}}条，当前{{currentPage}}/{{Math.ceil(pageTotal/pageSize)}}页</div>
        <div class="block pagination pull-right">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size.sync="pageSize"
            layout="prev, pager, next, jumper"
            :total="pageTotal">
          </el-pagination>
        </div>
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
      tableData: [],
      financialObj: {
        Skip: 0,
        Take: 10,
        OrderByDesc: 'PublishDate'
      },
      currentPage: 1,
      pageSize: 10,
      pageTotal: 10
    }
  },
  methods: {
    financial (obj) {
      this.$api.home.financialNews(obj).then(res => {
        // console.log(res)
        if (res.Total || res.Results.length) {
          this.pageTotal = res.Total
          this.tableData = res.Results
        } else {
          this.pageTotal = 0
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      this.financialObj.Skip = (val - 1) * this.pageSize
      this.currentPage = val
      this.financial(this.financialObj)
    }
  },
  mounted () {
    this.financial(this.financialObj)
  }
}
</script>