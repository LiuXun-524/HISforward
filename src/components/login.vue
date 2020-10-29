<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <!-- prop指定的是验证规则 -->
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="ruleForm.userName"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password"></el-input>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
export default{
 data() {
   return {
     ruleForm: {
       userName: '',
       password:'',
       },
     rules: {
       userName: [
         { required: true, message: '请输入用户名', trigger: 'blur' },
         { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
       ],
       password: [
         { required: true, message: '请填写密码', trigger: 'change' },
         { min: 6, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
       ],
   }
 }
},
methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            console.log(this.ruleForm)
            this.$axios.post("http://localhost:8082/sys/user/findUserByName",this.ruleForm)
            .then(res=>{
              console.log(res.data)
              //登录成功后向sessionStorage存储用户信息
              if(res.data.code == 0){
                console.log(res.data.list[0])
                let user = res.data.list[0]
                sessionStorage.setItem("loginUser",user)
                //登录成功回到首页，失败就在前台提示错误原因
                this.$router.push({path:"/index"})
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
      },

    }
}
</script>

<style>
</style>
