<template>
    <div class="news-container">
        <h3 class="title">{{newsinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{newsinfo.add_time|dateFormat}}</span>
            <span>点击:{{newsinfo.click}}次</span>
        </p>
        <hr>
        <!-- 根据文档说明 新闻内容要带有html标签 所以用v-html -->
        <div class="content" v-html="newsinfo.content"></div>

        <!-- 评论子组件 -->
        <!-- 父组件像子组件传的id值 -->
        <comment :id='this.id'></comment>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
//导入评论子组件
import comment from '../sub/comment.vue'
export default{
    data(){
        return{
            //只要一进入页面就获取id的值 根据id的值来决定渲染哪一条新闻详情
            id:this.$route.params.id,
            //新闻对象(注意是对象不能定义成数组)
            newsinfo:{}
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then(result=>{
                if(result.body.status===0){
                    this.newsinfo=result.body.message[0]
                }else{
                    Toast('获取数据失败')
                }
            })
        }
    }, 
    components:{
        comment
    }
}
</script>

<style lang="scss" scoped>
    .news-container{
         padding: 0 4px;
        .title{
           font-size:16px;
           text-align: center;
           margin: 15 0;
           color: red;
        }
        .subtitle{
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
    }     

</style>