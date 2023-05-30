<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出
        </el-button>
      </el-col>
      <!--      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
    </el-row>

    <el-table v-loading="loading" :data="labList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <!--      <el-table-column label="${comment}" align="center" prop="id"/>-->
      <el-table-column label="模板id" align="center" prop="id"/>
      <!--      <el-table-column label="${comment}" align="center" prop="gmtCreate" width="180">-->
      <!--        <template slot-scope="scope">-->
      <!--          <span>{{ parseTime(scope.row.gmtCreate, '{y}-{m}-{d}') }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column label="${comment}" align="center" prop="gmtModified" width="180">-->
      <!--        <template slot-scope="scope">-->
      <!--          <span>{{ parseTime(scope.row.gmtModified, '{y}-{m}-{d}') }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="课程id" align="center" prop="chapterId"/>
      <el-table-column label="课件地址" align="center" prop="coursewarePath"/>
      <el-table-column label="环境id" align="center" prop="labEnvId"/>
      <!--      <el-table-column label="环境地址" align="center" prop="labEnvPath"/>-->
      <el-table-column label="环境类型" align="center" prop="envType"/>
      <!--      <el-table-column label="${comment}" align="center" prop="isDeleted"/>-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改lab对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="课程id" prop="chapterId">
          <el-input v-model="form.chapterId" placeholder="请输入课程id"/>
        </el-form-item>
        <el-form-item label="课件地址" prop="coursewarePath">
          <el-input v-model="form.coursewarePath" placeholder="请输入课件地址"/>
        </el-form-item>
        <el-form-item label="环境id" prop="labEnvId">
          <el-input v-model="form.labEnvId" placeholder="请输入环境id"/>
        </el-form-item>
        <el-form-item label="环境地址" prop="labEnvPath">
          <el-input v-model="form.labEnvPath" placeholder="请输入环境地址"/>
        </el-form-item>
        <el-form-item label="环境类型" prop="envType">
          <el-input v-model="form.envType" placeholder="请输入环境类型（terminal / desktop / editor / juypter）"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getLab, delLab, addLab, updateLab} from "@/js/api";
import {parseTime, resetForm} from "@/js/utils";

export default {
  name: "Lab",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // lab表格数据
      labList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        labId: null,
        gmtCreate: null,
        gmtModified: null,
        chapterId: null,
        coursewarePath: null,
        labEnvId: null,
        labEnvPath: null,
        envType: null,
        isDeleted: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        chapterId: [
          {required: true, message: "不能为空", trigger: "blur"}
        ],
        coursewarePath: [
          {required: true, message: "不能为空", trigger: "blur"}
        ],
        labEnvPath: [
          {required: true, message: "不能为空", trigger: "blur"}
        ],
        envType: [
          {required: true, message: "不能为空", trigger: "blur"}
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    parseTime,
    /** 查询lab列表 */
    getList() {
      this.loading = true;
      this.$api.iLab.listLab(this.queryParams).then(response => {
        this.labList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        labId: null,
        gmtCreate: null,
        gmtModified: null,
        chapterId: null,
        coursewarePath: null,
        labEnvId: null,
        labEnvPath: null,
        envType: null,
        isDeleted: null
      };
      // resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      // resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加lab";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      this.$api.iLab.getLab(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改lab";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            console.log("this.form", this.form)
            this.$api.iLab.updateLab(this.form).then(response => {
              this.$message.success("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            this.$api.iLab.addLab(this.form).then(response => {
              this.$message.success("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;

      this.$confirm('是否确认删除lab编号为"' + ids + '"的数据项？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(ids)
        this.$api.iLab.delLab(ids).then(response => {
          this.getList();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('lab/lab/export', {
        ...this.queryParams
      }, `lab_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
