<template>
    <!-- 最大值为props中max值 -->
    <!-- 我们不知道什么时候能拿到max值 但是总归有一刻会拿到max值 -->
    <!-- 使用watch属性监听 父组件传递过来的max值 不管watch会被触发几次 但是
    最后一次肯定是一个合法的数值 -->
   	<div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <!-- 在文本框的值发生改变的时候 子组件就要把数据传递给父组件 调用文本框的change事件-->
		<input id="test" class="mui-input-numbox" type="number" value="1" 
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
        // 在文本框的值发生改变的时候 子组件就要通过事件调用把数据传递给父组件
         this.$emit('getcount',parseInt(this.$refs.numbox.value))
        }
    },
    //父组件向子组件传递的库存量值
    props:["max"],
    watch:{
        //属性监听
        max:function(newVal,oldVal){
           mui(".mui-numbox").numbox().setOption('max',newVal)
        }
    }
   
}
</script>