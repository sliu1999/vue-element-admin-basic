<template>
    <div>
        <el-form :model="parkInfo" :rules="rules" ref="parkInfo"  label-width="160px">
            <el-divider content-position="left">停车场基本信息</el-divider>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="停车场名称" prop="parkName" style="width:80%">
                        <el-input   v-model="parkInfo.parkName"></el-input>
                    </el-form-item>
                    <el-form-item label="停车场英文名称" prop="parkNameEn" style="width:80%">
                        <el-input   v-model="parkInfo.parkNameEn"></el-input>
                    </el-form-item>
                    <el-form-item label="总车位数" prop="totalSpaceNum" style="width:80%">
                        <el-input maxlength="4" type="number"   v-model="parkInfo.totalSpaceNum"></el-input>
                    </el-form-item>
                    <el-form-item label="是否支持室内引导" prop="roomGuide" style="width:80%">
                        <el-select v-model="parkInfo.roomGuide" placeholder="是否支持室内引导">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否支持ETC" prop="etc" style="width:80%">
                         <el-select v-model="parkInfo.etc" placeholder="是否支持ETC">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否支持室内导航" prop="indoorNav" style="width:80%">
                         <el-select v-model="parkInfo.indoorNav" placeholder="是否支持室内导航">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="经度" prop="lont" style="width:100%">
                                <el-input   v-model="parkInfo.lont"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="60px" label="纬度" prop="lat" style="width:60%">
                                <el-input   v-model="parkInfo.lat"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="地址" prop="addr" style="width:80%">
                        <el-input type="textarea"   v-model="parkInfo.addr"></el-input>
                    </el-form-item>
                    <el-form-item label="营业时间" prop="workTime" style="width:80%">
                        <el-input type="textarea"   v-model="parkInfo.workTime"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="tel" style="width:80%">
                        <el-input   v-model="parkInfo.tel"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    
                    <el-form-item label="计费规则描述" prop="payRule" style="width:80%">
                        <el-input type="textarea"  v-model="parkInfo.payRule"></el-input>
                    </el-form-item>
                    <el-form-item label="计费简要规则描述" prop="paySimpleRule" style="width:80%">
                        <el-input type="textarea"   v-model="parkInfo.paySimpleRule"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item  label-width="100px" label="限长" prop="limitL" style="width:80%">
                                <el-input   v-model="parkInfo.limitL"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label-width="40px" label="限宽" prop="limitW" style="width:90%">
                                <el-input   v-model="parkInfo.limitW"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label-width="40px" label="限高" prop="limitH" style="width:70%">
                                <el-input   v-model="parkInfo.limitH"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="入口图片地址url" prop="imgUrl" style="width:80%">
                        <el-input   v-model="parkInfo.imgUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="高德地图poi编号" prop="amapPoiId" style="width:80%">
                        <el-input   v-model="parkInfo.amapPoiId"></el-input>
                    </el-form-item>
                    <el-form-item label="第三方停车场编号" prop="thirdPartyId" style="width:80%">
                        <el-input   v-model="parkInfo.thirdPartyId"></el-input>
                    </el-form-item>
                    <el-form-item label="是否可以预约停车" prop="subscribePark" style="width:80%">
                         <el-select v-model="parkInfo.subscribePark" placeholder="是否可以预约停车">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="保留车位时长(小时)" prop="keepParkHour" style="width:80%">
                        <el-input type="number" maxlength="3"   v-model="parkInfo.keepParkHour"></el-input>
                    </el-form-item>
                    <el-form-item label="开通预约停车介绍URL" prop="parkingReservationUrl" style="width:80%">
                        <el-input type="textarea"   v-model="parkInfo.parkingReservationUrl"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            
            <el-form-item class="modal-footer">
                <div class="modal-btn">
                    <el-button type="primary" style="background: #25BE88;border-color: #25BE88;" @click="save()">提交</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import parkApi from '@/api/park/park'

export default {
    name: "RoleAdd",
    data () {
        return {
            parkInfo: {
                parkName: '',
                parkNameEn: '',
                totalSpaceNum:'',
                roomGuide:0,
                limitL:null,
                limitW:null,
                limitH:null,
                addr:'',
                tel:'',
                imgUrl:null,
                workTime:null,
                payRule:null,
                paySimpleRule:null,
                etc:0,
                indoorNav:0,
                lont:null,
                lat:null,
                amapPoiId:null,
                thirdPartyId:null,
                subscribePark:0,
                keepParkHour:null,
                parkingReservationUrl:null
            },
            options: [{
                value: 0,
                label: '否'
                }, {
                value: 1,
                label: '是'
                }],
            rules: {
                parkName: [
                    { required: true, message: '请输入停车场名', trigger: 'blur' },
                ],
                parkNameEn: [
                    { required: true, message: '请输入停车场英文名', trigger: 'blur' },
                ],
                totalSpaceNum: [
                    {required: true, message: '请输入车位数', trigger: 'blur' }
                ],
                lont: [
                    {required: true, message: '请输入坐标经度', trigger: 'blur' }
                ],
                lat: [
                    {required: true, message: '请输入坐标纬度', trigger: 'blur' }
                ],
                addr: [
                    {required: true, message: '请输入地址', trigger: 'blur' }
                ],
                workTime: [
                    {required: true, message: '请输入营业时间', trigger: 'blur' }
                ],
                tel: [
                     { message: '请输入正确的手机号', pattern: /^1[3|4|5|6|7|8|9]\d{9}$/ },
                    { required: true, message: '联系方式不能为空', trigger: 'blur' }    
                ],
                roomGuide: [{ required: true, message: '请选择是否支持室内引导', trigger: 'change' },
                ],
                 etc: [{ required: true, message: '请选择是否支持ETC', trigger: 'change' },
                ],
                 indoorNav: [{ required: true, message: '请选择是否支持室内导航', trigger: 'change' },
                ],
                subscribePark: [{ required: true, message: '请选择是否支持室内导航', trigger: 'change' },
                ],
            }
        }
    },
    created: function(){
        this.init()
    },
    methods: {
        init(){

        },
        //保存
        save(){
            this.$refs['parkInfo'].validate( valid => {
                if(valid){
                    parkApi.addPark(this.parkInfo)
                        .then(res => {
                            this.$message({ type: 'success', message: '保存成功!' })
                            setTimeout(() =>
                            {
                                //返回列表
                                this.$router.go(-1);
                            }, 1000);
                        })
                        .catch(err => {
                            this.$message({ type: 'error', message: err })
                        })
                }
            })
        },
    }
}
</script>
<style>


</style>
