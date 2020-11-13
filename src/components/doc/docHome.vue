<template>
  <el-container>
    <el-aside
    width="300px"
    v-if="showMenu"
    >
    <registerItem @postReg="getReg"></registerItem>
    </el-aside>

    <el-main id="mianBlock">
      <el-button @click="showAside" type="primary" size="mini">
        {{showButtonText}}
      </el-button>
      <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="病历首页" name="first">
              <Menu1  :patient="patient" ></Menu1>
          </el-tab-pane>
          <el-tab-pane label="检查申请" name="second">
              <menu2></menu2>
          </el-tab-pane>
          <el-tab-pane label="检验申请" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="门诊确诊" name="fourth">定时任务补偿</el-tab-pane>
          <el-tab-pane label="处置申请" name="fivth">定时任务补偿</el-tab-pane>
          <el-tab-pane label="成药处方" name="sixth">定时任务补偿</el-tab-pane>
          <el-tab-pane label="草药处方" name="seventh">定时任务补偿</el-tab-pane>
          <el-tab-pane label="费用查询" name="eighth">定时任务补偿</el-tab-pane>
        </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
  import registerItem from '@/components/doc/dco1/registerItem.vue'
  import Menu1 from '@/components/doc/Menu1.vue'
  import menu2 from '@/components/doc/menu2.vue'
  export default{
    data() {
      return {
        activeName: 'second',
        showButtonText:'隐藏侧边栏',
        showMenu:true,

        isSaved:false,
        textarea:'',
        currentRow: null,
        multipleSelection:[],
        selectPatient:'',


        patient:{}
      }
    },
    components:{
      registerItem,
      Menu1,
      menu2
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getReg(obj){
        console.log(obj)
        this.patient = obj
      },
      showAside(){
        this.showMenu = !this.showMenu;
          if (this.showMenu) {
            this.showButtonText = "隐藏侧边栏";
          } else {
            this.showButtonText = "显示侧边栏";
          }
      },
      handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection)
      },
      stageCheck(){

      },
      saveCheck(){

      },
      cleanCheck(){

      },
      refMedicalRecord(){

      },

  },





  }
</script>

<style>
.col-refBut{
  margin-right: 0;
}
.el-col-12{
  width: 10%;
}
.el-aside{
line-height: 40px;
}
#mianBlock{
  padding-top: 0px;
}

</style>
