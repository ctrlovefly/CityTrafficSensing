import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import naive from 'naive-ui'
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
// import cesiumsensorvolumes from 'cesium-sensor-volumes'

const app=createApp(App)
app.use(router)
.use(store)
.use(ElementPlus)
.use(VueSidebarMenu)
.use(naive)
.use(Vue3DraggableResizable)
.use(VXETable)
.mount('#app')
