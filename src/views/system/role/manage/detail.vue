<template>
    <div class="mainbox">
        <el-form :model="roleInfo" ref="roleInfo" label-width="80px" label-position="right" class="demo-ruleForm padding20">
            <el-form-item label="用户名" prop="roleName">
                <div class="act-content" >{{roleInfo.roleName}}</div>
            </el-form-item>
               <el-form-item label="角色类型" prop="roleType">
                   <div v-if="roleInfo.roleName == 0" class="act-content" >可操作权限</div>
                   <div v-else class="act-content" >不可操作权限</div>
               </el-form-item>
               <el-form-item label="停车场" prop="parkId">
                     <div class="act-content" >{{roleInfo.parkName}}</div>
                </el-form-item>
            <el-form-item label="菜单权限">
                <div class="scrollDiv">
                    <el-tree :data="menuTree" node-key="id" ref="tree" :check-strictly="false"
                        :props="{ children: 'children', label: 'label' }" default-expand-all>
                    </el-tree>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import roleApi from '@/api/system/role'
import menuApi from '@/api/system/menu'

export default {
    name: "RoleDetail",
    data () {
        return {
            menuTree: null,
            width: null,
            roleInfo: {
                id: this.$route.query.roleId,
                roleId: '',
                roleName: '',
                parkId: '',
                roleType:'',
                menuIds: []
            }
        }
    },
    created: function(){
        this.init()
    },
    methods: {
        init(){
            this.getMenuTree()
            this.getRoleInfo(this.roleInfo.id)

        },
        getRoleInfo(id){
            roleApi.getRoleById(id)
                .then(res => {
                    console.log(res.data)
                    this.roleInfo = res.data
                    this.$refs.tree.setCheckedKeys(res.data.menuIds);
                })
                .catch(err => {

                })
        },
        getMenuTree(){
            menuApi.getRoleMenuTree(this.roleInfo.id)
                .then(res => {
                    this.menuTree = res.data
                })
                .catch(err => {

                })
        }
    }
}
</script>
<style scoped lang="scss">
.mainbox{
    margin: 24px;
    text-align: left;
    .act-content{
    line-height:40px;
    color:#6d6d72;
    width: 300px;
    }
    .scrollDiv {
        overflow: hidden;
        overflow-y: auto;
        height: 300px;
        width: 300px;
    }
    .modal-footer{
        width: 100%;
        text-align: right;
    }

    .modal-btn{
    display: flex;
    justify-content: center;
    }
}

</style>
