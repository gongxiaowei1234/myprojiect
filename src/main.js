import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'



import '@/icons' // icon
import '@/permission' // permission control
// 引入相关API请求接口
import API from '@/api'
// 组件实例的原型指向的是Vue。prototype
// 任意组件可以使用API相关接口
Vue.prototype.$API=API

// 引入三级联动
import CategorySelect from "@/components/CategorySelect";
// 注册全局组件
Vue.component(CategorySelect.name,CategorySelect)

import HintButton from '@/components/HintButton'
Vue.component(HintButton.name,HintButton)

// 引入echarts后，不能全局使用echarts，所以通过Vue.prototype将echarts保存为全局变量。
// 修改 echarts.init() 为 this.$echarts.init() ，
import * as echarts from "echarts";
// Vue.use(echarts)
Vue.prototype.$echarts = echarts
// 引入时间插件
import dayjs from 'dayjs';
Vue.use(dayjs)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(VXETable)
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.prototype.$VXETable=VXETable
Vue.config.productionTip = false
// console.log(process.env);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
