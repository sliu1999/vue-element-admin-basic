<template>
    <div>
        <el-dialog :visible.sync="addUserModel" @close="closeDialog()" :close-on-click-modal="false" :modal-append-to-body="false" title="新增用户" :width="width">
            <el-form :model="userInfo" :rules="rules" ref="userInfo" label-position="top" class="demo-ruleForm padding20">
                <el-divider content-position="left">用户信息</el-divider>
                 <el-form-item label="账号" prop="userName">
                    <el-input placeholder="请输入用户名" v-model="userInfo.userName"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="nickname">
                    <el-input placeholder="请输入用户名" v-model="userInfo.nickname"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="userPhone">
                    <el-input placeholder="请输入用户名" v-model="userInfo.userPhone"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="userPass">
                    <el-input show-password placeholder="请输入密码" v-model="userInfo.userPass"></el-input>
                </el-form-item>
                <el-form-item label="停车场" prop="parkId">
                     <el-select v-model="userInfo.parkId" placeholder="请选择">
                        <el-option
                        v-for="item in parkList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色" prop="roleId">
                     <el-select v-model="userInfo.roleId" placeholder="请选择">
                        <el-option
                        v-for="item in roleList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
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
<script>
import { addUser } from '@/api/system/user'

export default {
    name: "UserAdd",
    props:['roleList','parkList'],
    data () {
        return {
            addUserModel: false,
            width: null,
            userInfo:{
                userName: '',
                userPass: '',
                roleId: '',
                nickname:'',
                userPhone:'',
                parkId:''
            },
            rules: {
                userName: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                userPhone: [
                    { required: true, message: '请输入联系方式', trigger: 'blur' }
                ],
                userPass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                ],
                roleId: [
                    {required: true, message: '请至少选择一个角色', trigger: 'change' }
                ],
                pakrId: [
                    {required: true, message: '请至少选择一个停车场', trigger: 'change' }
                ]
            }
        }
    },
    created: function(){
        this.init()
    },
    methods: {
        init(){
            
        },
        save(){
            this.$refs['userInfo'].validate( valid => {
                if(valid){ 
                    addUser(this.userInfo)
                        .then(res => {
                            this.closeDialog()
                            this.$parent.init()
                            this.addUserModel = false
                            this.$message({ type: 'success', message: '保存成功!' })
                            this.$refs['userInfo'].resetFields()
                            console.log(this.roleList, "下拉框内容")
                        })
                        .catch(err => {
                            this.$message({ type: 'error', message: err })
                        })
                }
            })
        },
        closeDialog () {
            console.log("关闭弹框")
            this.$refs['userInfo'].resetFields()
        },
        openDialog(width) {
            this.width = width === undefined ? '500px' : width
            this.addUserModel = true
            this.$nextTick(()=>{
                this.$refs['userInfo'].resetFields()    
            })
            
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
