<template>
    <div>
        <el-dialog :visible.sync="payConfModel" @close="closeDialog()" :close-on-click-modal="false" :modal-append-to-body="false" title="停车场支付配置" :width="width">
            <el-form :model="payConfInfo" :rules="rules" ref="payConfInfo" label-width="150px" label-position="right" class="demo-ruleForm padding20">
                 <el-form-item label="支付方式" prop="payType" style="width:80%">
                      <el-select v-model="payConfInfo.payType" placeholder="请选择支付方式">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="微信应用号" prop="wxAppid" style="width:80%">
                    <el-input placeholder="微信应用号" v-model="payConfInfo.wxAppid"></el-input>
                </el-form-item>
                <el-form-item label="微信应用秘钥" prop="wxAppsecret" style="width:80%">
                    <el-input placeholder="微信应用秘钥" v-model="payConfInfo.wxAppsecret"></el-input>
                </el-form-item>
                <el-form-item label="微信商户号" prop="wxPartner" style="width:80%">
                    <el-input placeholder="微信商户号" v-model="payConfInfo.wxPartner"></el-input>
                </el-form-item>
                <el-form-item label="微信商户号key" prop="wxPartnerkey" style="width:80%">
                    <el-input placeholder="微信商户号key" v-model="payConfInfo.wxPartnerkey"></el-input>
                </el-form-item>
                <el-form-item label="微信回调url" prop="wxNotifyurl" style="width:80%">
                    <el-input placeholder="微信回调url" v-model="payConfInfo.wxNotifyurl"></el-input>
                </el-form-item>
                <el-form-item label="支付宝的APPID" prop="zfbAppId" style="width:80%">
                    <el-input placeholder="支付宝的APPID" v-model="payConfInfo.zfbAppId"></el-input>
                </el-form-item>
                <el-form-item label="开发者应用私钥" prop="zfbAppPrivateKey" style="width:80%">
                    <el-input placeholder="开发者应用私钥" v-model="payConfInfo.zfbAppPrivateKey"></el-input>
                </el-form-item>
                <el-form-item label="支付宝账号" prop="zfbAppAccount" style="width:80%">
                    <el-input placeholder="支付宝账号" v-model="payConfInfo.zfbAppAccount"></el-input>
                </el-form-item>
                <el-form-item label="支付宝公钥" prop="zfbAlipayPublicKey" style="width:80%">
                    <el-input placeholder="支付宝公钥" v-model="payConfInfo.zfbAlipayPublicKey"></el-input>
                </el-form-item>
                <el-form-item label="支付宝回调url" prop="zfbNotifyurl" style="width:80%">
                    <el-input placeholder="支付宝回调url" v-model="payConfInfo.zfbNotifyurl"></el-input>
                </el-form-item>
                 <el-form-item label="支付宝小程序回调url" prop="zfbXcxNotifyurl" style="width:80%">
                    <el-input placeholder="支付宝小程序回调url" v-model="payConfInfo.zfbXcxNotifyurl"></el-input>
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
import parkPayApi from '@/api/park/parkPay'

export default {
    name: "payConfInfo",
    data () {
        return {
            payConfModel: false,
            isAdd:true,
            width: null,
             options: [{
                value: '0',
                label: '全部'
                }, {
                value: '1',
                label: '微信'
                },{
                value: '2',
                label: '支付宝'
                }],
            payConfInfo: {
                parkId:'',
                payType:'0',
                wxAppid:null,
                wxAppsecret:null,
                wxPartner:null,
                wxPartnerkey:null,
                wxNotifyurl:null,
                zfbAppId:null,
                zfbAppPrivateKey:null,
                zfbAppAccount:null,
                zfbAlipayPublicKey:null,
                zfbNotifyurl:null,
                zfbXcxNotifyurl:null
            },
            rules: {
                
            }
        }
    },
    methods: {
        
        getParkPayInfo(parkId){
            let that = this
            parkPayApi.getParkPayInfo(parkId)
            .then(res=>{
                console.log(res.data)
                if(res.data != null){
                    console.log("更新")
                    that.isAdd = false
                    that.payConfInfo = res.data
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
            that.$refs['payConfInfo'].validate( valid => {
                if(valid){
                    //新增
                    console.log(that.isAdd)
                    if(that.isAdd){
                        parkPayApi.addParkPay(that.payConfInfo)
                        .then(res => {
                            that.closeDialog()
                            that.$parent.init()
                            that.payConfModel = false
                            that.$message({ type: 'success', message: '保存成功!' })
                            that.$refs['payConfInfo'].resetFields()
                        })
                        .catch(err => {
                            that.$message({ type: 'error', message: err })
                        })
                    }else{
                        that.payConfInfo.createtime = null;
                        that.payConfInfo.updatetime = null;
                        parkPayApi.editParkPay(that.payConfInfo)
                        .then(res => {
                            that.closeDialog()
                            that.$parent.init()
                            that.payConfModel = false
                            that.$message({ type: 'success', message: '保存成功!' })
                            that.$refs['payConfInfo'].resetFields()
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
            this.$refs['payConfInfo'].resetFields()
        },
        openDialog(parkId,width) {
            this.width = width === undefined ? '500px' : width
            this.payConfModel = true
            this.payConfInfo.parkId = parkId
            this.getParkPayInfo(parkId)
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
