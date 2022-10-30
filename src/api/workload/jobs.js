/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:18
 * @LastEditors: Rex Joush
 * @LastEditTime: 2022-10-30 19:13:25
 */
import request from '@/utils/request'
const baseUrl = require('../api').baseurl

export function getAllJobs(data) {
  return request({
    url: baseUrl + '/jobs/getAllJobs',
    method: 'get',
    params: {
      namespace: data
    }
  })
}
export function getJobByNameAndNamespace(nameAndNamespace) {
  return request({
    url: baseUrl + '/jobs/getJobByNameAndNamespace',
    method: 'get',
    params: {
      name: nameAndNamespace.name,
      namespace: nameAndNamespace.namespace
    }
  })
}
export function deleteJobByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/jobs/deleteJobByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}
export function getJobYamlByNameAndNamespace(data) {
  return request({
    url: baseUrl + '/jobs/getJobYamlByNameAndNamespace',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}
export function getJobResources(data) {
  return request({
    url: baseUrl + '/jobs/getJobResources',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}
export function getJobLogs(data) {
  console.log(data)
  return request({
    url: baseUrl + '/jobs/getJobLogs',
    method: 'get',
    params: {
      name: data.name,
      namespace: data.namespace
    }
  })
}
