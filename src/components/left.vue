<template>
  <div>

<el-row class="tac">
  <el-col :span="24">

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      active-text-color="#409EFF"
      text-color="#333"
      style="font-weight: 800; "
      >
       <el-submenu index="1" id="fontweight">
        <template slot="title" >
          <i class="el-icon-location"></i>
          <span>系统管理</span>
        </template>
        <el-submenu index="1-4">
          <template slot="title">常数管理</template>
          <el-menu-item index="/findAllConstantType">常数类型管理</el-menu-item>
          <el-menu-item index="/findAllConstantItem">常数项管理</el-menu-item>
        </el-submenu>
        <el-menu-item-group>
          <el-menu-item index="/register">用户管理</el-menu-item>
          <el-menu-item index="/departmentFind">科室管理</el-menu-item>
          <el-menu-item index="/registlevel">挂号类别管理</el-menu-item>
          <el-menu-item index="/findAllExpenseClass">费用科目管理</el-menu-item>
          <el-menu-item index="/findAllFmeditem">非药品收费项目管理</el-menu-item>
        </el-menu-item-group>
          <el-menu-item-group>
              <template slot="title">排班管理</template>
              <el-menu-item index="/schedulingMgr">排班规则管理</el-menu-item>
          </el-menu-item-group>
      </el-submenu>
      <el-submenu index="1-4">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>挂号管理</span>
          </template>
        <el-menu-item index="/findAllRegister">挂号管理</el-menu-item>
      </el-submenu>
      <el-submenu index="1-5">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>门诊医生</span>
          </template>
        <el-menu-item index="/docHome">门诊病历</el-menu-item>
      </el-submenu>

      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>

      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </el-col>
  </el-row>
  </div>
</template>

<script>
  export default{
    data() {
      return {
      }
    },
   methods: {
        handleOpen(key, keyPath) {
          //console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          //console.log(key, keyPath);
        }
      }
  }
</script>

<style>
  .el-menu{
    height: 100%;
    /* border: 1px solid #00BFFF; */

  }

/* .el-submenu__title{
  font-size: 20px;
  font-weight: 600;
}
.el-menu-item{
  font-size: 16px;
  font-weight: 600;
}
  .tac{
    height: 100%;
    background-color: #00BFFF;
    border: 1px solid #00BFFF;
  } */
</style>
