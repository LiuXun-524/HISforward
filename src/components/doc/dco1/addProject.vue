<template>
<div>
  <el-input placeholder="请输入内容" style="width: 100%" size="medium">
    <template slot="prepend">患者名：</template>
    <el-button slot="append" icon="el-icon-search" ></el-button>
  </el-input>
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
          label="项目编码"
          width="120"
          >
          <template slot-scope="scope">{{ scope.row.itemCode }}</template>
        </el-table-column>
        <el-table-column
          prop="itemName"
          label="项目名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="format"
          label="规格"
          width="120">
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价"
          width="120">
        </el-table-column>
        <el-table-column
          prop="expClassID"
          label="所属费用科目ID"
          width="120">
        </el-table-column>
        <el-table-column
          prop="deptID"
          label="执行科室ID"
          width="120">
        </el-table-column>
        <el-table-column
          prop="mnemonicCode"
          label="拼音助记码"
          width="120">
        </el-table-column>
  <el-table-column
          prop="creationDate"
          label="创建时间"
          width="120">
        </el-table-column>

  <el-table-column
          prop="lastUpdateDate"
          label="最后修改时间"
          width="120">
        </el-table-column>

  <el-table-column
          prop="recordType"
          label="项目类型"
          width="120">
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

  <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :page-size="pageSize"
    :page-count="pageCount"
    @current-change="changePage"
    >
  </el-pagination>
    <el-select size="mini" v-model="ruleForm.state" placeholder="执行状态">
         <el-option label="暂存" value="1"></el-option>
         <el-option label="已开立" value="2"></el-option>
         <el-option label="已交费" value="3"></el-option>
         <el-option label="已登记" value="4"></el-option>
         <el-option label="执行完" value="5"></el-option>
         <el-option label="已退费" value="6"></el-option>
         <el-option label="已作废" value="0"></el-option>
    </el-select>
    <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
    <el-button @click="resetForm('ruleForm')">取消</el-button>
</div>

</template>

<script>
  export default{
    data() {
      return {
        ruleForm: {
          state:'',
          loading:true,
          tableData: [],
          multipleSelection: [],
          pageSize:8,
          currentPage:1,
          total:0,
          pageCount:0,
        }
      }
    },
    mounted() {
      this.findall()
    },
    methods: {
      findall(){
      this.$axios.get("http://localhost:8082/sys/fmeditem/findAllPage",{params:{
        currentPage:this.currentPage,
        pageSize:this.pageSize
      }})
            .then(res=>{
              console.log(res.data)
              //期待传回的值    总条数、数据
              //this.tableData = res.data
              this.tableData = res.data.list
              this.total = res.data.total
              this.pageCount = res.data.pages
            })
            .catch(err=>{
              console.log(err)
            })
      },
      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {

          } else {

          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  }
</script>

<style>
</style>
