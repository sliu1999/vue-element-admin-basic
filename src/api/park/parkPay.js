import request from '@/utils/request'

const parkPayApi = {
  create:function(){

    const obj = {}



    /**
     * 新增停车场支付配置
     * @param {*} data 
     * @returns 
     */
    obj.addParkPay = function(data){
      return request({
        url:'/bootservice/api/parkPayConfs',
        method:'post',
        data:data
      })
    }

    /**
     * 修改停车场支付配置
     * @param {*} data 
     * @returns 
     */
    obj.editParkPay = function(data){
      return request({
        url:'/bootservice/api/parkPayConfs',
        method:'put',
        data:data
      })
    }

    /**
     * 获取停车场支付配置详情
     * @param {*} id 
     * @returns 
     */
    obj.getParkPayInfo = function(id){
      return request({
        url:'/bootservice/api/parkPayConfs/'+id,
        method:'get'
      })
    }


    return obj
  }


  
}.create()

export default parkPayApi

