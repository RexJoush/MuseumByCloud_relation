/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-22 17:20:47
 * @LastEditors: zqy
 * @LastEditTime: 2021-05-06 18:57:23
 */
import request from '@/utils/request'
let baseUrl = "http://localhost:8081"

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
      nodeName: data,
    }
  })
}
export function getPodByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/pods/getPodByNameAndNamespace',
    method: 'get',
    params: {
      name: data.podName,
      namespace: data.podNamespace,
    }
  })
}

export function getPodYamlByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/pods/getPodYamlByNameAndNamespace',
    method: 'get',
    params: {
      name: data.podName,
      namespace: data.podNamespace,
    }
  })
}
export function delPodByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/pods/delPodByNameAndNamespace',
    method: 'get',
    params: {
      name: data.podName,
      namespace: data.podNamespace,
    }
  })
}
export function getCompletePodsList(data) {
  return request({
    url: baseUrl + '/pods/getCompletePodsList',
    method: 'get'
  })
}
export function createPodFromForm(data) {
  console.log(data)
  return request({
    url: baseUrl + '/pods/createPodFromForm',
    method: 'post',
    data: data,
    // params: {
    //   pod: 
      // name: data.baseImformation.name,
      // namespace: data.baseImformation.namespace,
      // image: data.baseImformation.image,

      // labels: data.seniorInformation.labels,
      // annotations: data.seniorInformation.annotations,
      // secretName
      // image
      // imagePullPolicy
      // command: JSON.stringify(data.seniorInformation.command),
      // args: data.seniorInformation.args,
      // cpuLimit: data.seniorInformation.cpuLimit,
      // cpuRequest: data.seniorInformation.cpuRequire,
      // memoryLimit: data.seniorInformation.memoryLimit,
      // memoryRequest: data.seniorInformation.memoryRequire,
      // envVar: data.seniorInformation.env,
      // amount: data.baseInformation.number,/

      
    // }
  })
}

