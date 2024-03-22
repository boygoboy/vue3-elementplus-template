import request from "@/utils/request";

const baseUrl='/system/user'

export function getPageList(query:SysUserQuery,current=1,size=20){
    return request({
        url:`${baseUrl}/search`,
        method:'post',
        data:{...query,current,size}
    })
}

export function deleteById(id:number|string){
    return request({
        url:`${baseUrl}/${id}`,
        method:'delete'
    })
}

export function add(data:SysUserType){
    return request({
        url:`${baseUrl}`,
        method:'post',
        data
    })
}

export function update(data:SysUserType){
    return request({
        url:`${baseUrl}`,
        method:'put',
        data
    })
}