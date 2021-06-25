## 环境准备

1. 安装 `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

2. 初始化 husky:

```bash
yarn husky-init
```

## 启动项目

```bash
yarn dev
```

## 构建项目

```bash
yarn build
```

## 检测代码 lint 规则

```bash
yarn lint
```

## 测试代码

```bash
yarn test
```

## 目录结构

```
.
├── config                          // 配置目录
│   ├── config.dev.ts               // 开发环境配置
│   ├── config.ts                   // 通用配置
│   ├── defaultSettings.ts          // 主题设置
│   ├── oneapi.json                 // swagger配置
│   ├── proxy.ts                    // 代理配置
│   └── routes.ts                   // 路由配置
├── mock                            // mock
├── public                          // 静态资源
│   └── icons
├── src                             // 代码资源主目录
│   ├── components                  // 通用组件
│   ├── e2e                         // 测试
│   ├── graph                       // g6图可视化引擎
│   ├── hooks                       // 通用hooks
│   ├── http                        // http通用方法和设置
│   ├── locales                     // 国际化
│   ├── models                      // 后端接口对应models
│   ├── pages                       // 页面
│   ├── services                    // 后端接口
│   ├── utils                       // 通用工具方法
│   ├── app.tsx                     // 入口文件
│   └── global.less                 // 全局样式
└── tests
```

## 文档地址

1. [Ant Design Pro](https://pro.ant.design) （基于 Ant Design 和 umi 的封装的一整套企业级中后台前端/设计解决方案）

2. [Umi](https://umijs.org/zh-CN/docs) （前端应用框架）

3. [Ant Design ProComponents](https://procomponents.ant.design/docs/intro) （项目内带 Pro 前缀的组件都是使用的该组件库）

4. [Ant Design](https://ant.design/components/overview-cn/) （常用组件）

5. [G6](https://antv-g6.gitee.io/zh/docs/manual/introduction) （图可视化引擎）
