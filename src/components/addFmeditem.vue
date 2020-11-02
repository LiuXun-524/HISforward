<template>
  <div>

  <el-button type="success" @click="dialogFormVisible = true"  size="small">新增</el-button>

  <el-dialog title="添加费用科目" :visible.sync="dialogFormVisible">
  <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="ruleForm">
      <!-- prop指定的是验证规则 -->
    <el-form-item label="项目编码" >
      <el-input v-model="ruleForm.itemCode"></el-input>
    </el-form-item>
    <el-form-item label="项目名称" >
      <el-input v-model="ruleForm.itemName" ></el-input>
    </el-form-item>
<el-form-item label="规格" >
      <el-input v-model="ruleForm.format" ></el-input>
    </el-form-item>

<el-form-item label="单价" >
      <el-input v-model="ruleForm.price" ></el-input>
    </el-form-item>

<el-form-item label="所属费用科目ID" >
      <el-input v-model="ruleForm.expClassID" ></el-input>
    </el-form-item>

<el-form-item label="执行科室ID" >
      <el-input v-model="ruleForm.deptID" ></el-input>
    </el-form-item>

<el-form-item label="拼音助记码" >
      <el-input v-model="ruleForm.mnemonicCode" ></el-input>
    </el-form-item>

<el-form-item label="创建时间" >
      <el-input v-model="ruleForm.creationDate" ></el-input>
    </el-form-item>

<el-form-item label="最后修改时间" >
      <el-input v-model="ruleForm.lastUpdateDate" ></el-input>
    </el-form-item>

<el-form-item label="项目类型" >
      <el-input v-model="ruleForm.recordType" ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </el-form-item>
  </el-form>
  </el-dialog>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        ruleForm:{
          id:'',
          itemCode : '',
          itemName : '',
          format : '',
          price : '',
          expClassID : '',
          deptID : '',
          mnemonicCode : '',
          creationDate : '',
          lastUpdateDate : '',
          recordType : '',
        },
        dialogFormVisible: false,
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
            console.log(this.ruleForm)
            this.$axios.post("http://localhost:8082/sys/fmeditem/add",this.ruleForm)
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
        this.dialogFormVisible = false
        this.$refs[formName].resetFields();
      },

    }

  }

</script>

<style>
</style>
