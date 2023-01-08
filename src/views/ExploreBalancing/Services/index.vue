<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2022-10-30 10:03:39

 -->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所有服务</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
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
              @click="getservices"
            ></el-button> -->
        </el-col>
      </el-row>
      <el-table :data="servicesInCurrentPage" style="width: 100%" stripe>
        <!-- <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon
              :icon-class="
                scope.row.phase == 'Running' || scope.row.phase == 'Succeeded'
                  ? 'load-success'
                  : 'load-failed'
              "
            />
          </template>
        </el-table-column> -->
        <!-- 修改前 -->
        <!-- <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon
              :icon-class="
                scope.row.status.conditions[0].status == 'True'
                  ? 'load-success'
                  : scope.row.status.conditions[0].status == 'Unknown'
                  ? 'load-doubt'
                  : 'load-failed'
              "
            />
          </template>
        </el-table-column> -->

        <el-table-column prop="metadata.name" label="名称">
          <template slot-scope="scope">
            <router-link
              :to="'/ExploreBalancing/services/' + scope.row.metadata.name"
              @click.native="
                goToServicesDetails(
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
        <!-- <el-table-column prop="apiVersion" label="版本"> </el-table-column> -->
        <el-table-column prop="metadata.namespace" label="命名空间">
        </el-table-column>
        <el-table-column prop="spec.type" label="类型"> </el-table-column>
        <!-- <el-table-column label="标签">
          <template slot-scope="scope">
            <span>k8s-app: {{scope.row.metadata.labels['k8s-app']}}</span>
            <br>
            <spanservice-template-hash: {{scope.row.metadata.labels['service-template-hash']}}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="apiVersion" label="apiVersion"> </el-table-column> -->
        <!-- <el-table-column prop="kind" label="kind"> </el-table-column> -->
        <!-- <el-table-column prop="metadata.uid" label="uid"> </el-table-column> -->
        <!-- <el-table-column prop="spec.nodeName" width="140" label="所属节点"> </el-table-column>--->
        <el-table-column prop="spec.clusterIP" width="300" label="服务ip地址">
        </el-table-column>
        <el-table-column label="创建时间" width="300">
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
                showServiceEditDialog(
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
                delService(
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
        :total="servicesAmount"
      >
      </el-pagination>
    </el-card>

    <!-- 编辑框 -->
    <el-dialog
      title="编辑 service"
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
      </el-tabs>

      <!-- <textarea style="width:100%" name="describe" id="service" cols="30" rows="10">
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
import services from "@/store/modules/ExploreBalancing/services";

export default {
  name: "Services",

  data() {
    return {
      servicesAmount: 0, //Services 总数
      currentPage: 1, //分页绑定当前页
      servicesInCurrentPage: [], //页面中的 Serivces
      pageSize: 6, //一页显示数量
      services: [], //service 列表
      namespaces: [], // 命名空间选择框
      value: "", // 选择框的值
      loading: true, // 获取数据中
      editDialogVisible: false, // 编辑详情框
      codeYaml: "", // 编辑框的 yaml 数据

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
    this.getServices();
  },

  mounted() {
    this.getServices();
  },

  methods: {
    /* 按命名空间查询 */
    // 当选择框聚焦时获取命名空间
    initNamespace() {
      if (this.namespaces.length == 0) {
        this.namespaces = this.$store.state.namespaces.namespaces;
      }
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

    // 获取所有 Services
    getServices(namespace = "") {
      this.$store
        .dispatch("services/getAllServices", namespace)
        .then((res) => {
          console.log(res.data);
          this.services = res.data;
          this.servicesAmount = this.services.length;
          this.servicesInCurrentPage = this.services.slice(0, this.pageSize);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 前往 Service 详情页
    goToServicesDetails: function (name, namespace) {
      let serviceDetails = {
        serviceName: name,
        serviceNamespace: namespace,
      };
      this.$store.dispatch("services/toDetails", serviceDetails);
    },

    /* 编辑部分 */
    showServiceEditDialog(name, namespace) {
      let serviceDetails = {
        serviceName: name,
        serviceNamespace: namespace,
      };

      // 获取 yaml 格式
      this.$store
        .dispatch("services/getServiceYamlByNameAndNamespace", serviceDetails)
        .then((res) => {
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
            .dispatch("common/changeServicesByYaml", this.codeYaml)
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

    /* 删除 Service */
    delService: function (name, namespace) {
      this.$confirm("确认删除该 服务 ?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let serviceDetails = {
            serviceName: name,
            serviceNamespace: namespace,
          };
          this.$store
            .dispatch("services/delServiceByNameAndNamespace", serviceDetails)
            .then((res) => {
              if (res.code == 1200) {
                this.$message.success("删除成功")
                this.getServices()
              } else {
                this.$message.error("删除失败")
              }
            })
            .catch((error) => {
              throw error
            });
        })
        .catch(() => {})
    },

    // 选择框变化事件
    selectChange(value) {
      this.loading = true;
      this.getServices(value)
    },
    // 选择框清空事件
    clearSelect() {
      this.loading = true
      this.getServices()
    },

    //分页事件
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.servicesInCurrentPage = this.services.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      )
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

