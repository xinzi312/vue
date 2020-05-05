<template>
    <div class="cmt-container">
        <h3>
            发表评论
        </h3>
        <hr>
         <textarea placeholder="请输入要bb的内容" maxlength="120" v-model="msg"></textarea>
        <mt-button type='primary' size='large' @click="postComments">发表评论</mt-button>    
        <div class="cmt-list">
            <div class="cmt-item" v-for='(item,i) in comments' :key="item.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content==='undefined'?'此用户很懒':item.content}}
                </div>
            </div>
        </div>
        <mt-button type='danger' size='large' plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>    
  import {Toast} from 'mint-ui'
   export default{
       data(){
           return{
               pageIndex:1,//默认展示第一页数据
               comments:[],//所以的评论数据
               msg:''//评论输入的内容
           }
       },
       created(){
           this.getComments()
       },
        methods:{
            getComments(){
                //根据所提供的第三方接口api文档获取评论数据还要传入id值
                this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then(result=>{
                    console.log(result.body.status)
                    if(result.body.status===0){
                        //将获取的数据拼接到原来的数据后面 不覆盖原来的数据
                        this.comments=this.comments.concat(result.body.message)
                    }else{
                        Toast('获取评论失败')
                    }
                })
            },
            //加载更多
            getMore(){
                this.pageIndex++
                this.getComments()
            },
            //发表评论
            postComments(){
                //校验是否为空内容
                //trim() 函数移除字符串两侧的空白字符或其他预定义字符
                if(this.msg.trim().length===0){
                    //如果为空就return出去 后续代码不执行了
                    return Toast('评论内容不能为空')
                }
                //根据所提供的第三方接口api文档 发表评论数据还要传入id值
                this.$http.post('api/postcomment/'+this.id,
                {content:this.msg.trim()})
                .then(result=>{
                    //拼接出一个评论对象
                    var cmt={
                        user_name:'匿名用户',
                        add_time:Date.now(),
                        content:this.msg.trim()
                    };
                    this.comments.unshift(cmt)//注意 unshit不能写为this.comments=this.comments.unshift(cmt)
                    this.msg="";
                })
            }
        },
        //获取父组件的id
        props:['id']
   }
</script>

<style lang="scss" scoped>
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                background-color: #aaa;
                line-height: 30px;
            }
            .cmt-body{
                line-height: 35px;
                // 缩进
                text-indent: 2em;
            }
        }
    }
</style>