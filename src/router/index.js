import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import register from '@/components/sys/register'
import login from '@/components/login'
import index from '@/components/index'
import constantTypeAdd from '@/components/constantTypeAdd.vue'
import findAllConstantType from '@/components/findAllConstantType.vue'
import findAllConstantItem from '@/components/findAllConstantItem'
import constantItemAdd from '@/components/constantItemAdd.vue'
import updateConType from '@/components/updateConType.vue'
import updateConItem from '@/components/updateConItem.vue'
import departmentFind from '@/components/departmentFind.vue'

Vue.use(Router)

export default new Router({
  routes: [
    /* {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, */

    {
      path: '/login',
      name: 'login',
      component: login
    },
    /* {
      path: '/constantTypeAdd',
      name: 'constantTypeAdd',
      component: constantTypeAdd
    },
    {
      path: '/constantItemAdd',
      name: 'constantItemAdd',
      component: constantItemAdd
    }, */
        
    {
      path: '/index',
      component: index,
      children:[

        {
          path: '/register',
          name: 'register',
          component: register
        },

        {
          path: '/findAllConstantType',
          name: 'findAllConstantType',
          component: findAllConstantType
        },
        {
          path: '/findAllConstantItem',
          name: 'findAllConstantItem',
          component: findAllConstantItem
        },
        {
          path: '/departmentFind',
          name: 'departmentFind',
          component: departmentFind
        },
        
        {
          path: '/updateConType',
          name: 'updateConType',
          component: updateConType
        },
        {
          path: '/updateConItem',
          name: 'updateConItem',
          component: updateConItem
        },
      ]
    },
  ]
})
