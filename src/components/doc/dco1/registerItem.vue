<template>
  <div>

    <el-row type="flex" justify="space-between">
      <el-col :span="12">
        <el-tag>
          患者选择：{{selectPatient}}
        </el-tag>
      </el-col>
      <el-col :span="12" >
        <el-button class="col-refBut" type="primary" icon="el-icon-refresh" circle size="mini"></el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-input placeholder="请输入内容" style="width: 100%" size="medium">
        <template slot="prepend">患者名：</template>
        <el-button slot="append" icon="el-icon-search" ></el-button>
      </el-input>
    </el-row>
    <el-card class="box-card">
      <el-tabs v-model="selPatient" @tab-click="handleClick">
          <el-tab-pane label="本人" name="first">
            <el-tag style="width: 250px;">
              未诊患者:
            </el-tag>
            <el-table
                v-loading="loading"
                ref="singleTable"
                highlight-current-row
                @current-change="handleCurrentChange"
                tooltip-effect="dark"
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="caseNumber"
                label="病历号"
                width="90">
              </el-table-column>
              <el-table-column
                prop="realName"
                label="姓名"
                width="80">
              </el-table-column>
              <el-table-column
                prop="age"
                label="年龄">
              </el-table-column>
            </el-table>
            <el-divider></el-divider>
            <el-tag  style="width: 250px;">
              已诊患者:
            </el-tag>
            <el-table
            ref="singleTable"
            highlight-current-row
            @current-change="handleCurrentChange"
            tooltip-effect="dark"
              :data="tableData2"
              style="width: 100%">
              <el-table-column
                prop="caseNumber"
                label="病历号"
                width="90">
              </el-table-column>
              <el-table-column
                prop="realName"
                label="姓名"
                width="80">
              </el-table-column>
              <el-table-column
                prop="age"
                label="年龄">
              </el-table-column>
            </el-table>
            <el-divider></el-divider>
          </el-tab-pane>
          <el-tab-pane label="科室" name="second">
            <el-tag style="width: 250px;">
              未诊患者:
            </el-tag>
              <el-table
              ref="singleTable"
              highlight-current-row
              @current-change="handleCurrentChange"
              tooltip-effect="dark"
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="caseNumber"
                  label="病历号"
                  width="90">
                </el-table-column>
                <el-table-column
                  prop="realName"
                  label="姓名"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="age"
                  label="年龄">
                </el-table-column>
              </el-table>
            <el-divider></el-divider>
            <el-tag  style="width: 250px;">
              已诊患者:
            </el-tag>
            <el-table
            ref="singleTable"
            highlight-current-row
            @current-change="handleCurrentChange"
            tooltip-effect="dark"
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="caseNumber"
                label="病历号"
                width="90">
              </el-table-column>
              <el-table-column
                prop="realName"
                label="姓名"
                width="80">
              </el-table-column>
              <el-table-column
                prop="age"
                label="年龄">
              </el-table-column>
            </el-table>
            <el-divider></el-divider>
          </el-tab-pane>

        </el-tabs>

    </el-card>
  </div>

</template>

<script>
  export default{
    data() {
      return {
        selPatient:'first',
        tableData:[],
        tableData2:[],
        currentRow: null,
        multipleSelection:[],
        selectPatient:'',
        loading: true,
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleCurrentChange(val) {
        console.log(this.currentRow)
        this.currentRow = val;
        this.selectPatient = this.currentRow.realName
        this.$emit("postReg",this.currentRow)
      }
    },
    mounted() {
      let userID = sessionStorage.getItem("loginUserId")
      this.$axios.get("http://localhost:8081/sys/register/findPatientsByUserID",{params:{userID:userID,visitState:2}})
      .then(res=>{
        this.loading = false
        console.log(res.data)
        this.tableData=res.data
      })
      .catch(err=>{
        console.log(err)
      });
      this.$axios.get("http://localhost:8081/sys/register/findPatientsByUserID",{params:{userID:userID,visitState:3}})
      .then(res=>{
        this.loading = false
        console.log(res.data)
        this.tableData2=res.data
      })
      .catch(err=>{
        console.log(err)
      });
    }

  }
</script>

<style>
</style>
