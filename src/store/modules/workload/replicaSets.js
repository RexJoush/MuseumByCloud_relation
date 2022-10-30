/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:26
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-15 20:36:01
 */
import {
  getReplicaSetLogs,
  getAllReplicaSets,
  getReplicaSetByNameAndNamespace,
  getReplicaSetYamlByNameAndNamespace,
  deleteReplicaSetByNameAndNamespace,
  getReplicaSetResources
} from '@/api/workload/replicaSets'
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

}

const actions = {

  // getAllReplicaSets
  getAllReplicaSets({ commit }, namespace) {
    return new Promise((resolve, reject) => {
      getAllReplicaSets(namespace).then(response => {
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

  // getReplicaSetByNameAndNamesapce
  getReplicaSetByNameAndNamespace({ commit }, dep) {
    return new Promise((resolve, reject) => {
      getReplicaSetByNameAndNamespace(dep).then(response => {
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

  // 通过名字和命名空间获取 Yaml 格式的 ReplicaSet
  getReplicaSetYamlByNameAndNamespace({ commit }, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      getReplicaSetYamlByNameAndNamespace(nameAndNamespace).then(response => {
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

  // 通过名字和命名空间删除 ReplicaSet
  deleteReplicaSetByNameAndNamespace({ commit }, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      deleteReplicaSetByNameAndNamespace(nameAndNamespace).then((response) => {
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

  // 通过名字和命名空间查找 ReplicaSet 相应资源
  getReplicaSetResources({ commit }, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      getReplicaSetResources(nameAndNamespace).then((response) => {
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

  // 获取 ReplicaSet 所有日志
  getReplicaSetLogs({ commit }, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      getReplicaSetLogs(nameAndNamespace).then((response) => {
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
