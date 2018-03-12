import Vue from 'vue'
import Router from 'vue-router'
import Negotiation from '@/components/Negotiation'
import Employer from '@/components/Negotiation/Employer'
import Employee from '@/components/Negotiation/Employee'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/negotiation/employer'
    },
    {
      path: '/negotiation',
      name: 'negotiation',
      component: Negotiation,
      meta: {
        defaultChildRoute: 'Employer'
      },
      children: [
        {
          path: 'employer',
          name: 'Employer',
          component: Employer
        },
        {
          path: 'employee',
          name: 'Employee',
          component: Employee
        }
      ]
    }
  ]
})
