import Vue from "vue"
import VueRouter from 'vue-router'
import HellWorld from '@/components/01cesium入门/HelloWorld.vue'


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
