<template>
    <div class="goodsinfo-container">
        <!-- 使用MUI提供的card -->
        <!-- 商品轮播图 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        
						<swiper :lunboList="lunbotu" :isfull="false"></swiper>
					</div>
				</div>
			</div>
            <!--由于实现的是半场动画所以只能用钩子函数不能用类  -->
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <!-- 通过ref来获取dom元素 -->
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>    
        
        <!-- 商品购买 -->
        <div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价:<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价:<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                        </p>
                        <p class="number">购买数量:</p>
                        <!-- 拿到子组件向父组件传递的数量 -->
                        <!-- 子组件numbox最大能选择的数量由库存量决定 库存量由父组件向子组件传递 -->
                        <!-- 注意：goodsinfo是异步获取的数据 在渲染组件并手动传值的时候 还未获取到goodsinfo的值 所以传递的是undifined -->
                        <numbox @getcount="getSeletedCount" :max="goodsinfo.stock_quantity"></numbox>
                        <p class="btn">
                            <mt-button type="primary" size="small" >立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        </p>
                        <!-- 分析 如何实现加入购物车的时候拿到选择的数量 -->
                        <!-- 1 按钮属于goodsinfo页面 数字属于numberbox页面 -->
                        <!-- 2 由于涉及到了父子组件的嵌套 无法直接在goodsinfo页面中获取到选中的商品数量的值 -->
                        <!-- 3 涉及到子组件向父组件传值 （事件调用机制） -->
                        <!-- 4 事件调用本质 父向子传递方法 子调用这个方法 同时把数据当作参数传递给这个方法 -->
					</div>
				</div>
			</div>
        <!-- 商品参数 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodsinfo.goods_no}}</p>
                        <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
                        <p>上架时间：{{goodsinfo.add_time|dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
                </div>
			</div>
    </div>
</template>

<script>
import swiper from '../sub/swiper.vue'
import numbox from '../sub/numbox.vue'

export default{
    data(){
        return{
            id:this.$route.params.id,
            lunbotu:[],
            goodsinfo:{},
            ballFlag:false,//控制小球隐藏和显示的表示符
            selectedCount:1//保存用户选中的商品数量 默认用户买一个 
        }
    },
    created(){
        this.getLunbo()
        this.getGoodsInfo()
       
    },
    methods:{
        getLunbo(){
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                if(result.body.status===0){
                    //给轮播图的每一项item添加img属性 因为该接口提供的图片属性名是img.src
                    //而轮播图组件中只认知item.img
                    result.body.message.forEach(item => {
                        item.img=item.src
                    });
                    this.lunbotu=result.body.message
                }
            })
        },
       
        getGoodsInfo(){
            //获取商品信息
            this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                if(result.body.status===0){
                    this.goodsinfo=result.body.message[0]
                }
            })
        },
        goDesc(id){
            //使用编程式导航跳转到图文介绍页面
            this.$router.push({name:'goodsdesc',params:{id}})
        },
        goComment(id){
             this.$router.push({name:'goodscomment',params:{id}})
        },
        addToShopCar(){
            //添加到购物车
            this.ballFlag=!this.ballFlag
            //拼接出一个要保存到store中car数组里的商品信息对象
            var goodsinfo={
                id:this.id,
                count:this.selectedCount,
                price:this.goodsinfo.sell_price,
                selected:true
            }
            //调用store中的mutations来将商品加入购物车
            this.$store.commit("addToCar",goodsinfo);
        },
        beforeEnter(el,done){
           el.style.transform="translate(0,0)"
        },
        enter(el,done){
            el.offsetWidth;

            //小球动画优化
            //小球动画不准确的原因 ：1 我们把小球最终位移2到的位置已经局限在了某一
            //分辨率下 滚动条未滚动的情况下
            //2 只要分辨率和测试的时候不一样 或者滚动条滚动了一定的距离后 那么小球的位置会发生偏离
            //3 不能将坐标写死 应该根据不同的情况动态计算这个坐标值
            //4 解决先得到徽标的横纵坐标，再得到小球的横纵坐标 然后让y值求差 x值也求差 得到的结果就是横纵坐标要位移的距离
        
            //获取小球在页面中的位置
            const ballPosition=this.$refs.ball.getBoundingClientRect()
            //可以通过dom操作来拿到页面中的任意元素 哪怕是另一个组件的
            //获取徽标在页面中的位置
            const badgePosition=document.getElementById('badge').getBoundingClientRect()

            const xDist=badgePosition.left-ballPosition.left
            const yDist=badgePosition.top-ballPosition.top

            //使用es6模板字符串拼接
            el.style.transform=`translate(${xDist}px, ${yDist}px)`;
            el.style.transition="all 0.5s cubic-bezier(.4,-0.3,1,.68)";
            done()
        },
        afterEnter(el){
            this.ballFlag=!this.ballFlag
        },
        getSeletedCount(count){
            //当子组件把选中的数量传递给父组件的时候 把选中的值保存到data上
            this.selectedCount=count
        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>
<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    padding: 1px;
    .now_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .number{
        display: inline-block;
    }
    .btn{
        margin-top: 10px;
    }
    .mui-numbox{
        height: 30px;
    }
    .mui-card-footer{
        display: block;//取消flex布局 是按钮纵向排列
        button{
            margin: 15px 0;
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        position: absolute;
        background-color: red;
        z-index: 20;
        top:390px;
        left:166px;
    }
}
</style>