<template>
  <div>
  <el-form ref="registerForm" :model="registerForm" :rules="rules" label-width="80px">
    <el-form-item label="发票号"  prop="rulel" >
      <el-input v-model="registerForm.invoiceNum" style="width: 20%;" ></el-input>
      <el-button type="primary" @click="submitForm('registerForm')">挂号</el-button>
      <el-button type="primary" @click="resetForm('registerForm')">清空</el-button>
    </el-form-item>

  <h1>挂号信息</h1>
  <hr>
  <el-row>
    <el-col :span="5">
      <el-form-item label="病历号"  prop="rulel" >
        <el-input v-model="registerForm.caseNumber" size="mini" ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="5">
      <el-form-item label="姓名"  prop="rulel" >
        <el-input v-model="registerForm.realName" size="mini" ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="5">
      <el-form-item label="身份证号"  prop="rulel" >
        <el-input v-model="registerForm.iDnumber" size="mini" ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="5">
      <el-form-item label="出生日期">
        <el-date-picker size="mini"  type="date" placeholder="选择日期" v-model="registerForm.birthDate" ></el-date-picker>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="4">
      <el-form-item label="性别">
        <el-select size="mini" v-model="registerForm.gender" placeholder="请选择年龄类型">
             <el-option label="男" value="1"></el-option>
             <el-option label="女" value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="3">
      <el-form-item label="年龄">
        <el-input v-model="registerForm.age" size="mini" ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="3">
      <el-form-item label="岁别">
         <el-select size="mini"  v-model="registerForm.ageType" placeholder="请选择年龄类型">
              <el-option label="岁" value="岁"></el-option>
              <el-option label="月" value="月"></el-option>
              <el-option label="天" value="天"></el-option>
         </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="11">
      <el-form-item label="家庭住址">
        <el-input  size="mini" v-model="registerForm.homeAddress"></el-input>
      </el-form-item>
    </el-col>

  </el-row>
  <el-row>
    <el-col :span="3">
      <el-form-item label="结算类型">
         <el-select size="mini"  v-model="registerForm.settleID" placeholder="请选择结算类型">
              <el-option v-for="item in settleList" :key="item.id" :label="item.settleName" :value="item.id"></el-option>
         </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="10">
      <el-form-item label="看诊日期">
        <el-date-picker size="mini" type="date" placeholder="选择日期" v-model="registerForm.visitDate" ></el-date-picker>
        <el-select size="mini"  v-model="registerForm.noon" placeholder="请选择午别" >
             <el-option label="上午" value="上午"></el-option>
             <el-option label="下午" value="下午"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="6">
          <el-form-item label="挂号科室">
             <el-select size="mini"  v-model="registerForm.deptID" placeholder="请选择挂号科室">
                  <el-option v-for="item in deptList" :key="item.id" :label="item.deptName" :value="item.id"></el-option>
             </el-select>
          </el-form-item>
        </el-col>
  </el-row>
<el-row>
  <el-col :span="4">
  <el-form-item label="号别">
     <el-select size="mini"  v-model="registerForm.registLeID" placeholder="请选择号别">
          <el-option v-for="item in relgistLeList" :key="item.id" :label="item.registName" :value="item.id"></el-option>
     </el-select>
  </el-form-item>
  </el-col>
  <el-col :span="4">
  <el-form-item label="看诊医生">
     <el-select size="mini"  v-model="registerForm.userID" placeholder="请选择看诊医生">
          <el-option v-for="item in userList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
     </el-select>
  </el-form-item>
  </el-col>

  <el-col :span="5">
    <el-form-item label="初始号额">
      <el-input  size="mini" ></el-input>
    </el-form-item>
  </el-col>
  <el-col :span="5">
    <el-form-item label="已用号额">
      <el-input  size="mini" ></el-input>
    </el-form-item>
  </el-col>
</el-row>
<el-row>
  <el-col :span="5">
    <el-form-item label="病历本">
      <el-radio v-model="registerForm.isBook" label="1" value="是">是</el-radio>
      <el-radio v-model="registerForm.isBook" label="2" value="否">否</el-radio>
    </el-form-item>
  </el-col>
  <el-col :span="5">
    <el-form-item label="应收金额">
      <el-input  size="mini" ></el-input>
    </el-form-item>
  </el-col>
  <el-col :span="4">
  <el-form-item label="收费方式">
     <el-select size="mini" placeholder="请选择收费方式">
          <el-option v-for="item in itemList" :key="item.id" :label="item.constanName" :value="item.id"></el-option>
     </el-select>
  </el-form-item>
  </el-col>
</el-row>

  </el-form>
  </div>
</template>

<script>
  export default{
      data() {
        return {
          registerForm:{
            invoiceNum:'',
            caseNumber:'',
            realName:'',
            iDnumber:'',
            birthDate:'',
            gender:'',
            age:'',
            homeAddress:'',
            ageType:'岁',
            settleID:'',
            visitDate:'',
            deptID:'',
            userID:'',
            isBook:''
          },
          //结算类别列表，从后台获取
          settleList:[],
          deptList:[],
          relgistLeList:[],
          userList:[],
          itemList:[],

          rules:{
            rulel: [
              { required: true, message: '请输入必填项', trigger: 'blur' }

            ],
          }
        }
      },
      mounted(){
        this.$axios.get("http://localhost:8082/sys/department/selectall")
        .then(res=>{
          console.log(res.data)
          this.deptList=res.data
        })
        .catch(err=>{
          console.log(err)
        })
        this.$axios.get("http://localhost:8082/sys/registlevel/selectall")
        .then(res=>{
          console.log(res.data)
          this.relgistLeList=res.data
        })
        .catch(err=>{
          console.log(err)
        })
        this.$axios.get("http://localhost:8082/sys/user/selectall")
        .then(res=>{
          console.log(res.data)
          this.userList=res.data
        })
        .catch(err=>{
          console.log(err)
        });
        this.$axios.get("http://localhost:8082/sys/constantType/findPayType",{params:{
       constantTypeName:'收费方式'}})
        .then(res=>{
          console.log(res.data)
          this.itemList=res.data
        })
        .catch(err=>{
          console.log(err)
        });
        this.$axios.get("http://localhost:8082/sys/settleCategory/findAll")
        .then(res=>{
          console.log(res.data)
          this.settleList=res.data
        })
        .catch(err=>{
          console.log(err)
        });
      },
      methods: {

        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }

  }

</script>

<style>

</style>
