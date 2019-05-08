<template>
    <div class="add">
        <el-dialog :title="title" :visible="newDialogVisible" @close="closeForm">
        <el-form :model="form" >
            <el-form-item label="title" :label-width="formLabelWidth">
               <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片地址" :label-width="formLabelWidth">
               <el-input v-model="form.img" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth">
               <el-input v-model="form.desc" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="content1" :label-width="formLabelWidth">
               <el-input  type="textarea" v-model="form.content1" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="content2" :label-width="formLabelWidth">
               <el-input  type="textarea"  v-model="form.content2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth">
               <el-radio v-model="form.flag" label="1">新闻</el-radio>
               <el-radio v-model="form.flag" label="0">笑料</el-radio>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="closeForm">取 消</el-button>
              <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
  export default {
    props: ['title', 'newDialogVisible', 'form'],
    data() {
      return {
        formLabelWidth: '120px'
      }
    },
    methods: {
       closeForm() {
          this.$emit('close')
       },
       submitForm() {
           this.$emit('submit', { form: this.form, name: this.title})
       }
    }
  };
</script>
