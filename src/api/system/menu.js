import request from '@/utils/request'

const menuApi = {

  create:function(){
    const obj = {}
    obj.getMenuTree=function(){
      return request({
        url: '/bootservice/api/parkMenus/treeTwo',
        method: 'get'
      })
    }

    obj.getRoleMenuTree=function(roleId){
      return request({
        url: '/bootservice/api/parkMenus/tree/'+roleId,
        method: 'get'
      })
    }

    obj.saveMenu=function(data){
      return request({
        url: '/bootservice/api/parkMenus',
        method: 'post',
        data: data
      })
    }

    obj.queryAllStairMenu=function(){
      return request({
        url: '/bootservice/api/queryAllStairMenu',
        method: 'get'
      })
    }

    obj.queryMenuInfo=function(id){
      return request({
        url: '/bootservice/api/parkMenus/'+id,
        method: 'get'
      })
    }

    obj.deleteMenuInfo=function(id){
      return request({
        url: '/bootservice/api/parkMenus/'+id,
        method: 'delete'
      })
    }
    return obj
  }
}.create()

export default menuApi

