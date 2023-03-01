<template>
  <div>
    <el-card
      ><CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></CategorySelect
    ></el-card>
    <el-card style="margin: 20px 0px">
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addSpu"
          :disabled="!category3Id"
          >添加SPU</el-button
        >
        <!-- table -->
        <el-table border :data="records" style="margin: 20px 0px">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="spuName"
            label="SPU名称"
            width="width"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="description"
            label="SPU描述"
            width="width"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <!-- 这里按钮将来用hintButton替换 -->
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加SPU"
                @click="addSKu(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改SPU"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="lookSkuList(row)"
              ></hint-button>
              <hint-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除spu"
                @click="deleteSku(row)"
              ></hint-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          style="margin-top: 20px; text-align: right"
          :current-page="page"
          :page-sizes="[3, 5, 8, 10]"
          :pager-count="7"
          :page-size="limit"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>

      <!-- 给父组件绑定自定义事件 -->
      <spuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></spuForm>
      <skuForm v-show="scene == 2" ref="sku" @changeScenes="changeScenes"></skuForm>
    </el-card>
    <!-- before-close	关闭前的回调，会暂停 Dialog 的关闭 -->
    <el-dialog :title="`${spu.spuName}的SPU列表`" 
    :visible.sync="dialogTableVisible"
    :before-close="dialogClose">
      <el-table :data="skuList" border v-loading="loading">
    <el-table-column property="createTime" label="创建时间" width="160" align="center"></el-table-column>
    <el-table-column property="skuName" label="名称" width="200" align="center"></el-table-column>
    <el-table-column property="price" label="价格" width="100" align="center"></el-table-column>
    <el-table-column property="weight" label="重量" width="100" align="center"></el-table-column>
    <el-table-column property="skuDefaultImg" label="默认图片">
      <template slot-scope="{ row, $index }">
        <img :src="row.skuDefaultImg" alt=""  style="width:100px ;height:100px;"></img>
      </template>
    </el-table-column>  
  </el-table>

</el-dialog>
  </div>
</template>

<script>
import skuForm from "./skuForm";
import spuForm from "./spuForm";
export default {
  name: "",
  components: { skuForm, spuForm },
  data() {
    return {
      // 分类ID
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //   控制三级联动的可操作性
      show: true,
      // 代表的分页器第几页 数据类型number
      page: 1,
      // 当前页数展示数据条数
      limit: 3,
      // 总共数据条数
      total: 0,
      // SPU列表数据
      records: [],
      // 0 SPU列表   1 添加SPU|修改SPU  2 添加SKU
      scene: 0,
      // 对话框显示与隐藏
      dialogTableVisible: false,
      // 获取SKU列表
      skuList: [],
      spu: {},
      loading: true,
    };
  },
  created() {
    // this.getSpuList();
  },
  methods: {
    // 自定义事件，获取三级联动数据
    getCategoryId({ categoryId, level }) {
      // console.log(categoryId);
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    // 获取SPU列表数据方法
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      const res = await this.$API.spu.reqGetSpuList(page, limit, category3Id);
      console.log("reqGetSpuList",res);
      if (res.code == 200) {
        this.total = res.data.total;
        this.records = res.data.records;
      }
    },
    // 当分页器某一页需要展示的条数发送变化的时候会触发
    handleSizeChange(limit) {
      this.limit = limit;
      
      this.getSpuList();
    },
    // // 点击第几页按钮回调
    // handleCurrentChange(page) {
    //   this.page = page;
    //   this.getSpuList();
    // },
    // 添加SPU按钮的回调
    addSpu(row) {
      this.scene = 1;
      this.$refs.spu.addSpuData(this.category3Id);
    },
    addSKu(row) {
      this.scene = 2;
      // console.log("row",row);
      // 父组件调用子组件方法，并传数据给子组件
      this.$refs.sku.addSkuData(this.category1Id, this.category2Id, row);
    },
    // 修改某一个SPU
    updateSpu(row) {
      this.scene = 1;
      // 获取子组件SpuFrom的子组件
      // console.log(this.$refs.spu);
      this.$refs.spu.initSpuData(row);
    },
    // 自定义事件的回调
    changeScene({ scene, flag }) {
      // console.log(scene);
      this.scene = scene;
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    // skuForm 通知父组件修改场景
    changeScenes(scene) {
      this.scene = scene;
    },
    async deleteSku(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          let res = await this.$API.spu.reqDeleteSpu(row.id);
          if (res.code == 200) {
            this.$message({ type: "success", message: "删除成功" });
            // 判断当前页的有几条数据，如果只有一条删除完需回到上一页
            this.getSpuList(
              this.records.length > 1 ? this.page : this.page - 1
            );
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 查看当前spu全部sku列表
    async lookSkuList(spu) {
      this.dialogTableVisible = true;
      this.loading = true;
      //保存spu信息
      this.spu = spu;
      //获取sku列表的数据进行展示
      let result = await this.$API.spu.reqGetSkuList(spu.id);
      console.log(result);
      if (result.code == 200) {
        this.skuList = result.data;
        //loading隐藏
        this.loading = false;
      }
    },
    // 暂停关闭对话框回调
    dialogClose(done) {
      this.loading = true;
      this.skuList = [];
      // 管理对话框，function(done)，done 用于关闭 Dialog
      done();
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>