<template>
  <div class="app-container">
    <el-button  type="primary" size="small"  @click="handleOut" style="margin-bottom:20px;float:right">导出维修数据</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      @cell-click="selectItem"
    >
     <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column label="卫生间地址"  width="120">
        <template slot-scope="scope">
          {{ scope.row.address || '暂无数据'}}
        </template>
      </el-table-column>
      <el-table-column label="卫生间评价" align="center"  :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.comment }}</span>
        </template>
      </el-table-column>
       <el-table-column label="类型" width="100" align="center"  prop="type" :filters="[{ text: '环境', value: '1' }, { text: '报修', value: '2' }]" :filter-method="filterTag" filter-placement="bottom-end">
         <template slot-scope="scope">
          <el-tag :type="scope.row.type | statusFilter" close-transition>{{ scope.row.type | statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center"  :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <div v-if="scope.row.type === '1'">
            <el-rate v-model="scope.row.number"></el-rate>
          </div>
          <div v-else>
            <el-radio v-model="scope.row.status" label="1">同意</el-radio>
            <el-radio v-model="scope.row.status" label="0">不同意</el-radio>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getComments, saveComment } from '@/api/toilets'
import { export_json_to_excel } from '../../assets/js/Export2Excel'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': '环境',
        '2': '报修'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: false,
      number: '',
      radio: '',
      value: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getComments().then(response => {
        this.list = response
        this.listLoading = false
      })
    },
    handleOut() {
      require.ensure([], () => {
            const tHeader = ['位置', '问题']
            const filterVal = ['address', 'comment']
            const list = this.list.filter((item) => {return item.type === '2'&& item.status ==='1'})
            const data = this.formatJson(filterVal, list)
            export_json_to_excel(tHeader, data, '卫生间维修表')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    selectItem(row) {
      setTimeout(() => {
        const params = {
        '_id': row._id,
        'status': row.status,
        'number': row.number
        }
      saveComment(params).then(res => {
          if (res.status === true) {
            this.$message({
              message: '操作成功!',
              type: 'success'
            })
          }
      })
      }, 0)
    },
    filterTag(value, row) {
      return row.type === value
    }
  }
}
</script>
