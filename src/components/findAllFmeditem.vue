<template>
  <div>
    <div id="headdder">
      <div class="lrspace">
      <el-button @click="updateAll" type="primary" size="small">刷新</el-button>
      </div>
      <div class="lrspace">
      <el-button @click="delAll" type="warning" size="small">批量删除</el-button>
      </div>
      <div  class="lrspace" >
      <addFmeditem></addFmeditem>
      </div>
    </div>
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

<updateFmeditem ref="updateRef"></updateFmeditem>
  </div>


</template>

<script>
  import addFmeditem from '@/components/addFmeditem.vue'
  import updateFmeditem from '@/components/updateFmeditem.vue'
  export default {
    data() {
      return {
        //tableData数据要请求后台查询得到
        tableData: [],
        multipleSelection: [],
        pageSize:8,
        currentPage:1,
        total:0,
        pageCount:0,
      }
    },
    components:{
      addFmeditem,
      updateFmeditem
    },
    mounted() {

      this.findall()
    },
    methods: {
      update(row) {
      //点击修改时触发
          this.$refs.updateRef.dialogFormVisible = true
          this.$refs.updateRef.ruleForm.id = row.id
          this.$refs.updateRef.ruleForm.itemCode = row.itemCode
          this.$refs.updateRef.ruleForm.itemName = row.itemName
          this.$refs.updateRef.ruleForm.format = row.format
          this.$refs.updateRef.ruleForm.price = row.price
          this.$refs.updateRef.ruleForm.expClassID = row.expClassID
          this.$refs.updateRef.ruleForm.deptID = row.deptID
          this.$refs.updateRef.ruleForm.mnemonicCode = row.mnemonicCode
          this.$refs.updateRef.ruleForm.creationDate = row.creationDate
          this.$refs.updateRef.ruleForm.lastUpdateDate = row.lastUpdateDate
          this.$refs.updateRef.ruleForm.recordType = row.recordType
     },
     delete(row) {
             console.log(row);
      },
      updateAll(){
         this.findall()
      },
      delAll(){
        this.ids=[]
        for(let i=0;i<this.multipleSelection.length;i++){
          let id = this.multipleSelection[i].id
          this.ids.push(id)
        }
        let idsstr = this.ids.toString()
        this.$axios.get("http://localhost:8082/sys/fmeditem/delAll",{params:{'idsstr':idsstr}})
        .then(res=>{
          console.log(res.data)
        })
        .catch(err=>{
          console.log(err)
        })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      changePage(currentPage){
        this.currentPage = currentPage
        this.findall()
      }
,findall(){
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
}
    }
  }
</script>
<style>
  #elrow{
    display: flex;
    justify-content: space-around;
  }
#headdder{
  display: flex;
}
.lrspace{
  margin: 0px 15px 0px 0px;
}
</style>
