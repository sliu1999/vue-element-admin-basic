<template>
    <div>
        <el-dialog :visible.sync="editRoleModel" @close="closeDialog()" :close-on-click-modal="false" :modal-append-to-body="false" title="修改角色" :width="width">
            <el-form :model="editRoleInfo" :rules="rules" ref="editRoleInfo" label-position="top" class="demo-ruleForm padding20">
                 <el-form-item label="用户名" prop="roleName">
                    <el-input placeholder="请输入角色名" v-model="editRoleInfo.roleName"></el-input>
                </el-form-item>
               <el-form-item label="角色类型" prop="roleType">
                    <el-select v-model="editRoleInfo.roleType" placeholder="请选择角色类型">
                        <el-option v-for="item in roleTypeList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
               </el-form-item>
               <el-form-item label="停车场" prop="parkId">
                     <el-select v-model="editRoleInfo.parkId" placeholder="请选择">
                        <el-option
                        v-for="item in parkList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单权限">
                    <div class="scrollDiv">
                        <el-tree :data="menuTree" show-checkbox node-key="id" ref="tree" :check-strictly="false" width="500px"
                         :props="{ children: 'children', label: 'label' }"
                         @check-change="handleCheckChange"
                         @node-click="handleNodeClick">
                        </el-tree>
                    </div>
                </el-form-item>
                <el-form-item class="modal-footer">
                    <div class="modal-btn">
                        <el-button type="primary" style="background: #25BE88;border-color: #25BE88;" @click="save()">提交</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<style>
.scrollDiv {
    overflow: hidden;
    overflow-y: auto;
    height: 300px;
}
</style>
<script>
import roleApi from '@/api/system/role'
import menuApi from '@/api/system/menu'

export default {
    name: "RoleEdit",
    props:["parkList"],
    data () {
        return {
            menuTree: null,
            editRoleModel: false,
            width: null,
            editRoleInfo: {
                roleId: '',
                roleName: '',
                parkId: '',
                roleType:'',
                menuIds: []
            },
             roleTypeList: [{
                value: '0',
                label: '可操作权限'
                }, {
                value: '1',
                label: '不可操作权限'
                }],
            rules: {
                 roleName: [
                    { required: true, message: '请输入角色名', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                roleType: [{ required: true, message: '角色类型不能为空', trigger: 'change' },
                ],
                pakrId: [
                    {required: true, message: '请至少选择一个停车场', trigger: 'change' }
                ]
            }
        }
    },
    created: function(){
      
    },
    methods: {
        init(){
            this.getMenuTree()
            this.getRoleInfo(this.editRoleInfo.roleId)
        },
        getRoleInfo(id){
            roleApi.getRoleById(id)
                .then(res => {
                    console.log(res.data)
                    this.editRoleInfo = res.data
                    this.$refs.tree.setCheckedKeys(res.data.menuIds);
                })
                .catch(err => {

                })
        },
        //获取菜单树
        getMenuTree(){
            menuApi.getMenuTree()
                .then(res => {
                    this.menuTree = res.data
                })
                .catch(err => {

                })
        },
        //勾选框改变触发的方法
        handleCheckChange(data, checked, indeterminate) {
            //console.log(data,checked,indeterminate)
            this.editRoleInfo.menuIds = []
            const checkKeys = this.$refs.tree.getCheckedKeys()
            checkKeys.forEach(element => {
                if(this.editRoleInfo.menuIds.indexOf(element) == -1){
                    this.editRoleInfo.menuIds.push(element)
                }
            });
            const halfCheckParentKeys = this.$refs.tree.getHalfCheckedKeys()
            halfCheckParentKeys.forEach(element => {
                if(this.editRoleInfo.menuIds.indexOf(element) == -1){
                    this.editRoleInfo.menuIds.push(element)
                }
            });
            console.log(this.editRoleInfo.menuIds);
        },
        //点击文字触发的方法
        handleNodeClick(data) {
            
        },
        //保存角色
        save(){
            this.$refs['editRoleInfo'].validate( valid => {
                if(valid){
                    roleApi.updateRole(this.editRoleInfo)
                        .then(res => {
                            this.closeDialog()
                            this.$parent.init()
                            this.editRoleModel = false
                            this.$message({ type: 'success', message: '保存成功!' })
                            this.$refs['editRoleInfo'].resetFields()
                            this.$refs.tree.setCheckedKeys([]);
                        })
                        .catch(err => {
                            this.$message({ type: 'error', message: err })
                        })
                }
            })
        },
        closeDialog () {
            console.log("关闭弹框")
            this.$refs['editRoleInfo'].resetFields()
            this.$refs.tree.setCheckedKeys([]);
        },
        openDialog(id,width) {
            this.editRoleInfo.roleId = id
            this.width = width === undefined ? '500px' : width
            this.editRoleModel = true
            this.init()
        },
    }
}
</script>
<style>
.modal-footer{
    width: 100%;
    text-align: right;
}

.modal-btn{
  display: flex;
  justify-content: center;
}
</style>
