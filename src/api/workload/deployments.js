/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-27 14:23:44
 * @LastEditors: Rex Joush
 * @LastEditTime: 2022-10-29 22:21:21
 */
import request from '@/utils/request'
const baseUrl = require('../api').baseurl

export function getAllDeployments(data) {
  return request({
    url: baseUrl + '/deployments/getAllDeployments',
    method: 'get',
    params: {
      namespace: data
    }
  })
}
export function setReplica(data) {
  console.log(data)
  return request({
    url: baseUrl + '/deployments/setReplica',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace,
      replica: data.replica
    }
  })
}
export function getDeploymentByNameAndNamespace(dep) {
  return request({
    url: baseUrl + '/deployments/getDeploymentByNameAndNamespace',
    method: 'get',
    params: {
      name: dep.name,
      namespace: dep.namespace
    }
  })
}
export function getDeploymentYamlByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/deployments/getDeploymentYamlByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}
export function deleteDeploymentByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/deployments/deleteDeploymentByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}
export function getDeploymentResources(data) {
  return request({
    url: baseUrl + '/deployments/getDeploymentResources',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}

export function getAllDeploymentsName(data) {
  return request({
    url: baseUrl + '/deployments/getAllDeploymentsName',
    method: 'get',
    params: {
      namespace: data
    }
  })
}

export function changeDeploymentByYamlString(data) {
  return request({
    url: baseUrl + '/deployments/changeDeploymentByYamlString',
    method: 'post',
    data: {
      yaml: data
    }
  })
}

