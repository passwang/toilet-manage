<template>
  <div class="app-container">
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
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="卫生间评价" align="center"  :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.comment }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评分" align="center"  :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-rate v-model="scope.row.number"></el-rate>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getComments, saveComment } from '@/api/toilets'
export default {
  data() {
    return {
      list: null,
      listLoading: false,
      number: ''
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
    selectItem(row) {
      const params = {
        '_id': row._id,
        'number': row.number
      }
      saveComment(params).then(res => {
          if (res.status === true) {
            this.$message({
              message: '修改成功!',
              type: 'success'
            })
          }
      })
    }
  }
}
</script>
