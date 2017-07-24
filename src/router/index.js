import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Rank from 'components/rank/rank'
import Singer from 'components/singer/singer'
import Search from 'components/search/search'
import singerDetail from 'components/singerDetail/singerdetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: singerDetail
        }
      ]
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
