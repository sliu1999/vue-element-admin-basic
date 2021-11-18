import request from '@/utils/request'

const parkApi = {
  create:function(){

    const obj = {}
    /**
     * 获取所有角色下拉列表
     * @param {}} data 
     * @returns 
     */
    obj.getAllPark = function(){
      return request({
        url: '/bootservice/api/parks/getAllPark',
        method: 'get'
      })
    }

    /**
     * 获取停车场分页
     * @param {} param 
     * @returns 
     */
    obj.getParkList = function(param){
      return request({
        url:'/bootservice/api/parks',
        method:'get',
        params:param
      })
    }

    /**
     * 获取充值用户列表
     * @param {*} param 
     * @returns 
     */
    obj.getParkUserList = function(param){
      return request({
        url:'/bootservice/api/parks/parkUser',
        method:'get',
        params:param
      })
    }

    /**
     * 新增停车场
     * @param {*} data 
     * @returns 
     */
    obj.addPark = function(data){
      return request({
        url:'/bootservice/api/parks',
        method:'post',
        data:data
      })
    }

    /**
     * 修改停车场
     * @param {*} data 
     * @returns 
     */
    obj.editPark = function(data){
      return request({
        url:'/bootservice/api/parks',
        method:'put',
        data:data
      })
    }

    /**
     * 获取停车场详情
     * @param {*} id 
     * @returns 
     */
    obj.getParkInfo = function(id){
      return request({
        url:'/bootservice/api/parks/'+id,
        method:'get'
      })
    }

    /**
     * 删除停车场
     * @param {*} id 
     * @returns 
     */
    obj.delPark=function(id){
      return request({
        url:'/bootservice/api/parks/'+id,
        method:'delete'
      })
    }

    /**
     * 更新停车场基本配置
     * @param {*} data 
     * @returns 
     */
    obj.updateParkConf=function(data){
      return request({
        url:'/bootservice/api/updParkConf',
        method:'post',
        data:data
      })
    }

    obj.getParkConfInfoByParkId = function(parkId){
      return request({
        url:'/bootservice/api/getParkConf/'+parkId,
        method:'get'
      })
    }


    return obj
  }


  
}.create()

export default parkApi

