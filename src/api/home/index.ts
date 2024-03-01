import request from "@/utils/request";

export function getStatisticData(){
    return request({
        url:'/home/statistics',
        method:'get'
    })
}

export function getCategoryData(){
    return request({
        url:'/home/categoryData',
        method:'get'
    })
}

export function getLast30DaysData(){
    return request({
        url:'/home/30days/saleData',
        method:'get'
    })
}

export function getMemberTop10Data(){
    return request({
        url:'/home/member/top10',
        method:'get'
    })
}