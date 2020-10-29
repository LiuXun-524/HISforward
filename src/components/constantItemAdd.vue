<template>
  <!-- <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
 -->
 <div>
<el-button type="primary" @click="dialogFormVisible = true"  plain>添加</el-button>

  <el-dialog title="添加常数项类别" :visible.sync="dialogFormVisible">
 <el-form :model="ruleForm"   ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="常数类别" prop="ct">
      <el-select v-model="ruleForm.constantTypeID" placeholder="请选择常数类别">
        <el-option v-for="item in cTypeList" :key="item.id" :value="item.id" :label="item.constantTypeName"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="常数项名称" prop="ciName">
      <el-input v-model="ruleForm.constantName" placeholder="请输入常数项名称"></el-input>
    </el-form-item>
    <el-form-item label="常数项编码" prop="ciCode">
      <el-input v-model="ruleForm.constantCode" placeholder="请输入常数项名称编码"></el-input>
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
          constantTypeID:'',
          constantName:'',
          constantCode:''
        },
         dialogFormVisible: false,
        /* rules:{
          ct: [
            { required: true, message: '请选择常数项类别', trigger: 'change' }
          ],
          ciName: [
            { required: true, message: '请输入常数项名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          ciCode: [
            { required: true, message: '请填写常数项名称编码', trigger: 'change' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
        }, */
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
            // alert('submit!');
            //带着form请求后台
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
