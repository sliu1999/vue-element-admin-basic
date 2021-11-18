import request from '@/utils/request'

const parkApiApi = {
  create:function(){

    const obj = {}



    /**
     * 新增停车场API配置
     * @param {*} data 
     * @returns 
     */
    obj.addParkPay = function(data){
      return request({
        url:'/bootservice/api/parkApiConfs',
        method:'post',
        data:data
      })
    }

    /**
     * 修改停车场API配置
     * @param {*} data 
     * @returns 
     */
    obj.editParkPay = function(data){
      return request({
        url:'/bootservice/api/parkApiConfs',
        method:'put',
        data:data
      })
    }

    /**
     * 获取停车场API配置详情
     * @param {*} parkId 
     * @returns 
     */
    obj.getParkPayInfoByParkId = function(parkId){
      return request({
        url:'/bootservice/api/parkApiConfByParkId/'+parkId,
        method:'get'
      })
    }


    return obj
  }


  
}.create()

export default parkApiApi

