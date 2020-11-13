<template>
<el-container>
  <el-main>
  <el-dialog title="新增排班规则" :visible.sync="dialogFormVisible" width="80%">
    <addProject></addProject>
  </el-dialog>
    <el-row style="background-color: #EAF1F5;margin-top: -20px" >

        <el-col :span="4" >
        <el-button type="text" size="small" class="el-icon-circle-plus" @click="addProject">新增项目</el-button>
        </el-col><el-col :span="4" >
        <el-button type="text" size="small" class="el-icon-remove" @click="delProject">删除项目</el-button>
        </el-col><el-col :span="4" >
        <el-button type="text" size="small" class="el-icon-success" @click="setProject">开立项目</el-button>
        </el-col><el-col :span="4" >
        <el-button type="text" size="small" class="el-icon-delete-solid" @click="dropProject">作废项目</el-button>
        </el-col><el-col :span="4" >
        <el-button type="text" size="small" class="el-icon-circle-plus-outline" @click="saveTemplate" :disabled="isSaved">存为组套</el-button>
        </el-col>
        <el-col :span="4" >
        <el-button type="text" size="small" class="el-icon-refresh" @click="refreshProject">刷新</el-button>
       </el-col>
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
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
  </el-main>
  <el-aside>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>常用模板</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <el-table
            :data="templateDate"
            tooltip-effect="dark"
            style="width: 100%"
            >
            <el-table-column
              prop="name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
      </el-card>
  </el-aside>
</el-container>
</template>

<script>
  import addProject from '@/components/doc/dco1/addProject.vue'
  export default{

    data() {
      return {
        tableData: [],
        multipleSelection: [],
        templateDate:[],
        isSaved:true,
        dialogFormVisible: false,

      }

    },
    components:{
      addProject
    },
    methods: {
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
      addProject(){
        this.dialogFormVisible = true
      },
      delProject(){

      },
      setProject(){

      },
      dropProject(){

      },
      saveTemplate(){

      },
      refreshProject(){

      },
    },
  }
</script>

<style>
</style>
