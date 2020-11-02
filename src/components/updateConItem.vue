<template>
<el-dialog title="修改常数项" :visible.sync="dialogFormVisible" @closed="resetDialog">

 <el-form :model="ruleForm"   ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="常数类别" prop="ct">
      <el-select v-model="ruleForm.constantTypeID">
        <el-option v-for="item in cTypeList" :key="item.id" :value="item.id" :label="item.constantTypeName"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="常数项名称" prop="ciName">
      <el-input v-model="ruleForm.constantName"></el-input>
    </el-form-item>
    <el-form-item label="常数项编码" prop="ciCode">
      <el-input v-model="ruleForm.constantCode"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</el-dialog>


</template>

<script>
  export default {
    data() {
      return {
        dialogFormVisible:false,
        ruleForm: {
          id:"",
          constantTypeName:'',
          constantName:'',
          constantCode:'',
        },

        //常数类别的列表
        cTypeList:[],
      };
    },
    mounted() {
      this.$axios.get("http://localhost:8082/sys/constantType/findAll")
      .then(res=>{
        console.log(res.data)
        this.cTypeList = res.data
      })
      .catch(err=>{
        console.log(err)
      });

    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
            console.log(this.ruleForm)
            this.$axios.post("http://localhost:8082/sys/constantItem/add",this.ruleForm)
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
                message: '修改成功',
                type: 'success'
              });
            },
      resetForm(formName) {
        this.dialogFormVisible = false
        this.$refs[formName].resetFields();
      },
      resetDialog(){
        this.constantTypeForm={
          id:"",
          constantTypeName:'',
          constantName:'',
          constantCode:'',
        }
      }
    }
  }
</script>

<style>
  .demo-ruleForm {
    width: 80%;
  }
</style>
