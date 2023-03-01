<template>
  <div>
    <el-card>
      <!-- :model="" -->
      <el-form label-width="80px">
        <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>
        <el-form-item label="SKU名称">
          <!-- v-model="spu.spuName" -->
          <el-input
            placeholder="请输入SKU名称"
            v-model="skuInfo.skuName"
          ></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
          <el-input
            placeholder="请输入价格(元)"
            type="number"
            v-model="skuInfo.price"
          ></el-input>
        </el-form-item>
        <el-form-item label="重量(千克)">
          <el-input
            placeholder="请输入重量(千克)"
            v-model="skuInfo.weight"
          ></el-input>
        </el-form-item>
        <el-form-item label="规格描述">
          <el-input
            placeholder="请输入规格描述"
            type="textarea"
            rows="4"
            v-model="skuInfo.skuDesc"
          ></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
          <el-form :inline="true" label-width="80Px">
            <el-form-item
              :label="attr.attrName"
              v-for="attr in attrInfoList"
              :key="attr.id"
            >
              <!-- v-model="attr.attrIdAndValueId" 自定义属性一个attrIdAndValueId -->
              <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
                <!-- :value="`${attr.id}:${attrValue.id}`" 收集带给服务器的数据 -->
                <el-option
                  :label="attrValue.valueName"
                  :value="`${attr.id}:${attrValue.id}`"
                  v-for="attrValue in attr.attrValueList"
                  :key="attrValue.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
          <el-form :inline="true" label-width="80Px">
            <el-form-item
              :label="saleAttr.saleAttrName"
              v-for="saleAttr in spuSaleAttrList"
              :key="saleAttr.id"
            >
              <el-select
                placeholder="请输入"
                v-model="saleAttr.attrIdAndValueId"
              >
                <el-option
                  :label="saleAttrValue.saleAttrValueName"
                  :value="`${saleAttr.id}:${saleAttrValue.id}`"
                  v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
                  :key="saleAttrValue.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item label="图片列表">
          <!-- :data="" -->
          <el-table
            border
            :data="spuImageList"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              label="label"
              type="selection"
              width="80"
            ></el-table-column>
            <el-table-column label="图片">
              <template slot-scope="{ row, $index }">
                <img
                  :src="row.imgUrl"
                  alt=""
                  style="width: 100px; height: 100px"
                />
              </template>
            </el-table-column>
            <el-table-column label="名称" prop="imgName"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{ row, $index }">
                <el-button
                  type="primary"
                  v-if="row.isDefault == 0"
                  @click="changeDefault(row)"
                  >设为默认</el-button
                >
                <el-button v-else>默认</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { array } from "yargs";

export default {
  data() {
    return {
      //存储图片的信息
      spuImageList: [],
      //存储销售是属性
      spuSaleAttrList: [],
      //存储平台属性的数据
      attrInfoList: [],
      // 收集发送给服务器的数据
      imageList: [],
      //收集sku数据的字段
      skuInfo: {
        //第一类收集的数据：父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        //第二类：需要通过数据双向绑定v-model收集
        skuName: "",
        price: 0,
        weight: "",
        skuDesc: "",
        //第三类：需要自己书写代码
        //默认图片
        skuDefaultImg: "",
        //收集图片的字段
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        //平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        //销售属性
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
      },
      spu: {},
      //收集图片的数据字段:但是需要注意，收集的数据目前缺少isDefault字段，将来提交给服务器数据的时候，需要整理参数
      imageList: [],
    };
  },
  methods: {
    //获取SkuForm数据
    async addSkuData(category1Id, category2Id, spu) {
      console.log("spu", spu);
      //收集父组件给予的数据
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      this.spu = spu;
      //获取图片的数据
      let result = await this.$API.spu.reqGetSpuImageList(spu.id);
      if (result.code == 200) {
        result.data.forEach((item) => {
          // 给每一项图片添加属性isDefault,默认为0
          item.isDefault = 0;
        });
        this.spuImageList = result.data;
      }
      //获取销售属性的数据
      let result1 = await this.$API.spu.reqGetSpuSaleAttrList(spu.id);
      if (result1.code == 200) {
        this.spuSaleAttrList = result1.data;
      }
      //获取平台属性的数据
      let result2 = await this.$API.spu.reqGetBaseAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (result2.code == 200) {
        this.attrInfoList = result2.data;
      }
    },
    // 表格复选框按钮事件
    handleSelectionChange(params) {
      // 获取到用户选中图片的信息数据，但是需要注意当前收集的数据当中，缺少isDefault字段
      this.imageList = params;
    },
    // 排他操作
    changeDefault(row) {
      console.log("row", row);
      // 图片列表的数据的isDefault变为0
      this.spuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      // 点击的那个图片的isDefault变为1
      row.isDefault = 1;
      // 收集默认图片的地址
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    // 取消按钮
    cancel() {
      // 自定义事件，让父组件切换场景0
      this.$emit("changeScenes", 0);
      // 清除数据
      // Object.assign 合并对象   this._data 拿到组件实例的data  this.$options.data就是组件的初始值（vue里面的data）
      Object.assign(this._data, this.$options.data());
    },
    // 保存按钮
    async save() {
      // 整理平台属性参数
      const { attrInfoList, skuInfo, spuSaleAttrList, imageList } = this;
      let arr = [];
      // 判断用户平台属性是否进行选择
      attrInfoList.forEach((item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(":");
          // 携带给服务器参数应该是对象
          let obj = { attrId, valueId };
          arr.push(obj);
        }
      });
      // 将整理好参数赋值给skuAttrValueList
      skuInfo.skuAttrValueList = arr;
      console.log(arr);

      // 整理销售属性参数
      // - prev：必填，上一次调用回调函数时的返回值
      // - cur：必填，当前正在处理的数组元素,
      // 初始值空数组：[]
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] =
            item.attrIdAndValueId.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev;
      }, []);

      // 整理图片数据
      skuInfo.skuImageList = imageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });
      let res = await this.$API.spu.reqSaveSkuInfo(skuInfo);
      console.log("保存", res);
      if(res.code==200){
        this.$message({type:'success',message:"保存SKU成功"})
        this.$emit('changeScenes',0)
        Object.assign(this._data, this.$options.data());
      }
    },
  },
};
</script>

<style>
</style>