/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:25
 * @LastEditors: Rex Joush
 * @LastEditTime: 2022-10-30 19:05:26
 */
import {
  getAllDaemonSets,
  getDaemonSetByNameAndNamespace,
  deleteDaemonSetByNameAndNamespace,
  getDaemonSetYamlByNameAndNamespace,
  getDaemonSetResources,
  createOrReplaceDaemonSetByYaml,
  getDaemonSetLogs, changeDaemonSetByYamlString
} from '@/api/workload/daemonSets'
import { getToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  // 跳转 deployment 详情页面
  TO_DAEMON_SET_DETAILS: (state, { daemonSet }) => {
    // 赋值
    state.daemonSet.daemonSetName = daemonSet.name
    state.daemonSet.daemonSetNamespace = daemonSet.namespace
  }
}

const actions = {

  // getAllDaemonSets
  getAllDaemonSets({ commit }, namespace) {
    return new Promise((resolve, reject) => {
      getAllDaemonSets(namespace).then(response => {
        const { data } = response
        if (!data) {
          return reject('获取失败')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 通过名字和命名空间获取 DaemonSet
  getDaemonSetByNameAndNamespace({ commit }, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      getDaemonSetByNameAndNamespace(nameAndNamespace).then(response => {
        const { data } = response
        if (!data) {
          return reject('获取失败')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 通过名字和命名空间删除 DaemonSet
  deleteDaemonSetByNameAndNamespace({ commit }, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      deleteDaemonSetByNameAndNamespace(nameAndNamespace).then((response) => {
        const { data } = response
        if (!data) {
          return reject('删除失败')
        }
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  // 通过名字和命名空间获取 Yaml 格式的 DaemonSet
  getDaemonSetYamlByNameAndNamespace({ commit }, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      getDaemonSetYamlByNameAndNamespace(nameAndNamespace).then(response => {
        const { data } = response
        if (!data) {
          return reject('获取失败')
        }
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  // 通过名字和命名空间获取 DaemonSet 和 DaemonSet 管理的 相应资源
  getDaemonSetResources({ commit }, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      getDaemonSetResources(nameAndNamespace).then(response => {
        const { data } = response
        if (!data) {
          return reject('获取失败')
        }
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  createOrReplaceDaemonSetByYaml({ commit }, yaml) {
    return new Promise((resolve, reject) => {
      createOrReplaceDaemonSetByYaml(yaml).then(response => {
        const { data } = response
        if (!data) {
          return reject('创建失败')
        }
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  getDaemonSetLogs({ commit }, yaml) {
    return new Promise((resolve, reject) => {
      getDaemonSetLogs(yaml).then(response => {
        const { data } = response
        if (!data) {
          return reject('创建失败')
        }
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  changeDaemonSetByYamlString({ commit }, yamlData) {
    return new Promise((resolve, reject) => {
      changeDaemonSetByYamlString(yamlData).then((response) => {
        const { data } = response
        if (!data) {
          return reject('修改失败')
        }
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  toDetails({ commit }, dep) {
    commit('TO_DAEMON_SET_DETAILS', dep)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
