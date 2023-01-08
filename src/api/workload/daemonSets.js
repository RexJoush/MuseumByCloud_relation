/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:18
 * @LastEditors: Rex Joush
 * @LastEditTime: 2022-10-30 19:05:16
 */
import request from '@/utils/request'
const baseUrl = require('../api').baseurl

export function getAllDaemonSets(data) {
  return request({
    url: baseUrl + '/daemonSets/getAllDaemonSets',
    method: 'get',
    params: {
      namespace: data
    }
  })
}
export function getDaemonSetByNameAndNamespace(nameAndNamespace) {
  return request({
    url: baseUrl + '/daemonSets/getDaemonSetByNameAndNamespace',
    method: 'get',
    params: {
      name: nameAndNamespace.name,
      namespace: nameAndNamespace.namespace
    }
  })
}
export function deleteDaemonSetByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/daemonSets/deleteDaemonSetByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}
export function getDaemonSetYamlByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/daemonSets/getDaemonSetYamlByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}
export function getDaemonSetResources(data) {
  // console.log(data, "in api")
  return request({
    url: baseUrl + '/daemonSets/getDaemonSetResources',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}
export function createOrReplaceDaemonSetByYaml(data) {
  // console.log(data, "in api")
  return request({
    url: baseUrl + '/daemonSets/createOrReplaceDaemonSetByYaml',
    method: 'post',
    data: data
  })
}
export function getDaemonSetLogs(data) {
  return request({
    url: baseUrl + '/daemonSets/getDaemonSetLogs',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}
export function changeDaemonSetByYamlString(data) {
  return request({
    url: baseUrl + '/daemonSets/changeDaemonSetByYamlString',
    method: 'post',
    data: {
      yaml: data
    }
  })
}
