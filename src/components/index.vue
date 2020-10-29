<template>
  <div class="top">
    <el-container>
      <el-header>H.I.S</el-header>
      <el-container>
        <el-aside width="200px">
          <leftMenu>

          </leftMenu>
        </el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import leftMenu from '@/components/left'
  export default {
    data() {
      return {}
    },
    components:{
      leftMenu
    },
    methods:{

    }
  }
</script>

<style>
  .top {
    height: 100%;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    height: 100%;
    background-color: #D3DCE6;
    color: #333;

    line-height: 200px;
  }

  .el-main {
    height: 100%;
    background-color: #E9EEF3;
    color: #333;

    line-height: 50px;
  }

  html,body {
    height: 100%;
  }

  #app {
    height: 100%;
  }

  .el-container {
    height: 100%;
  }
</style>
