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
        // x轴最大值最小值设置
          min:0,
          max:100
        },
        yAxis: {
          //  隐藏x轴
          show: false,
          type: "category",
        },
        // 设置图表类型，图表数据
        series: [
          {
            
            // bar 柱状图  line折线图 pie 饼图
            type: "bar",
            data: [78],
            color:"yellowgreen",
            // 柱状图宽度
            barWidth:10,
            // 背景颜色设置
            showBackground:true,
            backgroundStyle:{
                color:"#eee",
            },
            // 文本
            label:{
                show:true,
                formatter:"|",
                position:'right'
            }
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