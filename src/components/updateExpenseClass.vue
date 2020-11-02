<template>
  <div>
<el-dialog title="修改挂号级别" :visible.sync="dialogFormVisible" @closed="resetDialog">
  <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="ruleForm">
      <!-- prop指定的是验证规则 -->
    <el-form-item label="费用科目编码" >
      <el-input v-model="ruleForm.expCode"></el-input>
    </el-form-item>
    <el-form-item label="费用科目名称" >
      <el-input v-model="ruleForm.expName" ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        dialogFormVisible:false,
        ruleForm:{
          id:'',
          expCode : '',
          expName : '',
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
            console.log(this.ruleForm)
            this.$axios.post("http://localhost:8082/sys/expenseClass/update",this.ruleForm)
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
      resetDialog(){
        this.ruleForm={
          id:'',
          expCode : '',
          expName : '',
        }
      }
    },
  }
</script>

<style>
</style>
