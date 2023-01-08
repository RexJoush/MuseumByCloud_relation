/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-04-07 20:07:51
 */
import {
  changeCrdByYaml, changeCrdObjectByYaml,
  changeDeploymentByYaml,
  changeIngressesByYaml,
  changeResourceByYaml, changeServicesByYaml,
  getEventByInvolvedObjectUid
} from '@/api/common'
import { getToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
  }
}

const state = getDefaultState()

const mutations = {

}

const actions = {
  // 根据 yaml 文件编辑资源
  changeResourceByYaml({ commit }, yaml) {
    return new Promise((resolve, reject) => {
      changeResourceByYaml(yaml).then(response => {
        const { data } = response
        if (!data) {
          return reject('修改失败')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  changeDeploymentByYaml({ commit }, yaml) {
    return new Promise((resolve, reject) => {
      changeDeploymentByYaml(yaml).then(response => {
        const { data } = response
        if (!data) {
          return reject('修改失败')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  changeIngressesByYaml({ commit }, yaml) {
    return new Promise((resolve, reject) => {
      changeIngressesByYaml(yaml).then(response => {
        const { data } = response
        if (!data) {
          return reject('修改失败')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  changeServicesByYaml({ commit }, yaml) {
    return new Promise((resolve, reject) => {
      changeServicesByYaml(yaml).then(response => {
        const { data } = response
        if (!data) {
          return reject('修改失败')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 根据 yaml 文件编辑资源
  changeCrdByYaml({ commit }, yaml) {
    return new Promise((resolve, reject) => {
      changeCrdByYaml(yaml).then(response => {
        const { data } = response
        if (!data) {
          return reject('修改失败')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // changeCrdObjectByYaml
  changeCrdObjectByYaml({ commit }, yaml) {
    return new Promise((resolve, reject) => {
      changeCrdObjectByYaml(yaml).then(response => {
        const { data } = response
        if (!data) {
          return reject('修改失败')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getEventByInvolvedObjectUid({ commit }, uid) {
    return new Promise((resolve, reject) => {
      getEventByInvolvedObjectUid(uid).then(response => {
        const { data } = response
        if (!data) {
          return reject('修改失败')
        }
        resolve(data)
      }).catch(error => {
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
