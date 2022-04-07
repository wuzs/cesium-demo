import Vue from "vue"
import VueRouter from 'vue-router'
import HellWorld from '@/components/03Cesium/Material.vue'


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
