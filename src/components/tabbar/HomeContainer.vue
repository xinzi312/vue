<template>
    <div>
    <!--轮播图 -->
     <swiper :lunboList="lunboList" :isfull='true'></swiper>

     <!--使用MUI提供的gird-default 六宫格  -->
      <ul class="mui-table-view mui-grid-view mui-grid-9">
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
		           <img src="../../img/menu1.png">
		            <div class="mui-media-body">新闻咨询</div>
                </router-link>
            </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
		           <img src="../../img/menu2.png">
		            <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
		            <img src="../../img/menu3.png">
		            <div class="mui-media-body">商品购买</div>
                </router-link>
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
  import swiper from '../sub/swiper.vue'

  export default{
      data(){
          return{
              img:'../../img/img1.jpg',
              lunboList:[]//保存轮播图的数组
          }
      },
      created(){
        this.getLunbo()  
      },
      methods:{
          //获取轮播图
          getLunbo(){
              this.$http.get('api/getlunbo').then(result=>{
                //   console.log(result.body)
                if(result.body.status===0){
                    this.lunboList=result.body.message;
                    //拼接一个对象代替加载不出来的那张轮播图
                    var obj={
                        id:2,
                        url:'http://www.itcast.cn/subject/phoneweb/index.html',
                        img:'../../img/img1.jpg'
                    }
                    this.lunboList.splice(1,1,obj)
                    console.log( this.lunboList)
                }else{
                    Toast('加载轮播失败')
                }
              })
          }
      },
      components:{
          swiper
      }
  }
</script>

<style lang="scss" scoped>


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