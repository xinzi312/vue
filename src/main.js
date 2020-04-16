//入口文件
import Vue from 'vue'

import app from './App.vue'

//按需导入mint-ui的header组件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

//导入MUI的样式
import './lib/mui-master/dist/css/mui.min.css'

var vm=new Vue({
    el:'#app',
    render:c=>c(app)
})