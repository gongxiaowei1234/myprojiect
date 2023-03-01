<template>
    <!-- 第一步准备容器 -->
    <div class="charts" ref="charts"></div>
  </template>
  
  <script>
  export default {
    name: "",
    mounted() {
      // 第二步 初始化图表实例
      let barCharts = this.$echarts.init(this.$refs.charts);
      // 第三步 配置数据
      barCharts.setOption({
        tooltip: {},
        // x轴数据设置
        xAxis: {
          // 隐藏x轴
          show: false,
          type: "category",
        },
        yAxis: {
          //  隐藏x轴
          show: false,
        },
        // 设置图表类型，图表数据
        series: [
          {
            
            // bar 柱状图  line折线图 pie 饼图
            type: "bar",
         
            data: [35, 55, 15, 50, 25, 15, 38, 20,35, 55,10,30,10],
            color:"pink"
          },
        ],
        // 布局
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 10,
        },
      });
    },
  };
  </script>
  
  <style scoped>
  .charts {
    width: 100%;
    height: 100%;
  }
  </style>s