<template>
  <div>

  <el-form :model="constantTypeForm" ref="constantTypeForm" label-width="100px" class="constantTypeForm">
      <!-- prop指定的是验证规则 -->
    <el-form-item label="常数项名称" >
      <el-input v-model="constantTypeForm.constantTypeName" ></el-input>
    </el-form-item>
    <el-form-item label="常数项编码" >
      <el-input v-model="constantTypeForm.constantTypeCode"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('constantTypeForm')">确认修改</el-button>
      <el-button @click="resetForm('constantTypeForm')">取消</el-button>
    </el-form-item>
  </el-form>

  </div>
</template>

<script>
  export default{
    data() {
      return {
        constantTypeForm: {
          id: this.$route.query.id,
          constantTypeCode: this.$route.query.constantTypeCode,
          constantTypeName: this.$route.query.constantTypeName
        },
      }
    },
    /* props:['row'], */
    /*cre ated() {
      console.log("加载完毕")
     console.log(this.$props)
    }, */
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.constantTypeForm)
            this.$axios.post("http://localhost:8082/sys/constantType/update",this.constantTypeForm)
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
        this.$refs[formName].resetFields();
        this.$router.go(-1)
      },
    },
  }
</script>

<style>
</style>
