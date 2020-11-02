<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <!-- prop指定的是验证规则 -->
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="ruleForm.userName"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password"></el-input>
    </el-form-item>
    <el-form-item label="真实姓名" prop="realName">
      <el-input v-model="ruleForm.realName"></el-input>
    </el-form-item>


    <el-form-item label="医生职称" >
      <el-select v-model="ruleForm.docTitleID" placeholder="请选择医生职称">
        <el-option v-for="item in docTitleList" :key="item.id" :value="item.id" :label="item.constantName"></el-option>

      </el-select>
    </el-form-item>

    <el-form-item label="用户类型" >
      <el-select v-model="ruleForm.userType" placeholder="请选择用户类型">
        <el-option label="医院管理员" value="1"></el-option>
        <el-option label="挂号收费员" value="2"></el-option>
        <el-option label="门诊医生" value="3"></el-option>
        <el-option label="医技医生" value="4"></el-option>
        <el-option label="药房操作员" value="5"></el-option>
        <el-option label="财务管理员" value="6"></el-option>
      </el-select>
    </el-form-item>

    <!-- <el-form-item label="是否排班">
        <el-radio v-model="checked">排班</el-radio>
        <el-radio v-model="checked">不排班</el-radio>
     </el-form-item> -->

    <el-form-item label="是否排班">
      <el-switch v-model="ruleForm.isScheduling" active-value="是" inactive-value="否"></el-switch>
    </el-form-item>

    <el-form-item label="科室">
      <!-- <el-select v-model="ruleForm.deptID" placeholder="请选择大科室">
        <el-option v-for="item in deptCategoryList" :key="item.id" :value="item.id" :label="item.constantName" @click="findDeptById(item.id)"></el-option>

      </el-select> -->
      <el-select v-model="ruleForm.deptID" placeholder="请选择科室">
        <el-option v-for="item in deptList" :key="item.id" :value="item.id" :label="item.deptName"></el-option>

      </el-select>
    </el-form-item>

    <el-form-item label="挂号级别">
      <el-select v-model="ruleForm.registLeID" placeholder="请选择挂号级别">
        <el-option v-for="item in registLeList" :key="item.id" :value="item.id" :label="item.registName"></el-option>

      </el-select>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>


</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          userName: '',
          password:'',
          realName:'',
          userType:'',
          docTitleID:'',
          isScheduling:true,
          deptID:'',
          registLeID:'',

        },
        //医生职称的列表
        docTitleList:[],
        //科室的列表
        deptList:[],
        //挂号级别的列表
        registLeList:[],

        deptCategoryList:[],


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
      };
    },
    mounted() {
      this.$axios.get("http://localhost:8082/sys/constantItem/findConstantItemByTypeName?constantTypeName=医生职称")
      .then(res=>{
        console.log(res.data)
        this.docTitleList=res.data
      })
      .catch(err=>{
        console.log(err)
      });
      this.$axios.get("http://localhost:8082/sys/registlevel/selectall")
      .then(res=>{
        console.log(res.data)
        this.registLeList=res.data
      })
      .catch(err=>{
        console.log(err)
      });
      this.$axios.get("http://localhost:8082/sys/department/selectall")
      .then(res=>{
        console.log(res.data)
        this.deptList=res.data
      })
      .catch(err=>{
        console.log(err)
      })
      this.$axios.get("http://localhost:8082/sys/constantItem/findConstantItemByTypeName?constantTypeName=科室分类")
      .then(res=>{
        console.log(res.data)
        this.deptCategoryList=res.data
      })
      .catch(err=>{
        console.log(err)
      })
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            //带着form请求后台
            console.log(this.ruleForm)
            this.$axios.post("http://localhost:8082/sys/user/add",this.ruleForm)
            .then(res=>{
              console.log(res.data)
              if(res.data.code==0){
                this.$router.push('/login')
              }
            })
            .catch(err=>{
              console.log(err)
            })
            //响应后，显示添加成功或失败

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      /* findDeptById(id){
        this.$axios.get("http://localhost:8082/sys/department/findDeptById"
        ,this.$qs.stringify({deptCategoryID:id}))
      } */
    }
  }
</script>

<style>
  .demo-ruleForm {
    width: 80%;
  }
</style>
