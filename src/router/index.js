import Vue from "vue"
import VueRouter from 'vue-router'
import HellWorld from '@/components/07Cesium/3DTileset'


Vue.use(VueRouter)

const routers=[
    {
      path:"/",
      component:HellWorld
    }

]

export default new VueRouter({
  routes:routers
})
