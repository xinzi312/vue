<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
					    <mt-switch 
                        v-model="$store.getters.getGoodsSelect[item.id]"
                        @change="seletedChange(item.id,$store.getters.getGoodsSelect[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <!-- 传递购物车的商品数量 -->
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- 如何从购物车中获取商品的数量 -->
                                <!-- 1 可以先创建一个空对象 然后循环购物车中所有的商品的数据 把当前循环
                                这条商品的id,作为对象的属性名 count值作为对象的属性值 这样 把所有的商品循环
                                一遍 就会得到一个对象 {88:2,89:1,90:4} -->
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
               
		</div>
        
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
                            <p>总计 (不含运费)</p>
                            <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，
                            总价 <span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                        </div>
                        <mt-button type="danger">结算</mt-button>
					</div>
                 
				</div>
		 </div>    

     </div>
  </div>
</template>

<script>
  import numbox from '../sub/shopcarbox.vue'
  export default{
      data(){
          return{
              goodslist:[]
          }
      },
      created(){
          this.getGoodsList()
      },
      methods:{
          getGoodsList(){
              var idArr=[];
              this.$store.state.car.forEach(item =>idArr.push(item.id))
                
              if(idArr.length==0){
                  return
              }
              //获取购物车商品列表
              this.$http.get('api/goods/getshopcarlist/'+idArr.join(",")).then(result=>{
                  if(result.body.status==0){
                     this.goodslist=result.body.message
                  }
              });
          },
          remove(id,index){
              //点击删除 把商品从store中根据传递的id删除 同时把当前组件中的goodslist中对应要删除的那个
              //商品通过index来删除
              this.goodslist.splice(index,1)
              this.$store.commit("removeFormCar",id)
          },
          seletedChange(id,value){//value为true或false
              //每当点击开关把最新的开关状态 同步到store中
              this.$store.commit('updateGoodsSelected',{id,selected:value})
              console.log(value)
          }
      },
      components:{
          numbox
      }
  }
</script>

<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            width: 60px;
            height: 60px;
        }
        h1{
            font-size: 13px;
        }
        .info{
            .price{
                color: red;
                font-size: bold;
            }
        }
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red{
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }

}
</style>