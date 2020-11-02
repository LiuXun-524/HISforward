<template>
  <div>

  <el-button type="success" @click="dialogFormVisible = true"  size="small">新增</el-button>

  <el-dialog title="添加挂号级别" :visible.sync="dialogFormVisible">
  <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="ruleForm">
      <!-- prop指定的是验证规则 -->
    <el-form-item label="号别编码" >
      <el-input v-model="ruleForm.registCode"></el-input>
    </el-form-item>
    <el-form-item label="号别名称" >
      <el-input v-model="ruleForm.registName" ></el-input>
    </el-form-item>
    <el-form-item label="挂号费" >
      <el-input v-model="ruleForm.registFee" ></el-input>
    </el-form-item>
    <el-form-item label="显示顺序号" >
      <el-input v-model="ruleForm.sequenceNo" ></el-input>
    </el-form-item>

    <el-form-item label="挂号限额" >
      <el-input v-model="ruleForm.registQuota" ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
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
        ruleForm:{
          id:'',
          registCode : '',
          registName : '',
          registFee : '',
          sequenceNo : '',
          registQuota : '',
        },
        dialogFormVisible: false,
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
            console.log(this.ruleForm)
            this.$axios.post("http://localhost:8082/sys/registlevel/add",this.ruleForm)
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
