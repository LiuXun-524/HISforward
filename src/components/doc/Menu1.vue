<template>
  <div>
        <el-row style="background-color: #EAF1F5;margin-top: -20px" >
            <el-col :span="8" style="margin-top: 4px;">

            </el-col>
            <el-col :span="4" >
            <el-button type="text" size="small" class="el-icon-tickets" @click="stageCheck">暂存</el-button>
            </el-col>
            <el-col :span="4" >
            <el-button type="text" size="small" class="el-icon-success" @click="saveCheck">提交</el-button>
            </el-col>
            <el-col :span="4" >
            <el-button type="text" size="small" class="el-icon-printer" :disabled="isSaved" @click="cleanCheck">清空所有</el-button>
            </el-col>
            <el-col :span="4" >
            <el-button type="text" size="small" class="el-icon-circle-plus-outline" @click="refMedicalRecord">刷新</el-button>
           </el-col>
        </el-row>
        <el-row class="but" style="width: 80px;">
          <el-tag>已选患者：{{patient.realName}}</el-tag>
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-col :span="4" class="but" style="text-align: center;margin-top: 4px;width: 80px;">
            <span>主诉</span>
          </el-col>
          <el-col :span="19">
            <el-input type="textarea" :rows="1" v-model="ruleFrom.readme" style="margin-left: 80px;">
            </el-input>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-col :span="5" class="but" style="text-align: center;margin-top: 4px;width: 80px;">
            <span>现病史</span>
          </el-col>
          <el-col :span="19">
            <el-input type="textarea" :rows="2" v-model="ruleFrom.present" style="margin-left: 80px;">
            </el-input>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-col :span="5" class="but" style="text-align: center;margin-top: 4px;width: 80px;">
            <span>现病治疗情况</span>
          </el-col>
          <el-col :span="19">
            <el-input type="textarea" :rows="2" v-model="ruleFrom.presentTreat" style="margin-left: 80px;">
            </el-input>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-col :span="5" class="but" style="text-align: center;margin-top: 4px;width: 80px;">
            <span>既往史</span>
          </el-col>
          <el-col :span="19">
            <el-input type="textarea" :rows="2" v-model="ruleFrom.history" style="margin-left: 80px;">
            </el-input>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-col :span="5" class="but" style="text-align: center;margin-top: 4px;width: 80px;">
            <span>过敏史</span>
          </el-col>
          <el-col :span="19">
            <el-input type="textarea" :rows="2" v-model="ruleFrom.allergy" style="margin-left: 80px;">
            </el-input>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-col :span="5" class="but" style="text-align: center;margin-top: 4px;width: 80px;">
            <span>体格检查</span>
          </el-col>
          <el-col :span="19">
            <el-input type="textarea" :rows="2" v-model="ruleFrom.physique" style="margin-left: 80px;">
            </el-input>
          </el-col>
        </el-row>

        <el-row class="but" style="width: 80px;margin-top: 30px;">
          <el-tag>评估/诊断:</el-tag>
        </el-row>

        <div class="kuai">
          <el-row>
            <el-card class="box-card">
              <div slot="header" class="clearfix" style="text-align: left;">
                <span class="zi">西医诊断</span>
                <el-button style="float: right; padding: 3px 0" type="text">增加</el-button>
                <el-button style="float: right; padding: 3px 0; color: darkgray;" type="text">删除</el-button>
              </div>
              <div>
                <el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="55">
                  </el-table-column>
                  <el-table-column label="ICD编码" width="200">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column prop="name" label="名称" width="200">
                  </el-table-column>
                  <el-table-column prop="address" label="发病时间" show-overflow-tooltip>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-row>
        </div>

        <div class="kuai">
          <el-row>
            <el-card class="box-card">
              <div slot="header" class="clearfix" style="text-align: left;">
                <span class="zi">中医诊断</span>
                <el-button style="float: right; padding: 3px 0" type="text">增加</el-button>
                <el-button style="float: right; padding: 3px 0; color: darkgray;" type="text">删除</el-button>
              </div>
              <div>
                <el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="55">
                  </el-table-column>
                  <el-table-column label="ICD编码" width="200">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column prop="name" label="名称" width="200">
                  </el-table-column>
                  <el-table-column prop="address" label="发病时间" show-overflow-tooltip>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-row>
        </div>

        <el-row style="margin-top: 20px;">
          <el-col :span="5" class="but" style="text-align: center;margin-top: 4px;width: 80px;">
            <span>检查建议</span>
          </el-col>
          <el-col :span="19">
            <el-input type="textarea" :rows="2" v-model="ruleFrom.proposal" style="margin-left: 80px;">
            </el-input>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-col :span="5" class="but" style="text-align: center;margin-top: 4px;width: 80px;">
            <span>注意事项</span>
          </el-col>
          <el-col :span="19">
            <el-input type="textarea" :rows="2" v-model="ruleFrom.careful" style="margin-left: 80px;">
            </el-input>
          </el-col>
        </el-row>

        <el-row style="text-align: left;">
          <el-button type="text" icon="el-icon-success" @click="saveCheck">
            <span>提交</span>
          </el-button>
        </el-row>
  </div>
</template>

<script>
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
        ruleFrom:{
          caseNumber:this.$props.patient.caseNumber,
          registID:this.$props.patient.id,
          readme:'',
          present:'',
          presentTreat:'',
          history:'',
          allergy:'',
          physique:'',
          proposal:'',
          careful:'',

        }
      }
    },
    props:['patient'],
    mounted() {


    },
    methods: {
      handleClick(tab, event) {
            console.log(tab, event);
          },
          getReg(obj){
            console.log(obj)
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
             if(this.$props.patient != null){
               this.ruleFrom.caseNumber = this.$props.patient.caseNumber
               this.ruleFrom.registID = this.$props.patient.id
               this.$axios.post("http://localhost:8081/sys/medicalRecord/save",this.ruleFrom)
               .then(res=>{
                 console.log(res.data)
                 if(res.data==null){
                   console.log("储存成功")
                 }else{
                   console.log("储存失败")
                 }
               })
             }else{
               this.$message("请先选择患者")
             }
          },
          cleanCheck(){

          },
          refMedicalRecord(){

          },


    }
  }
</script>

<style>
</style>
