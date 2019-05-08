<template>
  <div class="app-container">
      <el-button  type="primary" size="small"  @click="handleAdd" style="margin-bottom:20px">添加</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
     <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column label="Title"  width="120">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="图片地址" align="center"  :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.img }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="110" align="center"  :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column label="content1" width="110" align="center"  :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.content1 }}
        </template>
      </el-table-column>
      <el-table-column label="content2" width="110" align="center"  :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.content2 }}
        </template>
      </el-table-column>
       <el-table-column label="笑料/新闻" width="100" align="center">
         <template slot-scope="scope">
          <el-tag :type="scope.row.flag | statusFilter">{{ scope.row.flag | statusMap}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <add :title="title" :form="form" :newDialogVisible="dialogFormVisible" @close="close" @submit="submit"></add>
  </div>
</template>

<script>
import { getReads, addReads, editReads, deleteReads } from '@/api/reads'
import add from './add'
export default {
  components: {
    add
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': '',
        '0': 'success'
      }
      return statusMap[status]
    },
    statusMap(status) {
      const statusMap = {
        '1': '新闻',
        '0': '笑料'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      title: '',
      dialogFormVisible: false,
      form: {
        title: '',
        img: '',
        desc: '',
        content1: '',
        content2: '',
        flag: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getReads().then(response => {
        this.list = response.reverse()
        this.listLoading = false
      })
    },
    close() {
      this.dialogFormVisible = false
    },
    submit(item) {
      this.dialogFormVisible = false
      const data = item.form
      const name = item.name
      console.log(data)
      if (name === '添加信息') {
        addReads(data).then(res => {
          if (res.status === true) {
            this.listLoading = true
            this.fetchData()
            this.$message({
              message: '添加成功!',
              type: 'success'
            })
            this.listLoading = false
          }
        })
      } else if (name === '修改信息') {
        editReads(data).then(res => {
          if (res.status === true) {
            this.listLoading = true
             this.$message({
              message: '修改成功!',
              type: 'success'
            })
            this.listLoading = false
          }
        })
      }
    },
    handleAdd() {
      this.title = '添加信息'
      this.dialogFormVisible = true
      Object.keys(this.form).forEach(key => { this.form[key] = '' })
    },
    handleEdit(row) {
      console.log(row)
      this.title = '修改信息'
      this.dialogFormVisible = true
      this.form = row
    },
    handleDelete(row) {
       this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           deleteReads({ '_id': row._id }).then(res => {
            if (res.status === true) {
              this.listLoading = true
               this.fetchData()
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
              this.listLoading = false
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  }
}
</script>
