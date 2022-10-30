/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-22 17:20:47
 * @LastEditors: Rex Joush
 * @LastEditTime: 2022-10-30 19:45:39
 */
import request from '@/utils/request'
const baseUrl = require('../api').baseurl

export function getAllPods(data) {
  return request({
    url: baseUrl + '/pods/getAllPods',
    method: 'get',
    params: {
      namespace: data
    }
  })
}
export function getPodsByNode(data) {
  return request({
    url: baseUrl + '/pods/getPodsByNode',
    method: 'get',
    params: {
      nodeName: data
    }
  })
}
export function getPodByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/pods/getPodByNameAndNamespace',
    method: 'get',
    params: {
      name: data.podName,
      namespace: data.podNamespace
    }
  })
}

export function getPodYamlByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/pods/getPodYamlByNameAndNamespace',
    method: 'get',
    params: {
      name: data.podName,
      namespace: data.podNamespace
    }
  })
}
export function delPodByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/pods/delPodByNameAndNamespace',
    method: 'get',
    params: {
      name: data.podName,
      namespace: data.podNamespace
    }
  })
}
export function getPodResources(data) {
  return request({
    url: baseUrl + '/pods/getPodResources',
    method: 'get',
    params: {
      name: data.podName,
      namespace: data.podNamespace
    }
  })
}
export function getCompletePodsList(data) {
  return request({
    url: baseUrl + '/pods/getCompletePodsList',
    method: 'get'
  })
}
export function getPodLogFromContainer(data) {
  return request({
    url: baseUrl + '/pods/getPodLogFromContainer',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace,
      containerName: data.containerName
    }
  })
}
export function getPodAllLogs(data) {
  return request({
    url: baseUrl + '/pods/getPodAllLogs',
    method: 'get',
    params: {
      name: data.podName,
      namespace: data.podNamespace
    }
  })
}
export function createPodFromForm(data) {
  return request({
    url: baseUrl + '/pods/createPodFromForm',
    method: 'post',
    data: data
  })
}

