//入口文件
import Vue from 'vue'

import VueResource from 'vue-resource'
Vue.use(VueResource)

//导入路由的包
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

import app from './App.vue'

//按需导入mint-ui的header swiper组件
import { Header,Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//导入MUI的样式
import './lib/mui-master/dist/css/mui.min.css'

//导入icon.extra图标所需要的css文件
import './lib/mui-master/examples/hello-mui/css/icons-extra.css'

var vm=new Vue({
    el:'#app',
    render:c=>c(app),
    router
})