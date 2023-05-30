// 查询【请填写功能名称】列表
import request from "@/js/request/request";

export function listEnv(query) {
    return request({
        url: '/ilab/env/list',
        method: 'get',
        params: query
    })
}

// 查询【请填写功能名称】详细
export function getEnv(id) {
    return request({
        url: '/ilab/env/' + id,
        method: 'get'
    })
}

// 新增【请填写功能名称】
export function addEnv(data) {
    return request({
        url: '/ilab/env',
        method: 'post',
        data: data
    })
}

// 修改【请填写功能名称】
export function updateEnv(data) {
    return request({
        url: '/ilab/env',
        method: 'put',
        data: data
    })
}

// 删除【请填写功能名称】
export function delEnv(id) {
    return request({
        url: '/ilab/env/' + id,
        method: 'delete'
    })
}

// 查询lab列表
export function listLab(query) {
    return request({
        url: '/lab/lab/list',
        method: 'get',
        params: query
    })
}

// 查询lab详细
export function getLab(id) {
    return request({
        url: '/lab/lab/' + id,
        method: 'get'
    })
}

// 新增lab
export function addLab(data) {
    return request({
        url: '/lab/lab',
        method: 'post',
        data: data
    })
}

// 修改lab
export function updateLab(data) {
    return request({
        url: '/lab/lab',
        method: 'put',
        data: data
    })
}

// 删除lab
export function delLab(id) {
    return request({
        url: '/lab/lab/' + id,
        method: 'delete'
    })
}

