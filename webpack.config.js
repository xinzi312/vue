//这个配置文件通过node中的模块操作 向外暴露一个配置对象
const path=require('path')
//启用热更新的第二部
const webpack=require('webpack')

//导入在内存中生成html页面的插件
//只要是插件都一定要放到plugins节点中去
//作用：1 自动在内存中根据页面生成一个内存的页面
//     2 自动把打包好的bundle.js追加到页面中去
const htmlWebpackPlugin=require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin');


//这个配置文件 通过node中的模块操作 向外暴露了一个配置对象
module.exports={
    //手动指定入口和出口
    entry:path.join(__dirname,'./src/main.js'),//入口 表示要使用webpack打包哪个文件
    output:{
        path:path.join(__dirname,'./dist'),//指定打包好的文件 输出到哪个目录中
        filename:'bundle.js'//指定输出的文件名称
    },
    devServer:{
        open:true,//自动打开浏览器
        port:3000,//设置启动时候的运行端口
        contentBase:'src',//指定托管根目录
        hot:true//启用热更新 的第一步
    },
    plugins:[//配置插件的节点
       new webpack.HashedModuleIdsPlugin(),//new一个热更新的模块对象 这是启用热更新的第三步
       new htmlWebpackPlugin({//创建一个在内存中生成html页面的插件
           template:path.join(__dirname,'./src/index.html'),//指定模板页面 将来会根据指定的页面路径 去生成内存中的页面
           filename:'index.html'//指定的生成页面的名称
       }),
       new VueLoaderPlugin()
    ],

    //webpack处理第三方文件的过程
    //1 发现这个要处理的文件不是js文件 然后就去配置文件中 查找有没有对应的第三方loader规则
    //2 如果能找到对应的规则 就会调用loader处理 这种文件类型
    //3 在调用loader的时候 是从后往前调用的
    //4 当最后一个loader调用完毕 会把处理的结果直接交给webpack进行打包合并 最终输出到bundle.js中去

    module:{//这个节点用于配置所有的第三方模块加载器
        rules:[//所有第三方模块的匹配规则
            {test:/\.css$/,use:['style-loader','css-loader']},//匹配处理.css文件
            // 的第三方loader规则
            {test: /\.less$/,use:['style-loader','css-loader','less-loader']},

            {test: /\.scss$/,use:['style-loader','css-loader','sass-loader']},

            {test: /\.(jpg|png|gif|jpeg)$/,use:'url-loader?limit=8834&name=[hash:8]-[name].[ext]'},//limit给定的值 是图片的大小 单位是byte，
            // 如果引用的图片大于或等于给定的limit值则不会转为base64格式的字符串，如果图片小于limit则会转为base64
            //name 设置图片被编译好的名称
            //[name].[ext]让图片保留原来的名称
            //[hash:8] 为了避免使用了同名的图片 在前面加上8位的hash值

            {test: /\.(eot|ttf|svg|woff|woff2)$/,use:'url-loader'},

            //配置babel转化es6高级语法
            {test: /\.js$/,use:'babel-loader',exclude:/node_modules/},

            //出来.vue文件的配置
            {test:/\.vue$/,use:'vue-loader'}

        ],
    },
    //  设置vue被导入的路径
     resolve:{
            alias:{
                // "vue$":"vue/dist/vue.js"
            }
        }
}

//在控制台直接输入webpack执行的时候webpack做了以下几步
//1 webpack发现没有通过命令的形式 给他指定入口和出口
//2 webpack会在项目的根目录中查找一个叫做webpack.config.js的配置文件
//3 当找到配置文件后 webpack会解析执行这个配置文件 当解析完配置文件后 就得到了配置文件中导出得配置对象
//4 当webpack拿到配置对象后就拿到了配置对象中指定得入口和出口然后进行打包构建