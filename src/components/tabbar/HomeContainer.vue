<template>
    <div>
    <!--轮播图 -->
     <mt-swipe :auto="4000">
         <!-- 由于每一个url地址都是唯一的 可以使用item.url当key -->
        <mt-swipe-item v-for="item in lunboList" :key="item.url">
            <img :src="item.img">
        </mt-swipe-item>
     </mt-swipe>

     <!--使用MUI提供的gird-default 六宫格  -->
      <ul class="mui-table-view mui-grid-view mui-grid-9">
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
		           <img src="../../img/menu1.png">
		            <div class="mui-media-body">新闻咨询</div>
                </a>
            </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
		           <img src="../../img/menu2.png">
		            <div class="mui-media-body">图片分享</div>
                </a>
            </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
		            <img src="../../img/menu3.png">
		            <div class="mui-media-body">商品购买</div>
                </a>
            </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
		                <img src="../../img/menu4.png">
		                <div class="mui-media-body">留言反馈</div>
                </a>
            </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
		           <img src="../../img/menu5.png">
		            <div class="mui-media-body">视频专区</div>
                </a>
            </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
		            <img src="../../img/menu6.png">
		            <div class="mui-media-body">联系我们</div>
                </a>
            </li>
		</ul> 
    
    </div>

</template>

<script>
  import {Toast} from 'mint-ui'
  export default{
      data(){
          return{
              lunboList:[]//保存轮播图的数组
          }
      },
      created(){
        this.getLunbo()  
      },
      methods:{
          //获取轮播图
          getLunbo(){
              this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then(result=>{
                //   console.log(result.body)
                if(result.body.status===0){
                    this.lunboList=result.body.message;
                }else{
                    Toast('加载轮播失败')
                }
              })
          }
      }
  }
</script>

<style lang="scss" scoped>
.mint-swipe{
    height: 200px;
    .mint-swipe-item{
    &:nth-child(1){
        background-color: red;
    }
    &:nth-child(2){
        background-color: yellow;
    }
    
    img{
        width: 100%;
        height: 100%;
    }
 }
}

.mui-grid-view{
    font-size: 13px;
    &.mui-grid-9{
        background-color: white;
        border: 0;
        .mui-table-view-cell{
            border: 0;
            img{
                width: 60px;
                height: 60px;
            }
        }
    }
}


</style>