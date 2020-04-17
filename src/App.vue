<template>
   <div class="app-container">
      <!-- 顶部header区域 -->
      <!-- 引入mint-ui的header -->
      <mt-header fixed title="欣子的商城"></mt-header>

      <!-- 中间的路由router-view区域 -->
	  <transition>
		  <router-view></router-view>
	  </transition>
	  
      <!-- 底部tabber区域 -->
      <!-- 复制MUI的代码片段 -->
      <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact">
					
				</span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<!-- 使用MUI icon-extra的图标类名 -->
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge">0</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
      <!-- <h1>app组件</h1> -->
   </div>

</template>
<script>

</script>

<style lang="scss" scoped>
    .app-container{
       padding-top:40px;
	   overflow-x: hidden;//将向左滑动时超出屏幕宽度的那一部分隐藏 
	             //不然 顶部的header和底部tabbar都会被右侧进来的组件挤走并出现滚动条
    }

	// 设置中间区域的动画滑动效果
	//此时v-enter和v-leave-to要分开写 不然页面会从右侧进入从右侧消失
	.v-enter
	{
		opacity: 0;
		transform: translateX(100%);
	}
	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;//防止页面进入时会往从下往上飘
	}
	.v-enter-active,
	.v-leave-active{
		transition: all 0.5s ease;
	}
</style>
