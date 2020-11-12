<template>
  <div>
  <el-form ref="registerForm" :model="registerForm" :rules="rules" label-width="80px">
    <el-form-item label="发票号"  prop="rule1" >
      <el-input v-model="registerForm.invoiceNum" style="width: 20%;" ></el-input>
      <el-button type="primary" @click="submitForm('registerForm')">挂号</el-button>
      <el-button type="primary" @click="resetForm('registerForm')">清空</el-button>
    </el-form-item>

  <h1>挂号信息</h1>
  <hr>
  <el-row>
    <el-col :span="5">
      <el-form-item label="病历号"  >
        <el-input v-model="registerForm.caseNumber" size="mini" ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="5">
      <el-form-item label="姓名"  prop="rule2" >
        <el-input v-model="registerForm.realName" size="mini" ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="5">
      <el-form-item label="身份证号"  prop="rule3" >
        <el-input v-model="registerForm.iDNumber" size="mini" @change="getOthers"></el-input>
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
        <el-select size="mini" v-model="registerForm.gender" placeholder="请选择性别">
             <el-option label="男" value="1"></el-option>
             <el-option label="女" value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item label="年龄">
        <el-input v-model="registerForm.age" size="mini" ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="4">
      <el-form-item label="岁别">
         <el-select size="mini"  v-model="registerForm.ageType" placeholder="请选择年龄类型">
              <el-option label="岁" value="岁"></el-option>
              <el-option label="月" value="月"></el-option>
              <el-option label="天" value="天"></el-option>
         </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="11">
      <el-form-item label="家庭住址"   prop="rule4" >
        <el-input  size="mini" v-model="registerForm.homeAddress"></el-input>
      </el-form-item>
    </el-col>

  </el-row>
  <el-row>
    <el-col :span="4">
      <el-form-item label="结算类型">
         <el-select size="mini"  v-model="registerForm.settleID" placeholder="请选择结算类型">
              <el-option v-for="item in settleList" :key="item.id" :label="item.settleName" :value="item.id"></el-option>
         </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="10">
      <el-form-item label="看诊日期">
        <el-date-picker size="mini" type="date" placeholder="选择日期" v-model="registerForm.visitDate" value-format="yyyy-MM-dd"></el-date-picker>
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
     <el-select size="mini"  v-model="registerForm.registLeID" placeholder="请选择号别" @change="selRegister">
          <el-option v-for="item in relgistLeList" :key="item.id" :label="item.registName" :value="item.id"></el-option>
     </el-select>
  </el-form-item>
  </el-col>
  <el-col :span="4">
  <el-form-item label="看诊医生">
     <el-select size="mini"  v-model="registerForm.userID" placeholder="请选择看诊医生" @change="getNum">
          <el-option v-for="item in userList" :key="item.id" :label="item.realName" :value="item.id"></el-option>
     </el-select>
  </el-form-item>
  </el-col>

  <el-col :span="5">
    <el-form-item label="初始号额">
      <el-input  size="mini" v-model="registerForm.registQuota"></el-input>
    </el-form-item>
  </el-col>
  <el-col :span="5">
    <el-form-item label="已用号额" >
      <el-input  size="mini" v-model="registerForm.usedRegistQuota"></el-input>
    </el-form-item>
  </el-col>
</el-row>
<el-row>
  <el-col :span="5">
    <el-form-item label="病历本" >
      <el-radio v-model="registerForm.isBook" label="1" value="1" @change="radioChange">是</el-radio>
      <el-radio v-model="registerForm.isBook" label="2" value="2" @change="radioChange">否</el-radio>
    </el-form-item>
  </el-col>
  <el-col :span="5">
    <el-form-item label="应收金额">
      <el-input  size="mini" v-model="registerForm.registFee" ></el-input>
    </el-form-item>
  </el-col>
  <el-col :span="4">
  <el-form-item label="收费方式">
     <el-select size="mini" placeholder="请选择收费方式" v-model="registerForm.payType">
          <el-option v-for="item in itemList" :key="item.id" :label="item.constantName" :value="item.id"></el-option>
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
            iDNumber:'',
            birthDate:'',
            gender:'',
            age:'',
            homeAddress:'',
            ageType:'岁',
            settleID:'',
            visitDate:'',
            deptID:'',
            userID:'',
            isBook:'2',
            registLeID:'',
            registFee:'',
            registQuota:'',
            payType:'',
            usedRegistQuota:'',
            noon:'',
            registTime:'',
            visitState:1
          },
          //结算类别列表，从后台获取
          settleList:[],
          deptList:[],
          relgistLeList:[],
          userList:[],
          itemList:[],

          rules:{
            rule1: [
              { required: true, message: '请输入必填项', trigger: 'blur' }
            ],rule2: [
              { required: true, message: '请输入必填项', trigger: 'blur' }
            ],rule3: [
              { required: true, message: '请输入必填项', trigger: 'blur' }
            ],rule4: [
              { required: true, message: '请输入必填项', trigger: 'blur' }
            ],
          }
        }
      },
      mounted(){
        this.$axios.get("http://localhost:8081/sys/register/findCaseNumber")
              .then(res=>{
                this.registerForm.caseNumber=parseInt(res.data)+1;
              })

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
          console.log("挂号级别的数据")
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
        this.$axios.get("http://localhost:8082/sys/constantType/findAllDeptCate",{params:{
       constantTypeName:'收费方式'}})
        .then(res=>{
          console.log(res.data)
          this.itemList=res.data
        })
        .catch(err=>{
          console.log(err)
        });
        this.$axios.get("http://localhost:8081/sys/settleCategory/findAll")
        .then(res=>{
          console.log(res.data)
          this.settleList=res.data
        })
        .catch(err=>{
          console.log(err)
        });
      },
      methods: {
        radioChange(){
          //应收金额
          if(this.registerForm.isBook==1){
            this.registerForm.registFee=parseInt(this.registerForm.registFee)+1;
          }else{
            this.registerForm.registFee=parseInt(this.registerForm.registFee)-1;
          }
        },

        getNum(){
          let userID = this.registerForm.userID
          let visitDate = this.registerForm.visitDate

          this.$axios.get("http://localhost:8081/sys/register/findUsedQuota",{params:{
            userID:userID,
            visitDate:visitDate
          }})
          .then(res=>{
            console.log(res.data)
            this.registerForm.usedRegistQuota = res.data
          })
        },
        getOthers(){
          //计算出生日期，计算岁别和岁数
          let iDNumber = this.registerForm.iDNumber
          let year = iDNumber.substring(6,10)
          let month = iDNumber.substring(10,12)
          let day = iDNumber.substring(12,14)
          let date = `${year}-${month}-${day}`

          this.registerForm.birthDate = date

          //step1获取当前日期并拼成yyyy-MM-dd的形式
          let now = new Date()
          let curdate = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`
          let nowmill = Date.parse(curdate)
          let birthmill = Date.parse(date)
          let days = parseInt((nowmill-birthmill)/(1000*3600*24))
          if(days<365){
            if(days<30){
              this.registerForm.age = days
              this.registerForm.ageType = '天'
            }else{
              this.registerForm.age = parseInt(days/30)
              this.registerForm.ageType = '月'
            }
          }else{
            this.registerForm.age = parseInt(days/365.25)
          }
        },
        selRegister(){
          let registLeID = this.registerForm.registLeID
          for (var i = 0; i < this.relgistLeList.length; i++) {
            if(this.relgistLeList[i].id ==registLeID){
              this.registerForm.registFee = this.relgistLeList[i].registFee
              this.registerForm.registQuota = this.relgistLeList[i].registQuota

            }
          }
          //根据挂号日期，午别，科室，挂号级别这四项查询医生
          let schedDate = this.registerForm.visitDate
          let noon = this.registerForm.noon
          let deptID = this.registerForm.deptID
          console.log("往后台传的玩意")
          console.log(registLeID)
          console.log(schedDate)
          console.log(noon)
          console.log(deptID)
          this.$axios.get("http://localhost:8082/sys/user/findAllUserByParams",{params:{
           registLeID:registLeID,
           schedDate:schedDate,
           noon:noon,
           deptID:deptID
           }})
            .then(res=>{
              console.log(res.data)
              this.userList=res.data
            })
            .catch(err=>{
              console.log(err)
            });
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
              console.log(this.registerForm)
              this.$axios.post("http://localhost:8081/sys/register/save",this.registerForm)
              .then(res=>{
                console.log(res.data)
                if(res.data==[]){
                  console.log("插入失败")
                }else{
                  console.log("插入成功")
                }
              })
              .catch(err=>{
                console.log(err)
              });

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
