<template>
  <div>
    <!-- :inline:行内表单，代表一行可以放置多个表单元素 -->
    <!-- :model 收集表单的数据-->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="getCategory2List"
          :disabled="show"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="(c1, index) in list1"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" v-model="cForm.category2Id"  @change="getCategory3List" :disabled="show">
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="(c2, index) in list2"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="cForm.category3Id" @change="handle3Change" :disabled="show">
          <el-option
            :label="c3.name" 
            :value="c3.id"
            v-for="(c3, index) in list3"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!-- <el-button type="primary" @click="onSubmit">查询</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props:['show'],
  data() {
    return {
      // 一级分类的数据
      list1: [],
      //  二级分类的数据
      list2: [],
      //  二级分类的数据
      list3: [],
      // 收集相应的一级二级三级分类id
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  mounted() {
    this.getCategory1List();
  },
  created() {},
  methods: {
    // 获取一级分类的数据的方法
    async getCategory1List() {
      let res = await this.$API.attr.reqGetcategory1Id();
      //   console.log(res);
      if (res.code == 200) {
        this.list1 = res.data;
      }
    },
    // 当1级分类change,获取二级分类数据
    async getCategory2List() {
        this.list2=[]
        this.list3=[]
        this.cForm.category2Id=''
        this.cForm.category3Id=''  
      const { category1Id } = this.cForm;
    // 把ID传给父组件Attr
      this.$emit('getCategoryId',{categoryId:category1Id,level:1})
      let res = await this.$API.attr.reqGetcategory2Id(category1Id);
    //   console.log(res);
      if (res.code == 200) {
        this.list2 = res.data;
      }
    },
    // 当二级分类change,获取三级分类数据
    async getCategory3List() {
        this.list3=[]
        this.cForm.category3Id=''
      const { category2Id } = this.cForm;
      // 把ID传给父组件Attr
      this.$emit('getCategoryId',{categoryId:category2Id,level:2})
      let res = await this.$API.attr.reqGetcategory3Id(category2Id);
    //   console.log(res);
      if (res.code == 200) {
        this.list3 = res.data;
      }
    },
    // 当三级分类改变
    handle3Change(){
        const {category3Id}=this.cForm
        // 把ID传给父组件Attr
        this.$emit('getCategoryId',{categoryId:category3Id,level:3})
  },
}
};
</script>

<style>
</style>