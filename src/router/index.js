import Vue from "vue"
import VueRouter from 'vue-router'
import HellWorld from '@/components/02Cesium/01Point.vue'


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
