<template>
<div class="container-box">
  <div style="margin-left:10px">
    <el-row style="margin-top:10px">
      <el-col :span="6">
        <el-row>
          <div class="demo-input-suffix">
            <label style="color:#909399;font-size: 16px;line-height: 1.5;margin-left:10px;margin-right:10px;font-family:Arial;font-weight:normal" >停车场:</label>
            <el-input
              style="width:200px"
              placeholder="请输入停车场"
              prefix-icon="el-icon-search"
              v-model="searchCondition.parkName"
              @change="search()">
            </el-input>
          </div>
        </el-row>
      </el-col>
      <el-col :span="6"><div class="grid-content"></div></el-col>
      <el-col :span="6"><div class="grid-content"></div></el-col>
    </el-row>
    <el-row class="demo-form-inline">
      <el-col :span="12">
        <el-row style="display: flex;justify-content: flex-start;"  class="right_icon">
          <el-button type="primary" @click="add()" >
            <i style="margin-right:5px" class="el-icon-plus" />新增停车场
          </el-button>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row style="display: flex;justify-content: flex-end;">

        </el-row>
      </el-col>
    </el-row>

      <el-table
      v-loading="loading"
      :data="pageData.list"
      style="width: 100%"
      :header-cell-style="{ background: '#f7f7f7', color: '#666' }" size="mini" border>
      <el-table-column prop="number" label="序号" width="50" />
      <el-table-column
        prop="parkName"
        label="名称"
        align="center"
        style="width: 10%">
      </el-table-column>
      <el-table-column
        prop="totalSpaceNum"
        label="总车位数"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="联系方式"
        align="center"
        style="width: 15%">
      </el-table-column>
      <el-table-column
        prop="addr"
        label="地址"
        align="center"
        style="width: 20%">
      </el-table-column>
      <el-table-column
        prop="workTime"
        label="营业时间"
        align="center"
        style="width: 10%">
      </el-table-column>
      <el-table-column label="操作" align="center"  width="200">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="parkConf(scope.row.parkId)">基础配置</el-button>
          <el-button type="text" size="mini" @click="payConf(scope.row.parkId)">支付配置</el-button>
          <el-button type="text" size="mini" @click="apiConf(scope.row.parkId)">API配置</el-button>
          <el-button type="text" size="mini" @click="edit(scope.row.parkId)">编辑</el-button>
          <el-button type="text" size="mini" @click="del(scope.row.parkId)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom center-text">
      <el-pagination
      :v-model="pageData"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageData.current"
      :page-sizes="[10]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageData.total">
    </el-pagination>
    </div>
    <PayConfInfo ref="payConfInfo"/>
    <ApiConfInfo ref="apiConfInfo"/>
    <ParkConfInfo ref="parkConfInfo"/>
    <router-view/>
  </div>
</div>  
</template>


<script>
import parkApi from '@/api/park/park'
import PayConfInfo from '@/views/park/manage/park-manage/payConf.vue'
import ApiConfInfo from '@/views/park/manage/park-manage/apiConf.vue'
import ParkConfInfo from '@/views/park/manage/park-manage/parkConf.vue'
export default {
  name: 'UserList',
  components: {
    parkApi,
    PayConfInfo,
    ApiConfInfo,
    ParkConfInfo
  },
  data() {
    return {
      loading: false,
      searchCondition: {
        parkName: ''
      },
      pageData: {
        list: [],
        current: 1,
        pages: 0,
        total: 0
      },
      roleList: null,
      parkList:null
    }
  },
  created: function() {
    this.init()
  },
  methods: {
    //列表初始化
    init(){
      this.getParkList()
    },
    //获取用户列表
    getParkList(){
      let that = this;
      that.loading = true
      console.log(that.pageData.current, "当前页")
      const obj = {
        pageNum: that.pageData.current,
        pageSize: 10,
        parkName: that.searchCondition.parkName
      }
      parkApi.getParkList(obj)
        .then(response => {
          that.pageData.list = []
          that.pageData.total = response.data.total
          that.pageData.pages = response.data.pages
          that.pageData.current = response.data.prePage + 1
          response.data.list.forEach((v,k) => {
            response.data.list[k].number = k + 1;
          });
          that.pageData.list = response.data.list
          that.loading = false
        })
        .catch(function(error){
          that.loading = false
        })
    },
    edit(parkId){
      this.$router.push({
        name:'park-edit',
        query:{
          parkId:parkId
        }
      })
    },
    add(){
      this.$router.push({
        //path: '/system/role-detail',
        name:'park-add',
        query: {

        }
      })
    },
    //删除
    del(parkId){
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then( () => {
        parkApi.delPark(parkId)
        .then(res => {
          if (res.errorCode === 0) {
            this.$message({
              info: 'success',
              message: '删除成功'
            })
            this.init()
          }
        })
        .catch( err => {
          console.log(err, "删除用户出错")
        })
      })
      .catch( () => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //搜索方法
    search(){
      this.pageData.current = 1
      this.init()
    },
    //修改列表每页显示数量
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //修改列表当前页是第几页
    handleCurrentChange(val) {
      this.pageData.current = val
      this.init()
    },
    payConf(parkId){
      this.$refs.payConfInfo.openDialog(parkId,'700px')
    },
    apiConf(parkId){
      this.$refs.apiConfInfo.openDialog(parkId,'700px')
    },
    parkConf(parkId){
      this.$refs.parkConfInfo.openDialog(parkId,'700px')
    }
  }
}
</script>

<style scoped lang="scss">
.container-box {
    margin: 20px;
    .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .el-table .warning-row {
    background: oldlace;
  }
  .demo-form-inline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 10px 0;
  }
  .bottom {
    width: 100%;
    margin-top: 15px;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
}
  
</style>
