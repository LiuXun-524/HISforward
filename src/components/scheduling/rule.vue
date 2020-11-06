<template>
  <!-- 选择-->
  <el-form ref="ruleForm" :model="ruleForm" label-width="100">
    <el-row>
    <el-col :span="6">
      <el-form-item label="科室">
        <el-select v-model="ruleForm.deptID" placeholder="请选择科室" size="mini">
          <el-option v-for="item in deptList" :key="item.id" :value="item.id" :label="item.deptName"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="挂号级别">
        <el-select v-model="ruleForm.registLeID" placeholder="请选择挂号级别" size="mini">
          <el-option v-for="item in registLeList" :key="item.id" :value="item.id" :label="item.registName"></el-option>
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
<el-row>
  <el-table
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
    <el-table-column label="周一上午" width="50">
      <template slot-scope="scope">
        <el-checkbox v-model="tableData[scope.$index].x0" true-label="1" false-label="0"></el-checkbox>
      </template>
    </el-table-column>
<el-table-column label="1下" width="50">
      <template slot-scope="scope">
        <el-checkbox v-model="tableData[scope.$index].x1" true-label="1" false-label="0"></el-checkbox>
      </template>
    </el-table-column>

<el-table-column label="2上" width="50">
      <template slot-scope="scope">
        <el-checkbox v-model="tableData[scope.$index].x2" true-label="1" false-label="0"></el-checkbox>
      </template>
    </el-table-column>

<el-table-column label="2下" width="50">
      <template slot-scope="scope">
        <el-checkbox v-model="tableData[scope.$index].x3" true-label="1" false-label="0"></el-checkbox>
      </template>
    </el-table-column>

<el-table-column label="3上" width="50">
      <template slot-scope="scope">
        <el-checkbox v-model="tableData[scope.$index].x4" true-label="1" false-label="0"></el-checkbox>
      </template>
    </el-table-column>

<el-table-column label="3下" width="50">
      <template slot-scope="scope">
        <el-checkbox v-model="tableData[scope.$index].x5" true-label="1" false-label="0"></el-checkbox>
      </template>
    </el-table-column>

<el-table-column label="4上" width="50">
      <template slot-scope="scope">
        <el-checkbox v-model="tableData[scope.$index].x6" true-label="1" false-label="0"></el-checkbox>
      </template>
    </el-table-column>

<el-table-column label="4下" width="50">
      <template slot-scope="scope">
        <el-checkbox v-model="tableData[scope.$index].x7" true-label="1" false-label="0"></el-checkbox>
      </template>
    </el-table-column>

<el-table-column label="5上" width="50">
      <template slot-scope="scope">
        <el-checkbox v-model="tableData[scope.$index].x8" true-label="1" false-label="0"></el-checkbox>
      </template>
    </el-table-column>

<el-table-column label="5下" width="50">
      <template slot-scope="scope">
        <el-checkbox v-model="tableData[scope.$index].x9" true-label="1" false-label="0"></el-checkbox>
      </template>
    </el-table-column>

<el-table-column label="6上" width="50">
      <template slot-scope="scope">
        <el-checkbox v-model="tableData[scope.$index].x10" true-label="1" false-label="0"></el-checkbox>
      </template>
    </el-table-column>

<el-table-column label="6下" width="50">
      <template slot-scope="scope">
        <el-checkbox v-model="tableData[scope.$index].x11" true-label="1" false-label="0"></el-checkbox>
      </template>
    </el-table-column>

<el-table-column label="7上" width="50">
      <template slot-scope="scope">
        <el-checkbox v-model="tableData[scope.$index].x12" true-label="1" false-label="0"></el-checkbox>
      </template>
    </el-table-column>

<el-table-column label="7下" width="50">
      <template slot-scope="scope">
        <el-checkbox v-model="tableData[scope.$index].x13" true-label="1" false-label="0"></el-checkbox>
      </template>
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

</el-row>
  <el-form-item label="规则名称">
    <el-input v-model="ruleForm.ruleName" placeholder="请输入规则名称" size="mini" style="width: 300px"></el-input>
    <el-button type="primary" size="mini" @click="saveRule">保存</el-button>
  </el-form-item>




  </el-form>
</template>

<script>
  export default{
    data() {
      return {
        ruleForm: {
          deptID:'',
          registLeID:'',
          ruleName:'',
          week:''
        },
        //科室的列表
        deptList:[],
        //挂号级别的列表
        registLeList:[],
        multipleSelection: [],
        tableData: [],
        ruleMapList:[]
      }
    },
    mounted() {
      this.getDlistAndRelist()
    },
    methods: {
saveRule(){
  this.ruleMapList=[]
  for (var i = 0; i < this.multipleSelection.length; i++) {
    let user = this.multipleSelection[i]
    let userId = user.id
    let weekStr =""+user.x0+user.x1+user.x2+user.x3+user.x4+user.x5+user.x6+user.x7+user.x8+user.x9+user.x10+user.x11+user.x12+user.x13
    console.log(weekStr)
    let ruleMap={deptID:this.ruleForm.deptID,ruleName:this.ruleForm.ruleName,userID:userId,week:weekStr}
    this.ruleMapList.push(ruleMap)
  }
  console.log(this.ruleMapList)
  this.$axios.post("http://localhost:8081/rule/save",{rules:this.ruleMapList})
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
},
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      getDlistAndRelist() {
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
      },
      submitForm(formName) {
        this.$axios.get("http://localhost:8081/rule/findUser?deptID=" + this.ruleForm.deptID + "&registLeID=" + this.ruleForm.registLeID)

        .then(res=>{
          console.log(res.data)
          this.tableData=res.data

        })
        .catch(err=>{
          console.log(err)
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  }
</script>

<style>
</style>
