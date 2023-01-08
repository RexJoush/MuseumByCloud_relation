<!--
 * @Descripttion: 自定义资源页面
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2022-10-30 10:05:18
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所有 CRD</span>
      </div>

      <el-table :data="customResourceDefinition" style="width: 100%" stripe v-loading="loading" element-loading-text="获取数据中...">
        <!--<el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.status.conditions[1].status == 'True'? 'load-success': scope.row.status.conditions[1].status == 'Unknown'?'load-doubt':'load-failed'"/>
          </template>
        </el-table-column> -->
        <el-table-column prop="metadata.name" label="名字">
          <template slot-scope="scope">
            <router-link
              :to="'/customize/' + scope.row.metadata.name"
              @click.native="
                goToCustomResourceDefinitionDetails(scope.row.metadata.name)
              "
              class="link-type"
            >
              <span style="color: #409eff; text-decoration: underline">{{
                scope.row.metadata.name
              }}</span>
            </router-link>
          </template>
          <!-- <template slot-scope="scope">
             <router-link
              :to="'/customize/' + scope.row.node.metadata.name"
              @click.native="goToNodeDetails(scope.row.node.metadata.name)"
              class="link-type"
            >
              <span style="color: #409eff; text-decoration: underline">{{
                scope.row.metadata.name
              }}</span>
            </router-link>
          </template> -->
        </el-table-column>
        <!-- <el-table-column prop="apiVersion" label="版本"> </el-table-column> -->
        <el-table-column prop="spec.group" label="API组"> </el-table-column>
        <!-- <el-table-column label="标签">
          <template slot-scope="scope">
            <span>k8s-app: {{scope.row.metadata.labels['k8s-app']}}</span>
            <br>
            <span>pod-template-hash: {{scope.row.metadata.labels['service-template-hash']}}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="apiVersion" label="apiVersion"> </el-table-column> -->
        <!-- <el-table-column prop="kind" label="kind"> </el-table-column> -->
        <!-- <el-table-column prop="metadata.uid" label="uid"> </el-table-column> -->
        <!-- <el-table-column prop="spec.nodeName" width="140" label="所属节点"> </el-table-column>
        <el-table-column prop="status.podIP" width="140" label="主机ip地址"> </el-table-column> -->
        <el-table-column prop="spec.scope" label="范围"> </el-table-column>
        <el-table-column label="创建时间" width="200">
          <template slot-scope="scope">
            <span>{{
              scope.row.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              style="margin-bottom: 5px"
              size="small"
              @click="showCrdEditDialog(scope.row.metadata.name)"
              >编辑</el-button
            >
            <br />
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delCrd(scope.row.metadata.name)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-size="6"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>


    <!-- 编辑框 -->
    <el-dialog
      title="编辑 CRD"
      :visible.sync="editDialogVisible"
      width="70%"
      @closed="handleClose"
      @close="editDialogVisible = false"
      :append-to-body="true"
      :lock-scroll="true"
    >
      <el-tabs value="first" type="card">
        <el-tab-pane label="YAML" name="first">
          <codemirror
            :value="codeYaml"
            :options="cmOptionsYaml"
            @ready="onYamlCmReady"
            @input="onYamlCmCodeChange"
          />
        </el-tab-pane>
        <el-tab-pane label="JSON" name="second">
          <codemirror
            ref="cmYamlEditor"
            :value="codeJSON"
            :options="cmOptions"
            @ready="onJSONCmReady"
            @input="onJSONCmCodeChange"
          />
        </el-tab-pane>
      </el-tabs>

      <!-- <textarea style="width:100%" name="describe" id="pod" cols="30" rows="10">
        {{code}}
      </textarea> -->
      <span slot="footer" class="dialog-footer">
        <div class="foot-info">
          <i class="el-icon-warning"></i> 此操作相当于 kubectl apply -f
          &ltspec.yaml>
        </div>
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitYamlChange">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import language js
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/yaml/yaml.js";
// import theme style
import "codemirror/theme/panda-syntax.css";

export default {
  name: "customResourceDefinition",

  data() {
    return {
      customResourceDefinition: [],
      total: 0, // 总 pod 数
      currentCrd: [], // 当前页面的事件


      objects: [],
      value: "", // 选择框的值
      loading: true, // 获取数据中
      editDialogVisible: false, // 编辑详情框
      addDialogVisible: false, // 添加框详情
      codeJSON: "", // 编辑框的 json 数据
      codeYaml: "", // 编辑框的 yaml 数据
      addYaml: "", // 添加框的 yaml 数据

      cmOptions: {
        // json codemirror 配置项
        tabSize: 4,
        mode: {
          name: "javascript",
          json: true,
        },
        theme: "panda-syntax",
        lineNumbers: true,
        line: true,
      },
      cmOptionsYaml: {
        // yaml codemirror 配置项
        tabSize: 4,
        mode: "yaml",
        theme: "panda-syntax",
        lineNumbers: true,
        line: true,
      },
    };
  },

  created() {
    this.getCustomResourceDefinition();
    this.goToCustomResourceDefinitionDetails();
  },

  methods: {

    // 处理分页
    handleCurrentChange(page) {
      this.currentCrd = this.customResourceDefinition.slice((page - 1) * 6, page * 6);
    },
    // 编辑器方法
    /* yaml */
    onYamlCmReady(cm) {
      setTimeout(() => {
        cm.refresh();
      }, 50);
    },

    onYamlCmCodeChange(newCode) {
      this.codeYaml = newCode;
    },
    // 添加的 yaml 框
    onAddYamlCmReady(cm) {
      setTimeout(() => {
        cm.refresh();
      }, 50);
    },

    onAddYamlCmCodeChange(newCode) {
      this.addYaml = newCode;
    },

    /* JSON */
    onJSONCmReady(cm) {
      setTimeout(() => {
        cm.refresh();
      }, 50);
    },

    onJSONCmCodeChange(newCode) {
      //console.log("this is new code", newCode);
      this.codeJSON = newCode;
    },
    /* 编辑部分 */
    showCrdEditDialog(name) {
      // 获取 yaml 格式
      this.$store
        .dispatch("customize/getCrdYamlByName", name)
        .then((res) => {
          console.log(res);
          // let json = JSON.stringify(res.data);
          // this.codeJSON = this.beautify(json, {
          //   indent_size: 4,
          //   space_in_empty_paren: true,
          // });
          this.codeYaml = res.data;
          this.editDialogVisible = true; // 打开编辑对话框
        })
        .catch((error) => {
          throw error;
        });

      // json 格式
      this.$store
        .dispatch("customize/getCustomResourceDefinitionByName", name)
        .then((res) => {
          // console.log(res);
          let json = JSON.stringify(res.data.pod);
          this.codeJSON = this.beautify(json, {
            indent_size: 4,
            space_in_empty_paren: true,
          });
        })
        .catch((error) => {
          throw error;
        });

      //this.editForm = res; // 查询结果写入表单
    },

    // 提交修改
    commitYamlChange() {
      this.$confirm("确认修改？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.$store
            .dispatch("common/changeCrdByYaml", this.codeYaml)
            .then((res) => {
              switch (res.code) {
                case 1200:
                  this.$message.success("修改成功");
                  break;
                case 1201:
                  this.$message.error("修改失败，请查看 yaml 文件格式");
                  break;
                case 1202:
                  this.$message.error("创建失败，请查看云平台相关错误信息");
                  break;
                default:
                  this.$message.info("提交成功");
                  break;
              }
              this.editDialogVisible = false;
            })
            .catch((error) => {
              throw error;
            });
        })
        .catch(() => {
          console.log("cancel");
        });
    },

    // 关闭添加或者修改框
    handleClose: function () {
      this.addYaml = "";
      setTimeout(() => {
        this.codemorror.refresh();
      }, 1);
    },

    /* 删除 Pod */
    delCrd: function (name) {
      this.$confirm("确认删除 CRD？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("customize/delCrd", name)
            .then((res) => {
              if (res.code == 1200) {
                this.$message.success("删除成功");
                this.getCustomResourceDefinition();
              } else {
                this.$message.error("删除失败");
              }
            })
            .catch((error) => {
              throw error;
            });
        })
        .catch(() => {});
    },

    // 获取所有 CRD
    getCustomResourceDefinition() {
      this.$store
        .dispatch("customize/getCustomResourceDefinition")
        .then((res) => {
          console.log(res.data);
          this.customResourceDefinition = res.data;
          this.total = res.data.length;
          this.currentCrd = res.data.slice(0, 6);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // CRD详情页
    goToCustomResourceDefinitionDetails: function (
      customResourceDefinitionName
    ) {
      this.$store.dispatch("customize/toDetails", customResourceDefinitionName);
    },
  },
};
</script>

<style lang="scss" scoped>
// 底部命令提示信息
.foot-info {
  position: absolute;
  margin-bottom: 5px;
  padding: 5px 5px;
  background-color: #ccc;
  left: 0%;
  color: #606266;
  font-size: 15px;
}
</style>
