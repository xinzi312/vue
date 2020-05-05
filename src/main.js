//入口文件
import Vue from 'vue'


import VueResource from 'vue-resource'
Vue.use(VueResource)

//导入路由的包
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

//安装格式化时间插件
//npm i moment -S
//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat',function(dataStr,pattern='YYYY-MM-DD HH:mm:ss'){
    return moment(dataStr).format(pattern)
})

//设置请求根地址
Vue.http.options.root='http://www.liulongbin.top:3005'

//全局设置post时候表单数据格式组织形式
Vue.http.options.emulateJSON=true

import app from './App.vue'

//按需导入mint-ui的header swiper组件
// import { Header,Swipe, SwipeItem,Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
//要想实现图片懒加载 就得全部导入不能按需导入
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// //使用缩略图插件
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)

//导入MUI的样式
import './lib/mui-master/dist/css/mui.min.css'

//导入icon.extra图标所需要的css文件
import './lib/mui-master/examples/hello-mui/css/icons-extra.css'


//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//每次刚进入网站 肯定会调用main.js在刚调用的时候 先从本地存储中 把购物车的数据读出来
//放到store中
var car=JSON.parse(localStorage.getItem('car')||'[]')

var store=new Vuex.Store({
    state:{
        car:car//将购物车中商品的数据用一个数组存储起来 在car数组中存储一些商品的
        //对象，暂时将商品的对象设计成 {id:商品的id,count:要购买的数量,price:商品的单价,seleted:true}
    },
    mutations:{
        addToCar(state,goodsinfo){
            //点击加入购物车 把商品信息 保存到store中的car上
           //1 如果购物车中，之前就已经有这个对应的商品了 那么，只需要更新数量
           //2 如果没有 则直接把数据push到car中即可

           //假设在购物车中没有找到对应的商品
         var flag=false  
         state.car.some(item=>{//some是找到就停止了
             if(item.id==goodsinfo.id){
                 item.count+=parseInt(goodsinfo.count)//把字符串转为数字
                 return true
             }
         })
         //如果最终循环完毕得到的flag还是false
         if(!flag){
             state.car.push(goodsinfo)
         }
         //当更新car后把car数组存储到本地的localStorage中
         localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsInfo(state,goodsinfo){
            //修改购物车中商品的数量值
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count=parseInt(goodsinfo.count)
                        return true              
                }
            })
            //当修改商品的数量 把最新的购物车数据 保存到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFormCar(state,id){
            //根据id 从store中的购物车中删除对应的那条商品的数据
            state.car.some((item,i)=>{
                if(item.id==id){
                    state.car.splice(i,1)
                    return true
                }
            })
            //将删除完毕后 最新的购物车数据 同步到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
            //更新商品选择的状态到store
            state.car.some(item=>{
                if(item.id==info.id){
                    item.selected=info.selected
                    return true
                }
            })
        
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    //store的计算属性 过滤数据
    getters:{
        getAllCount(state){
            var c=0;
            state.car.forEach(item=>{
                c+=item.count
            })
            return c
        },
        getGoodsCount(state){
            var o=[]
            state.car.forEach(item=>{
                o[item.id]=item.count
            })
            return o
        },
        getGoodsSelect(state){
            var o={}
            state.car.forEach(item=>{
                o[item.id]=item.selected
            })

            return o
        },
        getGoodsCountAndAmount(state){
            var o={
                count:0,//勾选的数量
                amount:0//勾选的总价
            }
            state.car.forEach(item=>{
                if(item.selected){
                    o.count+=item.count
                    o.amount+=item.price*item.count
                }
            })
            return o
        }
    }
})

var vm=new Vue({
    el:'#app',
    render:c=>c(app),
    router,
    store
})