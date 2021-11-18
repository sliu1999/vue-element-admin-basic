import request from '@/utils/request'

const roleApi = {
  create:function(){

    const obj = {}
    /**
     * 获取所有角色下拉列表
     * @param {}} data 
     * @returns 
     */
    obj.getAllRole = function(){
      return request({
        url: '/bootservice/api/parkRoles/getAllRole',
        method: 'get'
      })
    }

    obj.saveRole = function(data){
      return request({
        url:'/bootservice/api/parkRoles',
        method:'post',
        data:data
      })
    }
    obj.updateRole = function(data){
      return request({
        url:'/bootservice/api/parkRoles',
        method:'put',
        data:data
      })
    }
    

    /**
     * 获取角色分页
     * @param {} data 
     * @returns 
     */
    obj.getRolePage = function(data){
      return request({
        url: '/bootservice/api/parkRoles',
        method: 'get',
        params: data
      })
    }

    /**
     * 获取角色详情
     * @param {}} id 
     * @returns 
     */
    obj.getRoleById = function(id){
      return request({
        url: '/bootservice/api/parkRoles/'+id,
        method: 'get'
      })
    }

    /**
     * 删除角色
     * @param {} id 
     * @returns 
     */
    obj.delRoleById = function(id){
      return request({
        url: '/bootservice/api/parkRoles/'+id,
        method: 'delete'
      })
    }


    return obj
  }
  
}.create()

export default roleApi

