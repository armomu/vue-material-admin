<p align="center">
  <img width="200" src="https://gitee.com/chenhuajie/vue-material-admin/raw/master/src/assets/admin-logo.png">
</p>

<h1 align="center">
    Vue Material Admin
<div align="center">

![version](https://img.shields.io/badge/Vue-3.x-blue.svg)
![version](https://img.shields.io/badge/Vuetify-3.5.x-red.svg)
![version](https://img.shields.io/badge/Vite-5.x-green.svg)
![version](https://img.shields.io/badge/Nestjs-10.x-blue.svg)
![stars](https://img.shields.io/github/stars/armomu/vue-material-admin.svg?style=social&label=Stars)

</div>

</h1>


Vue Material Admin 是一个基于 `Vuetify.js` 组件库的开源中后台模板，采用了服务器端 + 前端全栈TypeScript技术开发，该项目遵循 [Material Design](https://m3.material.io/) 的设计规范，并在 [Vuetify.js](https://vuetifyjs.com/zh-Hans/) 基础组件继续向上构建开发，对其进行了扩展和优化，旨在实现一个简洁、轻量化的中后台解决方案，Vue Material Admin 目前阶段主要用于学习、功能展示和开发用例测试，同时也适合作为新项目的启动模板，项目将持续更新，增加更多的功能和优化现有的模块，有问题没问题都可以提 [Issue](https://github.com/armomu/vue-material-admin/issues) 聊天交流 💭💭💭


## ⛲ 技术栈
### WEB 前端 
- 框架: Vue3                                     
- 状态管理: Pinia
- 类型系统: TypeScript
- UI 组件库: Vuetify.js

### Nodejs 服务端
- 框架: Nest.js
- 数据库: MySQL（对象映射工具 TypeORM ）
- 缓存: Redis

## 🌻 页面截图

<p align="center">
  <img width="49%" src="https://github.com/armomu/vue-material-admin/raw/master/src/assets/tesla.png">
  <img width="49%" src="https://github.com/armomu/vue-material-admin/raw/master/src/assets/smart_house.png">
  <img width="49%" src="https://github.com/armomu/vue-material-admin/raw/master/src/assets/edit_layer.png">
  <img width="49%" src="https://github.com/armomu/vue-material-admin/raw/master/src/assets/babylonjs.png">
</p>

## 🍭 PreView

Vercel需要🪜子！打不开的同学自行下载项目在本地开发环境预览

- 🌍 Vercel [https://vue-material-admin.vercel.app/](https://vue-material-admin-alpha.vercel.app/)


## 👊 TODO

1. 🍳 Vuetify 组件
    - ✅ Table
    - ✅ Calendar
    - ✅ DictSelect(自动注册可枚举字典下拉框)
    - ❌ 日期选择器
    - ❌ 全局加载效果Api
2. 🏡 智能家居控制组件
    - ✅ 环形控制器(支持鼠标拖动进度)
    - ✅ 360度全景图预览(其实是Babylon.js的一个API而已)
3. 🔥 [Pixi.js捕鱼DEMO](https://chenhuajie.gitee.io/vue-material-admin/#/graphics/pixijs) 
    - ✅ 小鱼自动移动
    - ✅ 射击撒网
    - ❌ 小鱼获取新位置后旋转对应角度方向
    - ❌ 击落效果获取金币
    - ❌ 音频
4. 🐝 适配
    - ✅ 夜间模式
    - ✅ 适配移动设备(大部分适配)
    - ✅ 主题颜色修改
5. 💻 后端 Node.js
    - ✅ Nest.js
    - ✅ MySQL + TypeORM
    - ✅ JWT + RBAC 权限控制

## 📑 本地开发

### 前端

由于已经是配套了 `Nodejs` 服务端，本地开发环境接口使用了 [`apifoxmock`](https://nliq7vrniv.apifox.cn)模拟了服务器全部都接口，所以 `.env.development` 文件需要配置接口服务器地址 `VITE_API = https://apifoxmock.com/m1/5061937-4723200-default` 

如果想和服务端一起开发预览，请切换到 [Serve](https://github.com/armomu/vue-material-admin/tree/serve) 分支查看启动服务端教程，然后把 `.env.development` 文件服务器地址改为 `VITE_API = http://localhost:8085` 

```
git clone https://github.com/armomu/vue-material-admin.git

cd vue-material-admin

pnpm install

pnpm run dev

```

> ⚠️ 本地开发需要 `nodejs 18/20` vite5不支持更低的nodejs版本



### Nodejs 服务端

接口文档 [https://nliq7vrniv.apifox.cn](https://nliq7vrniv.apifox.cn)

> 非常感谢 [zclzone](https://github.com/zclzone)大佬提供的Nestjs服务项目，让我快速搭建了这个模版的后台服务，也从[vue-naive-admin](https://github.com/zclzone/vue-naive-admin)项目中学习到了一些新的封装思路

后端服务启动请切换到 [Serve](https://github.com/armomu/vue-material-admin/tree/serve) 分支查看教程

