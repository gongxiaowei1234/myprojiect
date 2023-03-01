<template>
  <div>
    <el-card class="box-card">
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>

    <el-card>
      <vxe-toolbar>
        <template #buttons>
          <vxe-button
            status="primary"
            content="临时新增"
            @click="addAttr"
          ></vxe-button>
          <vxe-button
            status="warning"
            content="批量删除"
            @click="removeSelectEvent"
          ></vxe-button>
          <vxe-button
            status="danger"
            content="直接删除"
            @click="deleteSelectEvent"
          ></vxe-button>
          <vxe-button
            content="提交（将临时操作持久化）"
            @click="saveEvent"
          ></vxe-button>
        </template>
      </vxe-toolbar>
      <vxe-table
        border
        keep-source
        resizable
        ref="xTable"
        :data="attrList"
        :column-config="{ resizable: true }"
        :edit-config="{ trigger: 'manual', mode: 'row' , autoClear: false,showStatus:true,showInsertStatus:true}"
      >
        <vxe-column type="checkbox" width="60"></vxe-column>
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column
          title="属性名称"
          :edit-render="{ autofocus: '.vxe-input--inner' }"
        >
          <template #edit="{ row }">
            <vxe-input v-model="row.attrName" type="text"></vxe-input>
          </template>
        </vxe-column>
        <vxe-column
          title="属性ID"
          :edit-render="{ autofocus: '.vxe-input--inner' }"
        >
          <template #edit="{ row }">
            <vxe-input v-model="row.id" type="text"></vxe-input>
          </template>
        </vxe-column>
        <vxe-column  title="属性值名称列表" :edit-render="{}">
            <template #default="{ row }">
              <span>{{ (row.valueName) }}</span>
            </template>
            <template #edit="{ row }">
              <vxe-select v-model="row.valueName" type="text" :options="attrValueList" transfer></vxe-select>
            </template>
          </vxe-column>
        <vxe-column title="操作">
          <template #default="{ row }">
            <template v-if="$refs.xTable.isActiveByRow(row)">
              <vxe-button
                size="mini"
                status="success"
                @click="saveRowEvent(row)"
                round
                v-prevent-re-click
                >保存</vxe-button
              >
              <vxe-button
                size="mini"
                status="info"
                @click="cancelRowEvent(row)"
                round
                >取消</vxe-button
              >
            </template>
            <template v-else>
              <vxe-button
                size="mini"
                status="warning"
                content="编辑"
                @click="editRowEvent(row)"
              ></vxe-button>
              <vxe-button
                size="mini"
                status="warning"
                content="新增"
                @click="add(row)"
              ></vxe-button>
              <vxe-button
                size="mini"
                status="danger"
                content="删除"
                @click="deleteAttr(row)"
              ></vxe-button>
            </template>
          </template>
        </vxe-column>
      </vxe-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "attr1",
  data() {
    return {
      //收集平台售卖属性
      attrList: [],
      //获取分类ID
      attrList1: [
        {
          name: "男",
          desc: "女",
        
         
        },
      ],

      category1Id: "",
      category2Id: "",
      category3Id: "",
    };
  },
  created() {
    this.getAttrList();
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
        this.getAttrList();
      }
    },
    // 请求获取平台的属性数据
    async getAttrList() {
      console.log("发请求");
      const { category1Id, category2Id, category3Id } = this;
      let res = await this.$API.attr.reqGetAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      console.log(res);
      if (res.code == 200) {
        this.attrList = res.data;
      }
    },
    async addAttr() {
        const xTable = this.$refs.xTable;
        const {row:newRow}=await xtable.insert(this.attrInfo)
        // 激活行编辑并激活第一个单元格，用于:edit-config
        await Xtable.setEditRow(newRow)
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
      });
      //  flag属性，给每个属性添加一个标记flag,用户切换与编辑模式
      console.log(this.attrInfo.attrValueList);
      // 清除数据，解决取消回显问题
      //   this.attrInfo = {
      //     attrName: "",
      //     attrValueList: [],
      //     categoryId: this.category3Id,
      //     categoryLevel: 3,
      //   };
    },
    // 保存
    // async addOrUpdateAttr(row) {
       
    //   this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
    //     (item) => {
    //       if (item.valueName != "") {
    //         return true;
    //       }
    //     }
    //   );
    //   try {
    //     await this.$API.attr.reqAddAttr(this.attrInfo);
    //     this.isShowTable = true;
    //     this.$message({ type: "success", message: "保存成功" });
    //     this.getAttrList();
    //   } catch (error) {
    //     this.$message("保存成功");
    //   }
    // },
     /** 取消 */
     cancelRowEvent(row) {
      const xTable = this.$refs.xTable;
    //   手动清除单元格激活状态
      xTable.clearActived().then(() => {
        // 还原指定行 row 或者整个表格的数据
        xTable.revertData(row);
      });
    },
     /** 编辑 */
     editRowEvent(row) {
      this.$refs.xTable.setActiveRow(row);
    },
    async deleteAttr(row) {
    
      let attrId = row.attrValueList[0].attrId;
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
  },
  mounted() {},
};
</script>

<style>
</style>