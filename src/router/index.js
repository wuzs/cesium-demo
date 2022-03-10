import Vue from "vue"
import VueRouter from 'vue-router'
import Main from '@/components/Main'


Vue.use(VueRouter)

const routers=[
    {
      path:"/",
      component:Main
    }

]

export default new VueRouter({
  routes:routers
})
