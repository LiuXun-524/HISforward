<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" label-width="100">
        <el-row>
        <el-col :span="6">
          <el-form-item label="科室">
            <el-select v-model="ruleForm.deptID" placeholder="请选择科室" size="mini">
              <el-option v-for="item in deptList" :key="item.id" :value="item.id" :label="item.deptName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="3">
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" size="mini">查询</el-button>
            <el-button @click="resetForm('ruleForm')"  size="mini">重置</el-button>
          </el-form-item>
        </el-col>
        </el-row>

       </el-form>
       <el-table

         v-loading="loading"
         ref="multipleTable"
         :data="tableData"
         tooltip-effect="dark"
         style="width: 100%"
         @selection-change="handleSelectionChange">


         <el-table-column
           type="selection"
           width="55">
         </el-table-column>

         <el-table-column
           label="姓名"
           width="120"
           >
           <template slot-scope="scope">{{ scope.row.realName }}</template>
         </el-table-column>
          <el-table-column
           label="规则名称"
           width="120"
           >
           <template slot-scope="scope">{{ scope.row.ruleName }}</template>
         </el-table-column>

          <el-table-column
           label="规则"
           width="200"
           >
           <template slot-scope="scope">{{ scope.row.week }}</template>
         </el-table-column>

         <el-table-column
             label="操作"
             width="200">
             <template slot-scope="scope">
                <el-button @click="update(scope.row)" type="primary" size="small">修改</el-button>
                <el-button @click="delete(scope.row)" type="danger" size="small">删除</el-button>
             </template>
           </el-table-column>

         </el-table>
         <el-row>
           <el-col :span="12">
              <el-date-picker
                v-model="ruleForm.startDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>-
           </el-col>
           <el-col :span="12" >
              <el-date-picker

                v-model="ruleForm.endDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
           </el-col>
         </el-row>
         <el-row>
           <el-button @click="save" type="primary" size="small">保存规则生成排班</el-button>

         </el-row>
  </div>

</template>

<script>
  export default{
    data() {
      return {
        scheduArray:[],
        ruleForm:{
          deptID:'',
          startDate:'',
          endDate:''

        },
        deptList:[],
        tableData: [],
        multipleSelection: [],
        loading: true,

      }
    },
    mounted() {
      this.getDeptList()
    },
    methods: {
      submitForm(formName) {
        this.$axios.get("http://localhost:8081/rule/findRule?deptID=" + this.ruleForm.deptID)
        .then(res=>{
          console.log(res.data)
          this.tableData=res.data
          this.loading=false

        })
        .catch(err=>{
          console.log(err)
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getDeptList(){
        this.loading=false
        this.$axios.get("http://localhost:8082/sys/department/selectall")
        .then(res=>{
          console.log(res.data)
          this.deptList=res.data
        })
        .catch(err=>{
          console.log(err)
        })
      },
      handleSelectionChange(val) {
        console.log(val)
        this.multipleSelection = val;

      },
      save(){
        this.scheduArray=[]
         // alert(this.ruleForm.startDate);
         // alert(this.ruleForm.endDate);
         // alert(this.ruleForm.deptID);
         let usersels = this.multipleSelection
         for (var i = 0; i < usersels.length; i++) {
           let userid = usersels[i].userID
           let week = usersels[i].week
           let ruleID = usersels[i].id
           // alert("用户id"+userid)
           // alert("规则"+week)
           //每循环到一次，就拼装一个scheduling对象，放到scheduArray，为传入后台
           let scheduling={
             deptID:this.ruleForm.deptID,
             startDate:this.ruleForm.startDate,
             endDate:this.ruleForm.endDate,
            ruleID:ruleID,
             userID:userid,
             week:week,
           }
           this.scheduArray.push(scheduling)
         }
         console.log(this.scheduArray)
          this.$axios.post("http://localhost:8081/scheduling/saveScheduleing",{schedulings:this.scheduArray})
          .then(res=>{
            console.log(res.data)
            if(res.data.code==1){

              this.$message.success("res.data.msg")
            }else{

              this.$message.warning("res.data.msg")
            }

          })
          .catch(err=>{
            console.log(err)
          })
       }

    },

  }
</script>

<style>
</style>
