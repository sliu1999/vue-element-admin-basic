<template>
    <div>
        <el-dialog :visible.sync="parkConfModel" @close="closeDialog()" :close-on-click-modal="false" :modal-append-to-body="false" title="停车场API配置" :width="width">
            <el-form :model="parkConfInfo" :rules="rules" ref="parkConfInfo" label-width="150px" label-position="right" class="demo-ruleForm padding20">
                <el-form-item label="管理员联系方式" prop="phone" style="width:80%">
                    <el-input placeholder="管理员联系方式" v-model="parkConfInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="停车超时时间（h）" prop="duration" style="width:80%">
                    <el-input placeholder="停车超时时间（h）" v-model="parkConfInfo.duration"></el-input>
                </el-form-item>
                <el-form-item label="推荐车位排序" prop="sort" sort="width:80%">
                    <el-input placeholder="推荐车位排序" v-model="parkConfInfo.sort"></el-input>
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
import parkApi from '@/api/park/park'

export default {
    name: "parkConfInfo",
    data () {
        return {
            parkConfModel: false,
            width: null,
            parkConfInfo: {
                parkId:'',
               phone: null,
                duration: null,
                sort:null
            },
            rules: {
                
            }
        }
    },
    methods: {
        
        getParkConfInfoByParkId(parkId){
            let that = this
            parkApi.getParkConfInfoByParkId(parkId)
            .then(res=>{
                if(res.data.length != 0){
                    console.log(res.data)
                    res.data.forEach(element => {
                        if(element.confType == '0'){
                            //电话配置
                            let json = JSON.parse(element.confJson)
                            that.parkConfInfo.phone = json.phone
                        }else if(element.confType == '1'){
                            //停车超时时间配置
                            let json = JSON.parse(element.confJson)
                            that.parkConfInfo.duration = json.duration
                        }else if(element.confType == '3'){
                            //推荐车位顺序配置
                            that.parkConfInfo.sort = element.confJson
                        }
                    });
                }
            })
            .catch(err=>{

            })
        },
        //保存
        save(){
            let that = this
            that.$refs['parkConfInfo'].validate( valid => {
                if(valid){
                    //新增
                    let list = new Array();
                    let info = {};
                    info.confType = '0';
                    info.parkId = this.parkConfInfo.parkId
                    info.confJson = JSON.stringify({ "phone": this.parkConfInfo.phone });
                    if(this.parkConfInfo.phone!=null && this.parkConfInfo.phone!='' && this.parkConfInfo.phone != undefined){
                        list.push(info);
                    }
                    
                    info = {};
                    info.confType = '1';
                    info.parkId = this.parkConfInfo.parkId
                    info.confJson = JSON.stringify({ "duration": this.parkConfInfo.duration });
                    if(this.parkConfInfo.duration!=null && this.parkConfInfo.duration!='' && this.parkConfInfo.duration != undefined){
                        list.push(info);
                    }

                    info = {};
                    info.confType = '3';
                    info.parkId = this.parkConfInfo.parkId
                    info.confJson = this.parkConfInfo.sort;
                    if(this.parkConfInfo.sort!=null && this.parkConfInfo.sort!='' && this.parkConfInfo.sort != undefined){
                        list.push(info);
                    }

                    
                    parkApi.updateParkConf(list)
                    .then(res => {
                        that.closeDialog()
                        that.$parent.init()
                        that.parkConfModel = false
                        that.$message({ type: 'success', message: '保存成功!' })
                        that.$refs['parkConfInfo'].resetFields()
                    })
                    .catch(err => {
                        that.$message({ type: 'error', message: err })
                    })
                    
                }
            })
        },
        closeDialog () {
            console.log("关闭弹框")
            this.$refs['parkConfInfo'].resetFields()
        },
        openDialog(parkId,width) {
            this.width = width === undefined ? '500px' : width
            this.parkConfModel = true
            this.parkConfInfo.parkId = parkId
            this.getParkConfInfoByParkId(parkId)
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
