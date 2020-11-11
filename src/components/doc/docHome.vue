<template>
  <el-container>
    <el-aside
    width="300px"
    v-if="showMenu"
    >
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <el-tag>
            患者选择：双花括号
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
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="日期"
                  width="90">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址">
                </el-table-column>
              </el-table>
              <el-divider></el-divider>
              <el-tag  style="width: 250px;">
                已诊患者:
              </el-tag>
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="日期"
                  width="90">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址">
                </el-table-column>
              </el-table>
              <el-divider></el-divider>
            </el-tab-pane>
            <el-tab-pane label="科室" name="second">
              <el-tag style="width: 250px;">
                未诊患者:
              </el-tag>
                <el-table
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="日期"
                    width="90">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址">
                  </el-table-column>
                </el-table>
              <el-divider></el-divider>
              <el-tag  style="width: 250px;">
                已诊患者:
              </el-tag>
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="日期"
                  width="90">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址">
                </el-table-column>
              </el-table>
              <el-divider></el-divider>
            </el-tab-pane>

          </el-tabs>

      </el-card>

    </el-aside>

    <el-main id="mianBlock">
      <el-button @click="showAside" type="primary" size="mini">
        {{showButtonText}}
      </el-button>
      <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="病历首页" name="first">
            <el-row style="background-color: #EAF1F5;margin-top: -20px">
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
              <el-tag>病史内容:</el-tag>
            </el-row>

            <el-row style="margin-top: 20px;">
              <el-col :span="4" class="but" style="text-align: center;margin-top: 4px;width: 80px;">
                <span>主诉</span>
              </el-col>
              <el-col :span="19">
                <el-input type="textarea" :rows="1" v-model="textarea" style="margin-left: 80px;">
                </el-input>
              </el-col>
            </el-row>

            <el-row style="margin-top: 20px;">
              <el-col :span="5" class="but" style="text-align: center;margin-top: 4px;width: 80px;">
                <span>现病史</span>
              </el-col>
              <el-col :span="19">
                <el-input type="textarea" :rows="2" v-model="textarea" style="margin-left: 80px;">
                </el-input>
              </el-col>
            </el-row>

            <el-row style="margin-top: 20px;">
              <el-col :span="5" class="but" style="text-align: center;margin-top: 4px;width: 80px;">
                <span>现病治疗情况</span>
              </el-col>
              <el-col :span="19">
                <el-input type="textarea" :rows="2" v-model="textarea" style="margin-left: 80px;">
                </el-input>
              </el-col>
            </el-row>

            <el-row style="margin-top: 20px;">
              <el-col :span="5" class="but" style="text-align: center;margin-top: 4px;width: 80px;">
                <span>既往史</span>
              </el-col>
              <el-col :span="19">
                <el-input type="textarea" :rows="2" v-model="textarea" style="margin-left: 80px;">
                </el-input>
              </el-col>
            </el-row>

            <el-row style="margin-top: 20px;">
              <el-col :span="5" class="but" style="text-align: center;margin-top: 4px;width: 80px;">
                <span>过敏史</span>
              </el-col>
              <el-col :span="19">
                <el-input type="textarea" :rows="2" v-model="textarea" style="margin-left: 80px;">
                </el-input>
              </el-col>
            </el-row>

            <el-row style="margin-top: 20px;">
              <el-col :span="5" class="but" style="text-align: center;margin-top: 4px;width: 80px;">
                <span>体格检查</span>
              </el-col>
              <el-col :span="19">
                <el-input type="textarea" :rows="2" v-model="textarea" style="margin-left: 80px;">
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
                <el-input type="textarea" :rows="2" v-model="textarea" style="margin-left: 80px;">
                </el-input>
              </el-col>
            </el-row>

            <el-row style="margin-top: 20px;">
              <el-col :span="5" class="but" style="text-align: center;margin-top: 4px;width: 80px;">
                <span>注意事项</span>
              </el-col>
              <el-col :span="19">
                <el-input type="textarea" :rows="2" v-model="textarea" style="margin-left: 80px;">
                </el-input>
              </el-col>
            </el-row>

            <el-row style="text-align: left;">
              <el-button type="text" icon="el-icon-success">
                <span>提交</span>
              </el-button>
            </el-row>

          </el-tab-pane>
          <el-tab-pane label="检查申请" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="检验申请" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="门诊确诊" name="fourth">定时任务补偿</el-tab-pane>
          <el-tab-pane label="处置申请" name="fourth">定时任务补偿</el-tab-pane>
          <el-tab-pane label="成药处方" name="fourth">定时任务补偿</el-tab-pane>
          <el-tab-pane label="草药处方" name="fourth">定时任务补偿</el-tab-pane>
          <el-tab-pane label="费用查询" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
  export default{
    data() {
      return {
        activeName: 'second',
        showButtonText:'隐藏侧边栏',
        showMenu:true,
        selPatient:'first'
      }
    },
    methods: {
      handleClick(tab, event) {
              console.log(tab, event);
      },
      showAside(){
        this.showMenu = !this.showMenu;
              if (this.showMenu) {
                this.showButtonText = "隐藏侧边栏";
              } else {
                this.showButtonText = "显示侧边栏";
              }
      }

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
