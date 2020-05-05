<template>
    <!-- 最大值为props中max值 -->
    <!-- 我们不知道什么时候能拿到max值 但是总归有一刻会拿到max值 -->
    <!-- 使用watch属性监听 父组件传递过来的max值 不管watch会被触发几次 但是
    最后一次肯定是一个合法的数值 -->
   	<div class="mui-numbox" data-numbox-min='1'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <!-- 在文本框的值发生改变的时候 子组件就要把数据传递给父组件 调用文本框的change事件-->
		<input id="test" class="mui-input-numbox" type="number" :value="initcount" 
        @change="countChange" ref="numbox"/>
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
    
</template>
<script>
  import mui from '../../lib/mui-master/dist/js/mui.js'
export default{
    mounted(){
        //要自己手动初始化该组件
        mui('.mui-numbox').numbox();
    },
    methods:{
        countChange(){
            //数量改变了
            //每当数量值改变 则立即把最新的数量同步到 购物车store中 覆盖之前的数量值
            this.$store.commit("updateGoodsInfo",{
                id:this.goodsid,
                count:this.$refs.numbox.value
            })
        }
    },
    props:["initcount","goodsid"]

}
</script>