<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{photoinfo.add_time|dateFormat}}</span>
            <span>点击：{{photoinfo.click}}次</span>
        </p>
        <hr>

        <!-- 缩略图区域 -->
        <!-- 使用缩略图插件 -->
        <div class="suonue">
             <vue-preview :slides="list" @close="handleClose"></vue-preview>
        </div>
        

        <!-- 图片内容区域 -->
        <!-- 根据接口文档 content带有html标签 所以要v-html -->
        <div class="content" v-html='photoinfo.content'></div>

        <!-- 放置一个现成的评论子组件 -->
        <cmt-box :id='id'></cmt-box>
    </div>
</template>
<script>
//导入子组件
import comment from '../sub/comment.vue'
export default{
    data(){
        return{
            id:this.$route.params.id,//从路由中获取到的图片id
            photoinfo:{},//图片详情
            //根据缩略图插件官方api list得是一个数组
            list:[]
        }
    },
    created(){
        this.getPhotoInfo()
        this.getThumbs()
    },
    methods:{
        getPhotoInfo(){
            //获取图片详情
            this.$http.get('api/getimageInfo/'+this.id).then(result=>{
                if(result.body.status===0){
                    if(result.body.status===0){
                        this.photoinfo=result.body.message[0]
                    }
                }
            })
        },
         //获取缩略图
        getThumbs(){
        this.$http.get('api/getthumimages/'+this.id).then(result=>{
            if(result.body.status===0){
                //根据官方api 必须提供默认的宽高值 所以循环遍历每一项添加宽高值
                result.body.message.forEach(item => {
                    item.w=400;
                    item.h=300;
                    item.msrc = item.src;
                });
                //把完整的数据保存到list中
                this.list=result.body.message
            }
        })
       },
       handleClose () {
        console.log('close event')
      }
    },
   
    components:{
        'cmt-box':comment
    }
}
</script>
<style lang="scss" scoped>
   .photoinfo-container{
       padding:3px;
       h3{
           font-size: 15px;
           text-align: center;
           margin: 15px 0;
           color:#26a2ff;
       }
       .subtitle{
           display: flex;
           justify-content: space-between;
           font-size: 13px;
       }
       .content{
           font-size: 13px;
           line-height: 30px;
       }
   }
   .suonue {
  /deep/ .my-gallery {
    display: flex;
    flex-wrap: wrap;
    figure {
      width: 30%;
      margin: 5px;
      img {
        width: 100%;
      }
    }
  }
}
</style>