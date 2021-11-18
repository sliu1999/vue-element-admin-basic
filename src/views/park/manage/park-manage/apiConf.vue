<template>
    <div>
        <el-dialog :visible.sync="apiConfModel" @close="closeDialog()" :close-on-click-modal="false" :modal-append-to-body="false" title="停车场API配置" :width="width">
            <el-form :model="apiConfInfo" :rules="rules" ref="apiConfInfo" label-width="150px" label-position="right" class="demo-ruleForm padding20">
                <el-form-item label="接口地址" prop="apiUrl" style="width:80%">
                    <el-input placeholder="接口地址" v-model="apiConfInfo.apiUrl"></el-input>
                </el-form-item>
                <el-form-item label="接口来源" prop="apiSource" style="width:80%">
                    <el-select v-model="apiConfInfo.apiSource" placeholder="请选择接口来源">
                        <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名" prop="apiUser" style="width:80%">
                    <el-input placeholder="用户名" v-model="apiConfInfo.apiUser"></el-input>
                </el-form-item>
                <el-form-item label="第三方appId" prop="apiAppId" style="width:80%">
                    <el-input placeholder="第三方appId" v-model="apiConfInfo.apiAppId"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="apiPwd" style="width:80%">
                    <el-input placeholder="密码" v-model="apiConfInfo.apiPwd"></el-input>
                </el-form-item>
                <el-form-item label="秘钥" prop="apiKey" style="width:80%">
                    <el-input placeholder="秘钥" v-model="apiConfInfo.apiKey"></el-input>
                </el-form-item>
                <el-form-item label="存api配置的json" prop="apiConfig" style="width:80%">
                    <el-input type="textarea" placeholder="存api配置的json" v-model="apiConfInfo.apiConfig"></el-input>
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
</style>
<script>
import parkPayApi from '@/api/park/parkApi'

export default {
    name: "apiConfInfo",
    data () {
        return {
            apiConfModel: false,
            isAdd:true,
            width: null,
             options: [{
                value: 1,
                label: '科拓'
                }, {
                value: 2,
                label: '九比特'
                },{
                value: 3,
                label: '山东泰达'
                }],
            apiConfInfo: {
                id:'',
                parkId:'',
                apiUrl:null,
                apiSource:1,
                apiUser:null,
                apiAppId:null,
                apiPwd:null,
                apiKey:null,
                apiConfig:null
            },
            rules: {
                
            }
        }
    },
    methods: {
        
        getParkPayInfoByParkId(parkId){
            let that = this
            parkPayApi.getParkPayInfoByParkId(parkId)
            .then(res=>{
                console.log(res.data)
                if(res.data != null){
                    console.log("更新")
                    that.isAdd = false
                    that.apiConfInfo = res.data
                }else{
                    that.isAdd = true
                }
            })
            .catch(err=>{

            })
        },
        //保存
        save(){
            let that = this
            that.$refs['apiConfInfo'].validate( valid => {
                if(valid){
                    //新增
                    console.log(that.isAdd)
                    if(that.isAdd){
                        parkPayApi.addParkPay(that.apiConfInfo)
                        .then(res => {
                            that.closeDialog()
                            that.$parent.init()
                            that.apiConfModel = false
                            that.$message({ type: 'success', message: '保存成功!' })
                            that.$refs['apiConfInfo'].resetFields()
                        })
                        .catch(err => {
                            that.$message({ type: 'error', message: err })
                        })
                    }else{
                        that.apiConfInfo.createtime = null;
                        that.apiConfInfo.updatetime = null;
                        parkPayApi.editParkPay(that.apiConfInfo)
                        .then(res => {
                            that.closeDialog()
                            that.$parent.init()
                            that.apiConfModel = false
                            that.$message({ type: 'success', message: '保存成功!' })
                            that.$refs['apiConfInfo'].resetFields()
                        })
                        .catch(err => {
                            that.$message({ type: 'error', message: err })
                        })
                    }
                }
            })
        },
        closeDialog () {
            console.log("关闭弹框")
            this.$refs['apiConfInfo'].resetFields()
        },
        openDialog(parkId,width) {
            this.width = width === undefined ? '500px' : width
            this.apiConfModel = true
            this.apiConfInfo.parkId = parkId
            this.getParkPayInfoByParkId(parkId)
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
