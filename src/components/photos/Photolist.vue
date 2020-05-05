<template>
    <div>
        <!-- 使用MUI提供的tab-top-webview-main -->
        <!-- 去掉mui-fullscreen的类否则会全屏显示 -->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
                        <!-- 属性绑定 只有全部这一项才高亮显示 -->
						<a :class="['mui-control-item',item.id==0?'mui-active':'']" 
                            v-for='item in cates' :key='item.id' @tap="getImgList(item.id==0?0:item.id2)" >
                            <!-- 解决在手机端调试的时候点击顶部菜单无法切换的问题
                            将MUI组件中的@click事件改为@tap
                            注意：tap只能用于MUI组件 -->
							{{item.title}}
						</a>		
					</div> 
				</div>
		</div>
        <!-- 图片列表区域 使用mint-ui的lazy load-->
        <ul class="photo-list">
            <!-- tag属性 使其渲染成li标签 -->
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag='li'>
                <img v-lazy="item.img_url">
                <!-- 图片的文字介绍 -->
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
//导入mui的js文件
  import mui from '../../lib/mui-master/dist/js/mui.js'

  export default{
      data(){
          return{
              //所有分类的列表
              cates:[],
              //图片列表
              list:[]
          }
      },
      mounted(){//当组件中的dom结构被渲染好并放到页面上的后 会执行该钩子函数
                //如果要操作元素 最好在mounted里 因为这个时候的元 否则刚进入页面无法滑动该控件）

        //禁用严格模式
        //1 安装插件npm i babel-plugin-transform-remove-strict-mode -D
        //2 根据插件api文档 在.babelrc中添加 "transform-remove-strict-mode"
      mui('.mui-scroll-wrapper').scroll({
	           deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
      },
      created(){
          this.getAllCategory()
          //默认进入页面就去请求所有图片数据
          this.getImgList(0)
      },
      methods:{
          getAllCategory(){
              //获取所有图片分类
              this.$http.get('api/getimgcategory').then(result=>{
                  if(result.body.status===0){
                      result.body.message.unshift({title:'全部',id:0});
                      this.cates=result.body.message
                      //增加id2的属性 并赋值
                      for(var i=1,j=17;i<=6,j<22;i++,j++){
                            this.cates[i]['id2']=j
                          }
                      }
                  }
              )
          },
          //获取图片列表
          getImgList(cateId){
              this.$http.get('api/getimages/'+cateId).then(result=>{
                  if(result.body.status===0){
                      this.list=result.body.message           
                  }
              })
          }
      }
  }

  
</script>
<style lang="scss" scoped>
     *{
         touch-action: pan-y;
     }
    // .mui-slider{
    //      z-index: -1;//不能设置z-index:-1 不然顶部栏会滑动不了
    //  }
     .photo-list{
         margin: 0;
         padding: 10px;
         list-style: none;
         padding-bottom: 0;
         li{  
              margin-bottom: 10px;
              background-color: #ccc;
              text-align: center;
              box-shadow: 0 0 9px #999;
              position: relative;
              img{
                  width: 100%;
                  //去除图片边距
                  display: block;
              }
              //实现图片懒加载
              img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
        
            .info{
                 color:#fff;
                 text-align: left;
                 position:absolute;
                 bottom: 0;
                 background-color: rgba(0,0,0,0.4);
                 //给盒子设置最大高度
                 max-height: 84px;
                .info-title{
                    font-size: 14px;
                }
                .info-body{
                    font-size: 13px;
                }
            }
         }
     }
    
</style>