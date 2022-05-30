import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import store from './store'
import App from './App.vue'
import './assets/styles/index.scss'
import './assets/styles/element-plus.scss'
import './assets/styles/element-theme.scss'

const app = createApp(App)

import { ElButton, ElInfiniteScroll, ElLoading, ElMessage, ElMessageBox } from 'element-plus'

// element-plus 全局组件
app.component(ElButton.name, ElButton)
const plugins = [ElInfiniteScroll, ElLoading, ElMessage, ElMessageBox]
plugins.forEach((plugin) => {
  app.use(plugin)
})

// 注册自定义全局组件
const components: any = import.meta.globEager('./components/**/*.vue')
Object.keys(components).forEach((key: string) => {
  const component = components[key].default
  // 如果组件内定义name 则需要全局引用的
  if (component.name) {
    app.component(component.name, component)
  }
})

// 统一注册Icon图标
import * as ElIconModules from '@element-plus/icons-vue'
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName]
    app.component(iconName, item)
  }
}
// // 全局属性
// const $imgcdn = 'https://'
// app.provide('imgcdn', $imgcdn)

app.use(router).use(store).use(createPinia()).mount('#app')
