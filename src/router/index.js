/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-10 15:03:17
 * @LastEditors: Rex Joush
 * @LastEditTime: 2022-11-05 14:51:33
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [

  // 登录页
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  // 404 页面
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 集群信息
  {
    path: '/',
    component: Layout,
    redirect: '/summary',
    children: [
      {
        path: 'summary',
        name: '集群信息',
        component: () => import('@/views/summary/index'),
        meta: { title: '集群信息', icon: 'summary' }
      },
      {
        path: 'summary/nodes/:name',
        component: () => import('@/views/summary/details/Node/index'),
        name: 'Node Details',
        meta: { title: '节点详情', noCache: true, activeMenu: '/summary' },
        hidden: true
      },
      {
        path: 'summary/namespaces/:name',
        component: () => import('@/views/summary/details/Namespace/index'),
        name: 'Namespace Details',
        meta: { title: '命名空间详情', noCache: true, activeMenu: '/summary' },
        hidden: true
      },
      {
        path: 'summary/clusterroles/:name',
        component: () => import('@/views/summary/details/ClusterRole/index'),
        name: 'Cluster Roles Details',
        meta: { title: '集群角色详情', noCache: true, activeMenu: '/summary' },
        hidden: true
      }
    ]
  },

  // 工作负载
  {
    path: '/workload',
    component: Layout,
    redirect: '/workload/CronJobs',
    name: '工作负载',
    meta: { title: '工作负载', icon: 'workload' },
    children: [
      {
        path: 'cronjobs',
        name: 'Cron Jobs',
        component: () => import('@/views/workload/CronJobs/index'),
        meta: { title: '定时任务', icon: 'cron-jobs' }
      },
      // cronjob 详情
      {
        path: 'cronjob/:name',
        component: () => import('@/views/workload/CronJobs/details/index'),
        name: 'CronJob 详情',
        meta: { title: '定时任务详情', noCache: true, activeMenu: '/cronjobs' },
        hidden: true,
        props: true
      },
      {
        path: 'daemonsets',
        name: 'Daemon Sets',
        component: () => import('@/views/workload/DaemonSets/index'),
        meta: { title: '守护进程集', icon: 'daemon-sets' }
      },
      // daemonset 详情
      {
        path: 'daemonset/:name',
        component: () => import('@/views/workload/DaemonSets/details/index'),
        name: 'DaemonSet Details',
        meta: { title: '守护进程集详情', noCache: true, activeMenu: '/daemonsets' },
        hidden: true
      },
      {
        path: 'deployments',
        name: 'Deployments',
        component: () => import('@/views/workload/Deployments/index'),
        meta: { title: '部署', icon: 'deployments' },
      },
      // deployment 详情
      {
        path: 'deployment/:name',
        component: () => import('@/views/workload/Deployments/details/index'),
        name: 'Deployment 详情',
        meta: { title: '部署详情', noCache: true, activeMenu: '/deployments' },
        hidden: true,
        props: true
      },
      {
        path: 'jobs',
        name: 'Jobs',
        component: () => import('@/views/workload/Jobs/index'),
        meta: { title: '任务', icon: 'jobs' }
      },
      // job 详情
      {
        path: 'job/:name',
        component: () => import('@/views/workload/Jobs/details/index'),
        name: 'Job 详情',
        meta: { title: '任务详情', noCache: true, activeMenu: '/jobs' },
        hidden: true,
        props: true
      },
      {
        path: 'pods',
        name: 'Pods',
        component: () => import('@/views/workload/Pods/index'),
        meta: { title: '容器组', icon: 'pods' }
      },
      // pod 详情
      {
        path: 'pods/:name',
        component: () => import('@/views/workload/Pods/details/index'),
        name: 'Pods 详情',
        meta: { title: '容器组详情', noCache: true, activeMenu: '/pods' },
        hidden: true

      },
      // pod 详情
      {
        path: 'pods/:name([a-z0-9-]+)',
        component: () => import('@/views/workload/Pods/details/index'),
        name: 'Pods 详情',
        meta: { title: 'Pods Details', noCache: true, activeMenu: '/pods' },
        hidden: true
      },
      {
        path: 'replicasets',
        name: 'Replica Sets',
        component: () => import('@/views/workload/ReplicaSets/index'),
        meta: { title: '副本集', icon: 'replica-sets' }
      },
      // replicaset 详情
      {
        path: 'replicaset/:name',
        component: () => import('@/views/workload/ReplicaSets/details/index'),
        name: 'ReplicaSet Details',
        meta: { title: '副本集详情', noCache: true, activeMenu: '/replicasets' },
        hidden: true,
        props: true
      },
      {
        path: 'replicationcontrollers',
        name: 'Replication Controllers',
        component: () => import('@/views/workload/ReplicationControllers/index'),
        meta: { title: '副本控制器', icon: 'replication-controllers' }
      },
      // replicationcontroller 详情
      {
        path: 'replicationcontroller/:name',
        component: () => import('@/views/workload/ReplicationControllers/details/index'),
        name: 'ReplicationController Details',
        meta: { title: '副本控制器详情', noCache: true, activeMenu: '/replicationcontrollers' },
        hidden: true,
        props: true
      },
      {
        path: 'statefulsets',
        name: 'Stateful Sets',
        component: () => import('@/views/workload/StatefulSets/index'),
        meta: { title: '有状态副本集', icon: 'stateful-sets' }
      },
      // statefulset 详情
      {
        path: 'statefulset/:name',
        component: () => import('@/views/workload/StatefulSets/details/index'),
        name: 'Statefulset Details',
        meta: { title: '有状态副本集详情', noCache: true, activeMenu: '/statefulsets' },
        hidden: true,
        props: true
      },
    ]
  },

  // 发现与负载均衡
  {
    path: '/explorebalancing',
    component: Layout,
    redirect: '/explorebalancing/Ingresses',
    name: '服务发现与负载均衡',
    meta: { title: '服务发现与负载均衡', icon: 'explore-balancing' },
    children: [
      {
        path: 'ingresses',
        name: 'Ingresses',
        component: () => import('@/views/ExploreBalancing/Ingresses/index'),
        meta: { title: '负载均衡器', icon: 'ingresses' }
      },
      // ingresses 详情
      {
        path: 'ingresses/:name',
        component: () => import('@/views/ExploreBalancing/Ingresses/details/index'),
        name: 'Ingress Details',
        meta: { title: '负载均衡器详情', noCache: true, activeMenu: '/ingresses' },
        hidden: true
      },
      {
        path: 'services',
        name: 'Services',
        component: () => import('@/views/ExploreBalancing/Services/index'),
        meta: { title: '服务', icon: 'services' }
      },
      // services 详情
      {
        path: 'services/:name',
        component: () => import('@/views/ExploreBalancing/Services/details/index'),
        name: 'Services Details',
        meta: { title: '服务详情', noCache: true, activeMenu: '/services' },
        hidden: true
      }
    ]
  },

  // 配置和存储
  {
    path: '/settingstorage',
    component: Layout,
    redirect: '/settingstorage/configmaps',
    name: '配置与存储',
    meta: { title: '配置与存储', icon: 'setting-storage' },
    children: [
      {
        path: 'configmaps',
        name: 'Config Maps',
        component: () => import('@/views/SettingStorage/ConfigMaps/index'),
        meta: { title: '配置字典', icon: 'config-maps' }
      },
      // -----configMap 详情
      {
        path: 'configmaps/:name([a-z0-9-.]+)',
        component: () => import('@/views/SettingStorage/ConfigMaps/details/index'),
        name: 'Config Map Details',
        meta: { title: '配置字典详情', noCache: true, activeMenu: '/configmaps' },
        hidden: true
      },
      {
        path: 'persistentvolumeclaims',
        name: 'Persistent Volume Claims',
        component: () => import('@/views/SettingStorage/PersistentVolumeClaims/index'),
        meta: { title: '持久化存储卷', icon: 'persistent-volume-claims' }
      },
      //------- persistentvolumeclaims 详情
      {
        path: 'persistentvolumeclaims/:name([a-z0-9-.]+)',
        component: () => import('@/views/SettingStorage/PersistentVolumeClaims/details/index'),
        name: 'PersistentVolumeClaims Details',
        meta: { title: '持久化存储卷详情', noCache: true, activeMenu: '/persistentvolumeclaims' },
        hidden: true
      },
      {
        path: 'secrets',
        name: 'Secrets',
        component: () => import('@/views/SettingStorage/Secrets/index'),
        meta: { title: '密钥', icon: 'secrets' }
      },
      //-------- Secrets 详情
      {
        path: 'secrets/:name([a-z0-9-.]+)',
        component: () => import('@/views/SettingStorage/Secrets/details/index'),
        name: 'Secrets Details',
        meta: { title: '密钥详情', noCache: true, activeMenu: '/secrets' },
        hidden: true
      }
    ]
  },

  // 自定义资源
  {
    path: '/customize',
    component: Layout,
    redirect: '/customize',
    children: [
      {
        path: 'customize',
        name: '自定义资源',
        component: () => import('@/views/customize/index'),
        meta: { title: '自定义资源', icon: 'customize' }
      },
      // 自定义资源详情
      {
        path: ':name([a-z0-9-.]+)',
        component: () => import('@/views/customize/details/index'),
        name: 'Customize Details',
        meta: { title: '自定义资源详情', noCache: true, activeMenu: '/customize' },
        hidden: true
      },
      // Object详情
      {
        path: 'details/object/:name([a-z0-9-.]+)',
        component: () => import('@/views/customize/details/object/index'),
        name: '自定义资源对象详情',
        meta: { title: 'Object Details', noCache: true, activeMenu: '/customize' },
        hidden: true
      },

    ]
  },

  //负载预测
  // {
  //   path: '/loadforecasting',
  //   component: Layout,
  //   redirect: '/loadforecasting',
  //   children: [{
  //     path: 'loadforecasting',
  //     name: '负载预测',
  //     component: () => import('@/views/LoadForecasting/index'),
  //     meta: { title: '负载预测', icon: 'load-forecasting' }
  //   }]
  // },
  //边缘节点
  {
    path: '/edge',
    component: Layout,
    redirect: '/edge',
    children: [
      {
        path: 'edge',
        name: '边缘节点',
        component: () => import('@/views/edge/index'),
        meta: { title: '边缘节点', icon: 'edge' }
      },
      {
        path: 'edgenodes/:name',
        component: () => import('@/views/edge/details/index'),
        name: 'Edge Node Details',
        meta: { title: '边缘节点详情', noCache: true, activeMenu: '/edge' },
        hidden: true
      },
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://172.18.7.41:30014',
        meta: { title: '边缘计算平台', icon: 'link' }
      }
    ]
  },
  // 创建资源
  {
    path: '/establish',
    component: Layout,
    redirect: '/establish',
    children: [{
      path: 'establish',
      name: '创建资源',
      component: () => import('@/views/establish/index'),
      meta: { title: '创建资源', icon: 'establish' }
    }]
  },
  //可视化
  // {
  //   path: '/visualization',
  //   component: Layout,
  //   redirect: '/visualization',
  //   children: [{
  //     path: 'visualization',
  //     name: '可视化',
  //     component: () => import('@/views/visualization/index'),
  //     meta: { title: '可视化', icon: 'visualization'}
  //   }],
  //   hidden: false
  // },
  // 容器管理
  {
    path: '/image',
    component: Layout,
    redirect: '/image',
    children: [
      {
        path: 'image',
        name: '镜像管理',
        component: () => import('@/views/image/index'),
        meta: { title: '镜像管理', icon: 'image' }
      },
      {
        path: ':id',
        component: () => import('@/views/image/details/index'),
        name: '镜像详情',
        meta: { title: '镜像详情', noCache: true, activeMenu: '/image' },
        hidden: true
      },
    ]
  },
  // 用户管理
  // {
  //   path: '/account',
  //   component: Layout,
  //   redirect: '/account',
  //   children: [{
  //     path: 'account',
  //     name: '用户管理',
  //     component: () => import('@/views/account/index'),
  //     meta: { title: '用户管理', icon: 'account' }
  //   }]
  // },
  // 个人信息
  // {
  //   path: '/information',
  //   component: Layout,
  //   redirect: '/information',
  //   children: [{
  //     path: 'information',
  //     name: '个人信息',
  //     component: () => import('@/views/information/index'),
  //     meta: { title: '个人信息', icon: 'information' }
  //   }]
  // },

  // 关于
  {
    path: '/about',
    component: Layout,
    redirect: '/about',
    children: [{
      path: 'about',
      name: '关于',
      component: () => import('@/views/about/index'),
      meta: { title: '关于', icon: 'about' }
    }]
  },
  // {
  //   path: '/table',
  //   component: Layout,
  //   redirect: '/table',
  //   children: [{
  //     path: 'table',
  //     name: 'Table',
  //     component: () => import('@/views/table/index'),
  //     meta: { title: 'Table', icon: 'table' }
  //   }]
  // },
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
