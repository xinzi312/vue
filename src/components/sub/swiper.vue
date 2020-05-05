<template>
    <div>
        <mt-swipe :auto="4000">
         <!-- 由于每一个url地址都是唯一的 可以使用item.url当key -->
         <!-- 将来谁用次轮播图组件 谁为我们传递lunboList -->
         <!-- 此时lunboList应该是父组件向子组件传值 -->
        <mt-swipe-item v-for="item in lunboList" :key="item.url">
            <!-- 如果isfull为真 就添加full的样式 -->
            <img :src="item.img" :class="{'full':isfull}">
        </mt-swipe-item>
     </mt-swipe>
    </div>
</template>

<script>
export default{
    props:['lunboList','isfull']
}
</script>
<style lang="scss" scoped>
  .mint-swipe{
    height: 200px;
    .mint-swipe-item{
      text-align: center;
    img{
    //    width: 100%;
       height: 100%;
    }
 }
}
.full{
    width: 100%;
}
</style>