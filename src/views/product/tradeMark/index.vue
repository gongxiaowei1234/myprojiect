<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showAddDialog"
      >添加</el-button
    >
    <!-- 
      表格组件 
      data:表格组件将来需要展示的数据----数组类型
      border: 是给表格添加边框
      column属性
      label:显示标题
      width:对应列的宽度
      align:标题对齐的方式
      prop:对应列内容的字段名
      注意1：elmentUI当中的table组件，展示的数据是以一列一列进行展示数据
    -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column type="index" label="序号" width="150" align="center">
      </el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="300"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="logoUrl"
        label="品牌LOGO"
        width="300"
        align="center"
      >
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="400" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            size="small"
            icon="el-icon-edit"
            @click="showEidtTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 
      分页器 
      当前第几页、数据总条数、每一页展示条数、连续页码数
      @current-change="" currentPage 改变时会触发	当前页
      @size-change="" pageSize 改变时会触发	每页条数
      current-page:代表的是当前第几页
      total:代表分页器一共需要战术数据条数
      page-size:代表的是每一页需要展示多少条数据
      page-sizes:代表可以设置每一页展示多少条数据
      pager-count:按钮的数据 如果9 连续页码是7,如果是7 连续页码是5
      layout:可以实现分页器布局   
      ->位于最右边,跳转里面的sizes,tatal位置可以实现页面的改变
    -->
    <el-pagination
      style="margin-top: 20px; text-align: right"
      :current-page="1"
      :page-sizes="[3, 5, 8, 10]"
      :pager-count="7"
      :page-size="limit"
      @current-change="getPageList"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 
      对话框 
      :visible.sync:控制对话框显示与隐藏用的
    -->
    <div>
      <!-- 添加对话框 -->
      <el-dialog
        :title="tmForm.id ? '修改品牌' : '添加品牌'"
        :visible.sync="DialogVisible"
      >
        <el-form :model="tmForm" :rules="rules" ref="tmForm">
          <el-form-item label="品牌名称" prop="tmName" label-width="100px">
            <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
          </el-form-item>
          <el-form-item label="品牌LOGO" prop="logoUrl" label-width="100px">
            <!--:on-success="handleAvatarSuccess" 图片上传成功的回调
              :before-upload="beforeAvatarUpload" 图片上传之前的回调
              action:是图片上传的地址
              :show-file-list是否显示文件列表或者照片
          -->
            <el-upload
              class="avatar-uploader"
              action="/dev-api//admin/product/fileUpload"
              :show-file-list="true"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="DialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addOrEditTradeMark"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      // 代表的分页器第几页 数据类型number
      page: 1,
      // 当前页数展示数据条数
      limit: 3,
      // 总共数据条数
      total: 0,
      // 列表展示数据
      list: [],
      //   添加对话框显示域隐藏
      DialogVisible: false,
      //   收集品牌信息数据
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      //  上传图片使用的属性
      imageUrl: "",
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [{ required: true, message: "请选择品牌的图片" }],
      },
    };
  },
  // 组件挂载完毕
  mounted() {
    // console.log(this.$API);
    // 获取品牌列表数据的方法
    this.getPageList();
  },
  created() {},
  methods: {
    // 获取品牌列表的数据
    async getPageList(pager = 1) {
      this.page = pager;
      // 解构出传的参数
      const { page, limit } = this;
      // 获取品牌列表的接口，需要带参数,所以我们在data中初始化两个字段,代表给服务器传递参数
      let res = await this.$API.trademark.reqTradeMarkList(page, limit);
      // console.log(res);
      if (res.code == 200) {
        this.total = res.data.total;
        this.list = res.data.records;
      }
    },
    // 处理当前页码改变
    // handleCurrentChange(pager) {
    //   // console.log(pager);
    //   this.page = pager;
    //   this.getPageList();
    // },
    // 当分页器某一页需要展示的条数发送变化的时候会触发
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    // 点击添加按钮
    showAddDialog() {
      this.DialogVisible = true;
      //   清除数据
      this.tmForm = { tmName: "", logoUrl: "" };
    },
    // 点击添加对话框确定按钮
    addOrEditTradeMark() {
      //$refs获取真实DOM节点,
      // this.$refs[formName].validate不能加【】
      this.$refs["tmForm"].validate;
      this.$refs.tmForm.validate(async (valid) => {
        if (valid) {
          this.DialogVisible = false;
          // 发送请求（修改品牌/添加品牌）
          let res = await this.$API.trademark.reqAddOrEditTradeMark(
            this.tmForm
          );
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
            });
            // 如果是添加品牌，停留在第一页，修改品牌停留在当前页
            this.getPageList(this.tmForm.id ? this.page : 1);
          }
        } else {
          console.log("验证不通过");
          return false;
        }
      });
    },
    // 点击编辑按钮
    showEidtTradeMark(row) {
      this.DialogVisible = true;
      // console.log(row);
      //将已有的品牌信息赋值给tmForm进行展示
      // 我们要做的是把数组中我们选中修改的对象浅拷贝赋值给tmForm,
      // 说白了就是把该对象拷贝了一份进行操作,
      // 不要直接操作这个数据,因为这个数据是在表格当中进行展示的
      this.tmForm = { ...row };
    },

    // 图片上传成功回调
    handleAvatarSuccess(res, file) {
      // console.log(res);上传成功服务器返回前端的图片地址
      // console.log(file);上传成功服务器返回前端的图片相关数据
      // 收集品牌图片数据，将来要带给服务器
      this.tmForm.logoUrl = res.data;
    },
    //   图片上传前回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 删除品牌
    deleteTradeMark(row) {
      console.log(row);
      this.$confirm(`此操作将永久删除${row.tmName}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 当用户点击取消按钮的时候触发
          let res = await this.$API.trademark.reqDeleteTradeMark(row.id);
          // console.log(res);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
          // 再次获取品牌列表数据
          this.getPageList(this.list.length > 1 ? this.page : this.page - 1);
        })
        .catch(() => {
          // 当用户点击取消按钮的时候触发
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style  >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>