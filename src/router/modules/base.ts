// 账户管理 路由
const statementRouter = [
  {
    path: '/role',
    name: 'role',
    component: () => import('@/views/base/role/index.vue'),
    meta: {
      title: '角色管理',
      activePath: '/role'
    }
  },
  {
    path: '/role/add',
    name: 'role/add',
    component: () => import('@/views/base/role/add.vue'),
    meta: {
      title: '角色管理-添加',
      activePath: '/role'
    }
  },
  {
    path: '/role/edit',
    name: 'role/edit',
    component: () => import('@/views/base/role/add.vue'),
    meta: {
      title: '角色管理-编辑',
      activePath: '/role'
    }
  },
  {
    path: '/base/mock',
    name: 'base/mock',
    component: () => import('@/views/base/mock/index.vue'),
    meta: {
      title: 'mock数据',
      activePath: '/base/mock'
    }
  }
]

export default statementRouter
