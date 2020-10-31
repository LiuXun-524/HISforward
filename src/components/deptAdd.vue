<template>
 <div>
<el-button type="success" @click="dialogFormVisible = true"  size="small">新增</el-button>

  <el-dialog title="添加科室" :visible.sync="dialogFormVisible">
 <el-form :model="ruleForm"   ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="科室大类" >
      <el-select v-model="ruleForm.deptCategoryID" placeholder="请选择常数类别">
        <el-option v-for="item in deptCate" :key="item.id" :value="item.id" :label="item.constantName"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="科室类别" >
      <el-select v-model="ruleForm.deptType" placeholder="请选择常数类别">
        <el-option value="1" label="临床"></el-option>
        <el-option value="2" label="医技"></el-option>
        <el-option value="3" label="财务"></el-option>
        <el-option value="4" label="行政"></el-option>
        <el-option value="5" label="其他"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="科室名称">
      <el-input v-model="ruleForm.deptName" placeholder="请输入科室名称"></el-input>
    </el-form-item>
    <el-form-item label="科室编码">
      <el-input v-model="ruleForm.deptCode" placeholder="请输入科室编码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </el-dialog>
 </div>


</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          deptCategoryID:'',
          deptType:'',
          deptName:'',
          deptCode:''
        },
         dialogFormVisible: false,
         deptCate:[],
      };
    },
    mounted() {
      this.findDeptCate()
    },
    methods: {
      findDeptCate(){
        this.$axios.get("http://localhost:8082/sys/constantType/findAllDeptCate",{params:{
        constantTypeName:'科室分类'}})
            .then(res=>{
              console.log("科室大类请看这里")
              console.log(res.data)
              this.deptCate = res.data
              this.loading=false
            })
            .catch(err=>{
              console.log(err)
            })
      },                
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
            console.log(this.ruleForm)
            this.$axios.post("http://localhost:8082/sys/department/add",this.ruleForm)
            .then(res=>{
              console.log(res.data)
              this.open2();
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
      open2() {
              this.$message({
                message: '添加成功',
                type: 'success'
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
  .demo-ruleForm {
    width: 80%;
  }
</style>
