<template>
  <el-card class="box-card" style="margin: 10px 0px">
    <!-- 头部 -->
    <div slot="header" class="clearfix">
      <!-- v-model="activeName" @tab-click="handleClick"s -->
      <!-- 头部左侧内容 -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale">
        </el-tab-pane>
        <el-tab-pane label="访问量" name="visits"> </el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div slot="header" class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年 </span>
        <!-- v-model="value1" -->
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
      <!-- 内容 -->
      <div>
            <el-row :gutter="10">
              <el-col :span="18">
                <!-- 第一步准备容器，并设置大小 -->
                <div class="charts" ref="charts"></div>
              </el-col>
              <el-col :span="6" class="right">
                <!-- v-if="this.activeName==sale? '销售额':'访问量'" -->
                <h3>门店{{ title }}排名</h3>
                <ul>
                  <Li>
                    <span class="rindex">1</span>
                    <span>肯德基</span>
                    <span class="rvalue">3233455</span>
                  </Li>
                  <Li>
                    <span class="rindex">2</span>
                    <span>麦当劳</span>
                    <span class="rvalue">313455</span>
                  </Li>
                  <Li>
                    <span class="rindex">3</span>
                    <span>肯德基</span>
                    <span class="rvalue">213455</span>
                  </Li>
                  <Li
                    ><span>4</span>
                    <span>肯德基</span>
                    <span class="rvalue">219455</span></Li
                  >
                  <Li
                    ><span>5</span>
                    <span>肯德基</span>
                    <span class="rvalue">210455</span></Li
                  >
                  <Li
                    ><span>6</span>
                    <span>肯德基</span>
                    <span class="rvalue">19455</span></Li
                  >
                  <Li
                    ><span>7</span>
                    <span>肯德基</span>
                    <span class="rvalue">455</span></Li
                  >
                </ul>
              </el-col>
            </el-row>
          </div>
  </el-card>
</template>

<script>
import dayjs from "dayjs";
// import dayjs from 'dayjs';
export default {
  name: "",
  data() {
    return {
      // 默认绑定销售额高光
      activeName: "sale",
      // 收集日期
      date: [],
      myCharts:null
    };
  },
  computed: {
    // 标题
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
  },
  created() {},
  methods: {
    // 获取今日时间
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    // 获取本周时间
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    // 获取本月时间
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    // 获取本年时间
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
  mounted() {
    // 第二步 初始化图表实例
  this.myCharts = this.$echarts.init(this.$refs.charts);
    // 第三步 配置数据
    this.myCharts.setOption({
      title: {
        text: this.title +"趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          show: false,
        },
      ],
      series: [
        {
          //   name: "销售额",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330],
          color: "blue",
        },
      ],
    });
  },
  watch:{
    title(){
        this.myCharts.setOption({
           title:{
            text:this.title +"趋势"
           }
        })
    }
  }
};
</script>

<style >
.rvalue {
  float: right;
}
.rindex {
  /* 内联元素inline转化为块状元素block */
  /* inline-block可以让三个span在同一行显示 */
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50% !important;
  background: rgb(106, 104, 104);
  color: white;
  /* border: 1px solid lightpink; */
  text-align: center;
}
.ul {
  width: 100%;
  height: 400px;
  padding: 0px;
}
ul li {
  /* 清除li标签前面的小黑点 */
  list-style: none;
  height: 30px;
}
.right {
  padding: 0px;
}
.charts {
  width: 100%;
  height: 350px;
}
.el-card__header {
  border-bottom: none;
}
.clearfix {
  position: relative;
  display: flex;
  /*两个元素之间间隔相等 */
  justify-content: space-between;
}
.el-date-editor--daterange.el-input__inner {
  width: 220px;
  margin: 0px 20px;
}
.tab {
  width: 100%;
}
.right {
  /* 子绝父相 */
  position: absolute;
  right: 0;
}
.right span {
  margin: 0px 10px;
}
</style>