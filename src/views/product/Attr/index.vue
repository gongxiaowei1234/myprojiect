<template>
  <div>
    <el-card class="box-card">
      <CategorySelect @getCategoryId="getCategoryId" :show="isShowTable"></CategorySelect>
    </el-card>
    <!-- 表格：展示平台属性 -->
    <el-card class="box-card" style="margin: 20px 0px">
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin: 10px 0px"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table :data="attrList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="150" align="center">
          </el-table-column>
          <el-table-column
            label="属性名称"
            prop="attrName"
            width="150"
            align="center"
          >
          </el-table-column>
          <!-- width="width"剩余最大宽度 -->
          <el-table-column label="属性值列表" width="width" align="center">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250" align="center">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-edit"
                @click="updateAttr(row, $event)"
                >修改</el-button
              >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                 @click="deleteAttr(row)"
                  style="margin-left: 10px"
                  >删除</el-button
                >
             
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加属性|修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名" style="margin-left: 0px">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0px"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                placeholder="请输入属性值名称"
                v-model="row.valueName"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- <el-button
                type="warning"
                size="small"
                icon="el-icon-edit"
                @click="updateAttr(row)"
                >修改</el-button
              > -->
              <el-popconfirm
                :title="`确认删除${row.valueName}吗?`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  slot="reference"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import CategorySelect from "@/components/CategorySelect";
export default {
  name: "",
  components: { CategorySelect },
  data() {
    return {
      //获取分类ID
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //收集平台售卖属性
      attrList: [],
      // 是否展示表格
      isShowTable: false,
      attrInfo: {
        attrName: "",
        attrValueList: [
          //     {attrId:0,
          //     valueName:""
          // }
        ],
        categoryId: 0,
        categoryLevel: 3,
      },
      show:true
      // flag:true
    };
  },
  created() {},
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
        this.getAttrList();
      }
    },
    // 请求获取平台的属性数据
    async getAttrList() {
      // console.log("发请求");
      const { category1Id, category2Id, category3Id } = this;
      let res = await this.$API.attr.reqGetAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      // console.log(res);
      if (res.code == 200) {
        this.attrList = res.data;
      }
    },
    //    添加属性值
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
      });
      //  flag属性，给每个属性添加一个标记flag,用户切换与编辑模式
      console.log(this.attrInfo.attrValueList);
    },
    // 添加属性
    addAttr() {
      this.isShowTable = false;
      // 清除数据，解决取消回显问题
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    // 修改某一个属性
    updateAttr(row, event) {
      console.log(row);
      // console.log(event.target.innerText);
      this.isShowTable = false;
      // this.attrInfo = {...row};
      // this.attrInfo = Object.assign({},row)
      this.attrInfo = JSON.parse(JSON.stringify(row));
      this.attrInfo.attrValueList.forEach((item) => {
        //第一个参数:对象  第二个参数:添加新的响应式属性  第三参数：新的属性的属性值
        this.$set(item, "flag", false);
      });
    },
    //失去焦点以及回车的事件---切换为查看模式,展示
    toLook(row) {
      if (row.valueName.trim() == "") {
        this.$message("请你输入一个正常的属性值");
        return;
      }
      //新增的属性值不能与已有的属性值重复
      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        //判断的时候,需要把已有的数组当中新增的这个属性值去除
        // /row!==item,那么走这个if的就是排除了row最新的属性值的情况
        if (row !== item) {
          return row.valueName == item.valueName;
        }
        //如果出现重复的,直接return,不执行后面代码
        if (isRepeat) return;
        row.flag = false;
      });
    },
    // 点击span的回调，变为编辑模式
    toEdit(row, index) {
      row.flag = true;

      // 这里不能用.index,因为index是一个变量，这里用中括号枚举的形式

      //$nextTick,当节点渲染完毕了,会执行一次
      this.$nextTick(() => {
        // 获取input节点，实现自动聚焦
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
      // cconsole.log(this.$refs[index]);
    },
    // 删除
    async deleteAttr(row) {
      // 当前删除属性的操作是不需要发请求的
      // console.log(row);
      // let arr = row.attrValueList;
      // console.log(arr);
      // let attr0 = arr[0] || [];
      // let attrId = attr0.attrId || [];
      // console.log(attrId);
      let attrId = row.attrValueList[0].attrId 
      // 当用户点击取消按钮的时候触发
      this.$confirm(`此操作将永久删除${row.attrName}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 当用户点击取消按钮的时候触发
          let res = await this.$API.attr.reqDeleteAttr(attrId);
          // console.log(res);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
          // 再次获取品牌列表数据
          this.getAttrList();
        })
        .catch(() => {
          // 当用户点击取消按钮的时候触发
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    deleteAttrValue(index) {
      // 当前删除属性的操作是不需要发请求的
      this.attrInfo.attrValueList.splice(index, 1);
    },
    // 保存
    async addOrUpdateAttr() {
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName != "") {
            delete item.flag;
            return true;
          }
        }
      );
      try {
        await this.$API.attr.reqAddAttr(this.attrInfo);
        this.isShowTable = true;
        this.$message({ type: "success", message: "保存成功" });
        this.getAttrList();
      } catch (error) {
        this.$message("保存成功");
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>