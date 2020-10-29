<template>
  <div>

  <el-button type="primary" @click="dialogFormVisible = true"  plain>添加</el-button>

  <el-dialog title="添加常数项类别" :visible.sync="dialogFormVisible">
  <el-form :model="constantTypeForm" ref="constantTypeForm" label-width="100px" class="constantTypeForm">
      <!-- prop指定的是验证规则 -->
    <el-form-item label="常数项名称" >
      <el-input v-model="constantTypeForm.constantTypeName"></el-input>
    </el-form-item>
    <el-form-item label="常数项编码" >
      <el-input v-model="constantTypeForm.constantTypeCode" placeholder="一般为常数项名称的全拼的大写首字母"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('constantTypeForm')">添加</el-button>
      <el-button @click="resetForm('constantTypeForm')">取消</el-button>
    </el-form-item>
  </el-form>
  </el-dialog>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        constantTypeForm:{
          constantTypeName : '',
          constantTypeCode : '',
        },
        dialogFormVisible: false,
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
            console.log(this.constantTypeForm)
            this.$axios.post("http://localhost:8082/sys/constantType/add",this.constantTypeForm)
            .then(res=>{
              console.log(res.data)
              if(res.data.code==1){
                 this.$message({message: res.data.msg,type: 'success'})
               }else{
                 this.$message.error(res.data.msg)
               }
            })
            .catch(err=>{
              console.log(err)
            })


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.dialogFormVisible = false
        this.$refs[formName].resetFields();
      },

    }

  }

</script>

<style>
</style>
