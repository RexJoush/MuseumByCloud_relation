<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2022-10-30 10:27:33
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>负载均衡器</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="5">
          <!-- 搜索区域 -->
          <el-select
            v-model="value"
            filterable
            clearable
            size="large"
            style="width: 100%"
            @change="selectChange"
            @clear="clearSelect"
            @focus="initNamespace"
            placeholder="请选择命名空间"
          >
            <el-option
              v-for="item in namespaces"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- 搜索按钮
            <el-button
              slot="append"
              size="large"
              icon="el-icon-plus"
              @click="getPods"
            ></el-button> -->
        </el-col>
      </el-row>

      <el-table :data="ingressesInCurrentPage" style="width: 100%" stripe>
        <!-- <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.status.conditions[1].status == 'True'? 'load-success': scope.row.status.conditions[1].status == 'Unknown'?'load-doubt':'load-failed'"/>
          </template>
        </el-table-column> -->
        <el-table-column prop="metadata.name" label="名称">
          <template slot-scope="scope">
            <router-link
              :to="'/ExploreBalancing/ingresses/' + scope.row.metadata.name"
              @click.native="
                goToIngressesDetails(
                  scope.row.metadata.name,
                  scope.row.metadata.namespace
                )
              "
              class="link-type"
            >
              <span style="color: #409eff; text-decoration: underline">{{
                scope.row.metadata.name
              }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="apiVersion" label="版本"> </el-table-column>
        <el-table-column prop="metadata.namespace" label="命名空间">
        </el-table-column>
        <!-- <el-table-column label="标签">
          <template slot-scope="scope">
            <span>k8s-app: {{scope.row.metadata.labels['k8s-app']}}</span>
            <br>
            <span>pod-template-hash: {{scope.row.metadata.labels['pod-template-hash']}}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="apiVersion" label="apiVersion"> </el-table-column> -->
        <!-- <el-table-column prop="kind" label="kind"> </el-table-column> -->
        <!-- <el-table-column prop="metadata.uid" label="uid"> </el-table-column> -->
        <!-- <el-table-column prop="spec.nodeName" width="140" label="所属节点"> </el-table-column>
        <el-table-column prop="status.podIP" width="140" label="主机ip地址"> </el-table-column> -->
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
              @click="
                showIngressEditDialog(
                  scope.row.metadata.name,
                  scope.row.metadata.namespace
                )
              "
              >编辑</el-button
            >
            <br />
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="
                delIngress(
                  scope.row.metadata.name,
                  scope.row.metadata.namespace
                )
              "
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout=" prev, pager, next, jumper, ->, total, slot"
        :total="ingressesAmount"
      >
      </el-pagination>
    </el-card>

    <!-- 编辑框 -->
    <el-dialog
      title="编辑 入口"
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
        <!-- <el-tab-pane label="JSON" name="second">
          <codemirror
            ref="cmYamlEditor"
            :value="codeJSON"
            :options="cmOptions"
            @ready="onJSONCmReady"
            @input="onJSONCmCodeChange"
          />
        </el-tab-pane> -->
      </el-tabs>

      <!-- <textarea style="width:100%" name="describe" id="ingress" cols="30" rows="10">
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
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/yaml/yaml.js";
// import theme style
import "codemirror/theme/panda-syntax.css";

export default {
  name: "Ingresses",

  data() {
    return {
      ingressesAmount: 0, //ingresses 总数
      currentPage: 1, //分页绑定当前页
      ingressesInCurrentPage: [], //页面中的 ingresses
      pageSize: 6, //一页显示数量
      ingresses: [], //ingress 列表
      namespaces: [], // 命名空间选择框
      value: "", // 选择框的值
      loading: true, // 获取数据中
      editDialogVisible: false, // 编辑详情框
      codeYaml: "", // 编辑框的 yaml 数据

      // cmOptions: {
      //   // json codemirror 配置项
      //   tabSize: 4,
      //   mode: {
      //     name: "javascript",
      //     json: true,
      //   },
      //   theme: "panda-syntax",
      //   lineNumbers: true,
      //   line: true,
      // },
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
    this.getIngresses();
  },

  methods: {
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

    // 获取所有 Ingresses
    getIngresses(namespace) {
      this.$store
        .dispatch("ingresses/getAllIngresses", namespace)
        .then((res) => {
          console.log(res.data);
          this.ingresses = res.data;
          this.ingressesAmount = this.ingresses.length;
          this.ingressesInCurrentPage = this.ingresses.slice(0, this.pageSize);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 详情页
    goToIngressesDetails: function (name, namespace) {
      let ingressDetails = {
        ingressName: name,
        ingressNamespace: namespace,
      };
      this.$store.dispatch("ingresses/toDetails", ingressDetails);
    },

    /* 编辑部分 */
    showIngressEditDialog(name, namespace) {
      let ingressDetails = {
        ingressName: name,
        ingressNamespace: namespace,
      };

      // 获取 yaml 格式
      this.$store
        .dispatch("ingresses/getIngressYamlByNameAndNamespace", ingressDetails)
        .then((res) => {
          // console.log(res);
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
            .dispatch("common/changeIngressesByYaml", this.codeYaml)
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

    /* 删除 ingress */
    delIngress: function (name, namespace) {
      this.$confirm("确认删除该负载均衡器？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let ingressDetails = {
            ingressName: name,
            ingressNamespace: namespace,
          };
          this.$store
            .dispatch("ingresses/delIngressByNameAndNamespace", ingressDetails)
            .then((res) => {
              if (res.code == 1200) {
                this.$message.success("删除成功");
                this.getIngresses();
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

    /* 按命名空间查询 */

    // 当选择框聚焦时获取命名空间
    initNamespace() {
      if (this.namespaces.length == 0) {
        this.namespaces = this.$store.state.namespaces.namespaces;
      }
    },
    // 选择框变化事件
    selectChange(value) {
      this.loading = true;
      this.getIngresses(value);
    },
    // 选择框清空事件
    clearSelect() {
      this.loading = true;
      this.getIngresses();
    },
    //分页事件
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.ingressesInCurrentPage = this.ingresses.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
};
</script>


<style lang="scss" scoped>
.el-table {
  margin: 15px 0px;
  border-top: 1px solid #ccc;
}

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
