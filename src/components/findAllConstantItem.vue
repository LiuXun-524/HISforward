<template>
  <div>
    <div class="header">
       <el-tag  effect="dark" type="success">新增</el-tag>
       <el-tag @click="delAll" effect="dark" type="danger">删除</el-tag>
     </div>

    <el-row id="elrow">

        <constantItemAdd ></constantItemAdd>
        <div>
        <el-button type="primary" @click="updateAll" plain>刷新</el-button>
        </div>
    </el-row>
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
        label="类型ID"
        width="120"
        >
        <template slot-scope="scope">{{ scope.row.constantTypeID }}</template>
      </el-table-column>

      <el-table-column
        prop="constantCode"
        label="常数项编码"
        width="120">
      </el-table-column>

      <el-table-column
        prop="constantName"
        label="常数项名称"
        width="120">
      </el-table-column>

      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
         <el-button @click="update(scope.row)" type="primary" size="small">修改</el-button>
          <el-button @click="delete(scope.row)" type="danger" size="small">删除</el-button>
          <el-button type="text" size="small">编辑</el-button>
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
  </div>


</template>

<script>
  import constantItemAdd from '@/components/constantItemAdd.vue'
  export default {
    data() {
      return {
        //tableData数据要请求后台查询得到
        tableData: [],
        multipleSelection: [],
        pageSize:5,
        currentPage:1,
        total:0,
        pageCount:0,
        //用于存放所有要被删除的id的集合
        ids:[],
      }
    },
    components:{
      constantItemAdd
    },
    mounted() {

      this.findall()
    },
    methods: {
      update(row) {
      //点击修改时触发
            this.$router.push({path:'/updateConItem',query:row})
     },
     delete(row) {
       //点击修改时触发
             console.log(row);
      }
,
      updateAll(){
         this.findall()
      },
      delAll(){
        //每次都要先清空ids，防止累加
        this.ids=[]
        //把this.multipleSelection
        for(let i=0;i<this.multipleSelection.length;i++){
          let id = this.multipleSelection[i].id

          this.ids.push(id)
        }
        //把循环得到的ids这个数组转成用逗号分隔的字符串
        let idsstr = this.ids.toString()
        console.log(idsstr)
        //请求后台、删除
        this.$axios.get("http://localhost:8082/sys/constantItem/delAll",{params:{'idsstr':idsstr}})
        .then(res=>{
          console.log(res.data)
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
        console.log(val)
        this.multipleSelection = val;

      },
      changePage(currentPage){
        this.currentPage = currentPage
        //调用分页的函数（根据上面两个参数来做）
        this.findall()
      }
,findall(){
  //请求后台进行查询，携带当前页码和每页条数
this.$axios.get("http://localhost:8082/sys/constantItem/findAllConstantItemPage",{params:{
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
.header{
  width:100%;
  display: flex;
  justify-content: flex-start;
  margin:15px;
}

</style>
