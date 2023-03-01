<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥ 1289900">
            <template slot="charts">
              <span>周同比&nbsp;&nbsp;56.67%<svg t="1677312724588" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4260" width="16" height="16"><path d="M541.866667 285.866667l345.6 345.6c17.066667 17.066667 17.066667 42.666667 0 59.733333-8.533333 8.533333-19.2 12.8-29.866667 12.8H168.533333c-23.466667 0-42.666667-19.2-42.666666-42.666667 0-10.666667 4.266667-21.333333 12.8-29.866666l343.466666-345.6c17.066667-17.066667 42.666667-17.066667 59.733334 0z" fill="#d81e06" p-id="4261"></path></svg></span>
              &nbsp;&nbsp;
              <span>日同比&nbsp;&nbsp;19.67%<svg t="1677313152777" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3398" width="16" height="16"><path d="M482.133333 738.133333L136.533333 392.533333c-17.066667-17.066667-17.066667-42.666667 0-59.733333 8.533333-8.533333 19.2-12.8 29.866667-12.8h689.066667c23.466667 0 42.666667 19.2 42.666666 42.666667 0 10.666667-4.266667 21.333333-12.8 29.866666L541.866667 738.133333c-17.066667 17.066667-42.666667 17.066667-59.733334 0z" fill="#16e024" p-id="3399"></path></svg></span>
            </template>
            <template slot="footer">
                <span>日销售额￥ 12423</span>
            </template>
          </Detail> 
        </el-card>
    </el-col>
    <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="￥ 84600" >
            <template slot="charts">
                <lineCharts></lineCharts>
            </template>
            <template slot="footer">
                <span>日访问量 12423</span>
            </template>
          </Detail> 
        </el-card>
    </el-col>
    <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="￥ 84600">
            <template slot="charts">
                <barCharts></barCharts>
                </template>
            <template slot="footer">
                <span>转换率 64%</span>
            </template>
          </Detail> 
        </el-card>
    </el-col>
    <el-col :span="6">
        <el-card>
          <Detail title="运行活动效果" count="78 %">
            <template slot="charts">
                <progressCharts></progressCharts>
                </template>
            <template slot="footer">
                <span>周同比&nbsp;&nbsp;12%<svg t="1677312724588" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4260" width="16" height="16"><path d="M541.866667 285.866667l345.6 345.6c17.066667 17.066667 17.066667 42.666667 0 59.733333-8.533333 8.533333-19.2 12.8-29.866667 12.8H168.533333c-23.466667 0-42.666667-19.2-42.666666-42.666667 0-10.666667 4.266667-21.333333 12.8-29.866666l343.466666-345.6c17.066667-17.066667 42.666667-17.066667 59.733334 0z" fill="#d81e06" p-id="4261"></path></svg></span>
              &nbsp;&nbsp;
              <span>日同比&nbsp;&nbsp;11%<svg t="1677313152777" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3398" width="16" height="16"><path d="M482.133333 738.133333L136.533333 392.533333c-17.066667-17.066667-17.066667-42.666667 0-59.733333 8.533333-8.533333 19.2-12.8 29.866667-12.8h689.066667c23.466667 0 42.666667 19.2 42.666666 42.666667 0 10.666667-4.266667 21.333333-12.8 29.866666L541.866667 738.133333c-17.066667 17.066667-42.666667 17.066667-59.733334 0z" fill="#16e024" p-id="3399"></path></svg></span>
            </template>
          </Detail> 
        </el-card>
    </el-col>
    </el-row>
  </div>
</template>
  
  <script>
import Detail from "./Detail";
import lineCharts from "./lineChart"
import barCharts from "./barCharts"
import progressCharts from "./progressCharts"

export default {
  name: "",
  components: { Detail,lineCharts ,barCharts,progressCharts},
};
</script>
  <style>
</style>
  