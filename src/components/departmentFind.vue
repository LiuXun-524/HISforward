<template>
  <div>

      <el-button @click="findall" type="primary" size="small">刷新</el-button>
      <el-button @click="findall" type="success" size="small">新增</el-button>
      <el-button @click="findall" type="warning" size="small">清除筛选</el-button>
      <el-button @click="delAll" type="danger" size="small">批量删除</el-button>

    <el-dropdown @command="ParamHandleCommandByDcid" id="firstElDrop">
      <el-button size="small" type="primary">
        筛选科室分类<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item :command="dc.id" v-for="dc in deptCate" :key="dc.id" >{{dc.constantName}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>


    <el-dropdown @command="ParamHandleCommand">
      <el-button size="small" type="primary">
        筛选科室类型<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1">临床</el-dropdown-item>
        <el-dropdown-item command="2">医技</el-dropdown-item>
        <el-dropdown-item command="3">财务</el-dropdown-item>
        <el-dropdown-item command="4">行政</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

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
      label="科室编码"
      width="120"
      >
      <template slot-scope="scope">{{ scope.row.deptCode }}</template>
    </el-table-column>

    <el-table-column
      prop="deptName"
      label="科室名称"
      width="120">
    </el-table-column>

    <el-table-column
      prop="constantName"
      label="所属科室"
      width="120">
    </el-table-column>

    <el-table-column
      prop="deptType"
      label="科室分类"
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
  </div>
</template>

<script>
  export default{
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        pageSize:8,
        currentPage:1,
        total:0,
        pageCount:0,
        loading: true,
        deptCate:[],
        Department:{
          deptCategoryID:'',
          deptType:'',
        }




      }
    },
    mounted() {
      this.selectallByParam()
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
    methods: {
      ParamHandleCommandByDcid(command){
        this.Department = {
          deptCategoryID:'',
          deptType:'',
        }
        console.log("this.Department.deptCategoryID请看这里**********")
        console.log(this.Department.deptCategoryID)
        this.Department.deptCategoryID = command
        console.log(this.Department.deptCategoryID)

        this.$message('查询' + command);
        this.selectallByParam()
      },
      ParamHandleCommand(command){
        this.Department = {
          deptCategoryID:'',
          deptType:'',
        }
        console.log("this.Department.deptType请看这里**********")
        console.log(this.Department.deptType)
        this.Department.deptType = command
        console.log(this.Department.deptType)

        this.$message('查询' + command);
        this.selectallByParam()
      },

selectallByParam(){
        console.log("往后台传的什么数据：Department请看这里")
        console.log(this.Department)
        this.loading = true
        this.$axios.get("http://localhost:8082/sys/department/selectallByParam",{params:{
          currentPage:this.currentPage,
          pageSize:this.pageSize,
          deptCategoryID:this.Department.deptCategoryID,
          deptType:this.Department.deptType ,
          }})
              .then(res=>{
                console.log("后台返的什么数据")
                console.log(res.data.list)
                this.tableData = res.data.list
                this.total = res.data.total
                this.pageCount = res.data.pages
                this.loading=false
              })
              .catch(err=>{
                console.log(err)
              })
        },

/* handleCommandCate(command){
  this.$message('查询' + command);
  this.loading = true
  console.log(command)
  this.$axios.get("http://localhost:8082/sys/department/findPartDeptByDcid",{params:{
    deptType:command}})
        .then(res=>{
          console.log(res.data)
          this.tableData = res.data
          this.total = 1
          this.pageCount = 1
          this.loading=false
        })
        .catch(err=>{
          console.log(err)
        })
},
      handleCommand(command) {
         this.$message('查询' + command);
         this.loading = true
         this.$axios.get("http://localhost:8082/sys/department/findPartDept",{params:{
           deptType:command}})
               .then(res=>{
                 console.log(res.data)
                 this.tableData = res.data
                 this.total = 1
                 this.pageCount = 1
                 this.loading=false
               })
               .catch(err=>{
                 console.log(err)
               })
      },*/
delAll(){
        this.ids=[]
        for(let i=0;i<this.multipleSelection.length;i++){
          let id = this.multipleSelection[i].id
          this.ids.push(id)
        }
        let idsstr = this.ids.toString()
        this.$axios.get("http://localhost:8082/sys/constantType/delAll",{params:{'idsstr':idsstr}})
        .then(res=>{
          console.log(res.data)
        })
        .catch(err=>{
          console.log(err)
        })
      },
      findall(){
        //请求后台进行查询，携带当前页码和每页条数
        this.loading = true
      this.$axios.get("http://localhost:8082/sys/department/findAllDeptPage",{params:{
        currentPage:this.currentPage,
        pageSize:this.pageSize}})
            .then(res=>{
              console.log(res.data)
              this.tableData = res.data.list
              this.total = res.data.total
              this.pageCount = res.data.pages
              this.loading=false
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
    console.log(val)
    this.multipleSelection = val;

  },
  changePage(currentPage){
    this.currentPage = currentPage
    //调用分页的函数（根据上面两个参数来做）

    this.selectallByParam()


  }
  }
}
</script>

<style>
  .el-dropdown {
      vertical-align: top;
    }
    .el-dropdown + .el-dropdown {
      margin-left: 15px;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
    #firstElDrop{
      margin-left: 5px;
    }


</style>
