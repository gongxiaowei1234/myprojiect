<template>
  <div>
    <el-table border :data="records">
      <el-table-column type="index" width="80" align="center"></el-table-column>
      <el-table-column
        label="名称"
        prop="skuName"
        width="width"
        align="center"
      ></el-table-column>
      <el-table-column
        label="描述"
        prop="skuDesc"
        width="width"
        align="center"
      ></el-table-column>
      <el-table-column
        label="默认图片"
        prop="skuDefaultImg"
        width="width"
        align="center"
      >
        <template slot-scope="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="重量(KG)"
        prop="weight
"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        label="价格(元)"
        prop="price"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" prop="prop" width="340" align="center">
        <template slot-scope="{ row }">
          <hint-button
            type="success"
            icon="el-icon-top"
            size="mini"
            title="上架"
            style="margin-right: 0px"
            @click="onSale(row)"
            v-if="row.isSale == 1"
          ></hint-button>
          <hint-button
            type="success"
            icon="el-icon-bottom"
            size="mini"
            title="下架"
            style="margin-right: 0px"
            v-else
            @click="cancelSale(row)"
          ></hint-button>

          <hint-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            title="编辑"
            style="margin-right: 0px"
            @click="edit"
          ></hint-button>
          <hint-button
            type="info"
            icon="el-icon-info"
            size="mini"
            title="查看详情"
            style="margin-right: 0px"
            @click="lookDetail(row)"
          ></hint-button>
          <hint-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            title="开发中"
            style="margin-right: 0px"
          ></hint-button> </template
      ></el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px; text-align: right"
      :current-page="page"
      :page-size="limit"
      :page-sizes="[3, 5, 8, 10]"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="getSkuList"
      @size-change="handleSizeChange"
    ></el-pagination>
    <!-- 分页
     <el-pagination
          style="margin-top: 20px; text-align: right"
          :current-page="page"
          :page-sizes="[3, 5, 8, 10]"
          :page-size="limit"
          :pager-count="7"
          @current-change="getSkuList"
          @size-change="handleSizeChange"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination> -->
  

    <el-drawer
      title="商品详情"
      :visible.sync="drawer"
      size="50%"
      style="font-size: 18px; text-align: left"
    >
      <el-row>
        <el-col :span="5" style="font-size: 18px; text-align: right"
          >名称</el-col
        >
        <el-col :span="16">{{ detailInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5" style="font-size: 18px; text-align: right"
          >描述</el-col
        >
        <el-col :span="16">{{ detailInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5" style="font-size: 18px; text-align: right"
          >价格</el-col
        >
        <el-col :span="16">{{ detailInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5" style="font-size: 18px; text-align: right"
          >平台属性</el-col
        >
        <el-col :span="16">
          <el-tag
            type="success"
            v-for="attr in detailInfo.skuAttrValueList"
            :key="attr.id"
            style="margin-right: 10px"
            >{{ attr.attrId }}-{{ attr.valueId }}</el-tag
          >
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="5" style="font-size: 18px; text-align: right"
          >商品图片1</el-col
        >
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item
                v-for="item in detailInfo.skuImageList"
                :key="item.id"
              >
                <img
                  :src="item.imgUrl"
                  alt=""
                  style="width: 200px; height: 200px"
                />
              </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="5" style="font-size: 18px; text-align: right"
          >商品图片</el-col
        >
        <el-col :span="16">
          <template>
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in detailInfo.skuImageList"
                :key="item.id"
              >
                <img
                  :src="item.imgUrl"
                  alt=""
                  style="width: 260px; height: 200px"
                />
              </el-carousel-item>
            </el-carousel>
          </template>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      // 当前第几页
      page: 1,
      // 当前页有几条数据
      limit: 5,
      // 存储SKU列表数据
      records: [],
      // 总数据条数
      total: 0,
      //   详情数据
      detailInfo: {},
      //   抽屉是否打开
      drawer: false,
    };
  },
  created() {},
  mounted() {
    this.getSkuList();
  },
  methods: {
    // 获取SKU列表数据
    async getSkuList(pages = 1) {
      this.page = pages;
      const { page, limit } = this;
      let res = await this.$API.sku.reqGetSkuList(page, limit);
      console.log(res);
      if (res.code == 200) {
        this.total = res.data.total;
        this.records = res.data.records;
      }
    },
    // 当分页器某一页需要展示的条数发送变化的时候会触发
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    // 上架
    async onSale(row) {
      let res = await this.$API.sku.reqOnSale(row.id);
      if (res.code == 200) {
        row.isSale = 0;
        this.$message({ type: "success", message: "上架成功" });
      }
    },
    // 下架
    async cancelSale(row) {
      let res = await this.$API.sku.reqCancelSale(row.id);
      if (res.code == 200) {
        row.isSale = 1;
        this.$message({ type: "success", message: "下架成功" });
      }
    },
    // 编辑
    edit() {
      this.$message("正在开发中");
    },
    // 查看详情
    async lookDetail(row) {
      this.drawer = true;
      let res = await this.$API.sku.reqDetail(row.id);
      console.log(res);
      if (res.code == 200) {
        this.detailInfo = res.data;
      }
    },
  },
};
</script>

<style scoped>
.el-row .el-col-5 {
  margin-right: 15px;
}
/* .col1{
    margin-right: 10px  !important; 
} */
.el-row {
  margin-top: 10px;
}

</style>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__button {
  width: 10px;
  height: 10px;
  background: red;
  /* 可以得到一个圆 */
  border-radius: 100%;
}

</style>