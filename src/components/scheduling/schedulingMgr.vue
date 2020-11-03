<template>
  <div>
  <!-- 新增排班规则-->
  <!-- 根据排班规则排班-->
  <div>

<el-button type="success" @click="dialogFormVisible = true"  size="small">新增排班规则</el-button>
<el-button type="success" @click="dialogFormVisible1 = true"  size="small">根据排班规则进行排班</el-button>
  </div>

  <el-dialog title="新增排班规则" :visible.sync="dialogFormVisible" width="80%">
  <rule></rule>
  </el-dialog>
  <el-dialog title="新增排班规则" :visible.sync="dialogFormVisible1" width="80%">
  <addScheduling></addScheduling>
  </el-dialog>

  </div>
</template>

<script>
  import rule from '@/components/scheduling/rule.vue'
  import addScheduling from '@/components/scheduling/addScheduling.vue'
  export default{
    data() {
      return {
        dialogFormVisible: false,
        dialogFormVisible1: false,
      }
    },
    components:{
      rule,
      addScheduling
    }
  }
</script>

<style>
</style>
