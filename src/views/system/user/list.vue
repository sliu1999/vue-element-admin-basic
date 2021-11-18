<template>
<div class="container-box">
  <div style="margin-left:10px">
    <el-row style="margin-top:10px">
      <el-col :span="6">
        <el-row>
          <div class="demo-input-suffix">
            <label style="color:#909399;font-size: 16px;line-height: 1.5; margin-left:10px;margin-right:10px;font-family:Arial;font-weight:normal" >角色:</label>
            <el-select v-model="searchCondition.roleId" clearable  placeholder="请选择" @change="search()">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-row> 
      </el-col>
      <el-col :span="6">
        <el-row>
          <div class="demo-input-suffix">
            <label style="color:#909399;font-size: 16px;line-height: 1.5;margin-right:10px;font-family:Arial;font-weight:normal" >账号:</label>
            <el-input
              style="width:200px"
              placeholder="请输入账号"
              prefix-icon="el-icon-search"
              v-model="searchCondition.loginId"
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
            <i style="margin-right:5px" class="el-icon-plus" />新增用户
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
        prop="userName"
        label="账号"
        align="center"
        style="width: 15%">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="姓名"
        align="center"
        style="width: 10%">
      </el-table-column>
      <el-table-column
        prop="userPhone"
        label="联系方式"
        align="center"
        style="width: 20%">
      </el-table-column>
      <el-table-column
        prop="parkRole.roleName"
        label="角色"
        align="center"
        style="width: 15%">
      </el-table-column>
      <el-table-column
        prop="park.parkName"
        label="所属停车场"
        align="center"
        style="width: 20%">
      </el-table-column>
      <el-table-column label="操作" align="center"  style="width: 40%">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="resetPassword(scope.row.userId)">重置密码</el-button>
          <el-button type="text" size="mini" @click="edit(scope.row.userId)">编辑</el-button>
          <el-button type="text" size="mini" @click="del(scope.row.userId)" >删除</el-button>
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

    <!-- 重置密码弹窗 -->
    <el-dialog width="400px" title="修改密码" :visible.sync="mimadialog" append-to-body :close-on-click-modal="false">
      <el-form ref="ruleForm4" :model="ruleForm4" label-width="100px" class="demo-ruleForm padding20" :rules="rule4">
        <el-form-item label="新密码" prop="userPass"><el-input v-model="ruleForm4.userPass" type="password" /></el-form-item>
        <el-form-item style="width:100%;text-align:center" class="bottomBtn">
          <el-button type="primary" style="background: #25BE88;border-color: #25BE88;" @click="surePassword()">确认修改</el-button>
          <el-button @click="cancelEditPassword">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <UserAdd ref="addDialog" :role-list="roleList" :park-list="parkList"></UserAdd>
    <UserEdit ref="editDialog" :role-list="roleList" :park-list="parkList"></UserEdit>
    <router-view/>
  </div>
</div>
</template>


<script>
import { getUserPageList, delUserById, changeOtherPsd } from '@/api/system/user'
import UserAdd from '@/views/system/user/add'
import UserEdit from '@/views/system/user/edit'
import roleApi from '@/api/system/role'
import parkApi from '@/api/park/park'
export default {
  name: 'UserList',
  components: {
    UserAdd,
    UserEdit,
    roleApi,
    parkApi
  },
  data() {
    return {
      loading: false,
      mimadialog: false,
      searchCondition: {
        roleId: '',
        loginId: ''
      },
      pageData: {
        list: [],
        current: 1,
        pages: 0,
        total: 0
      },
      ruleForm4: {
        userId: '',
        userPass: ''
      },
      rule4: {
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
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
      this.getRoleList()
      this.getParkList()
      this.getUserList()
    },
    //获取用户列表
    getUserList(){
      this.loading = true
      console.log(this.pageData.current, "当前页")
      const obj = {
        pageNum: this.pageData.current,
        pageSize: 10,
        loginId: this.searchCondition.loginId,
        roleId: this.searchCondition.roleId
      }
      getUserPageList(obj)
        .then(response => {
          this.pageData.list = []
          this.pageData.total = response.data.total
          this.pageData.pages = response.data.pages
          this.pageData.current = response.data.prePage + 1
          response.data.list.forEach((v,k) => {
            response.data.list[k].number = k + 1;
          });
          this.pageData.list = response.data.list
          this.loading = false
        })
        .catch(function(error){
          this.loading = false
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
    //修改密码
    resetPassword(userId){
      this.mimadialog = true
      this.ruleForm4.userId = userId
    },
    cancelEditPassword(){
      this.mimadialog = false
      this.ruleForm4.userId = ""
      this.ruleForm4.userPass = ""
    },
    //修改密码提交
    surePassword() {
      if (!this.ruleForm4.userPass) {
        this.$message({
          type: 'error',
          message: '密码不能为空!'
        })
      } else {
        this.$refs['ruleForm4'].validate(valid => {
          if (valid) {
            const obj = {
              userId: this.ruleForm4.userId,
              userPass: this.ruleForm4.userPass
            }
            changeOtherPsd(obj)
              .then(response => {
                if (response.errorCode === 0) {
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  })
                  this.mimadialog = false
                } else {
                  this.$message({
                    type: 'error',
                    message: '修改失败，请重试!\r\n' + response.msg
                  })
                }
              })
              .catch(err => {
                console.log(err, "修改密码出错")
              })
          } else {
            return false
          }
        })
      }
    },
    add() {
        this.$refs.addDialog.openDialog('700px')
    },
    //获取角色列表
    getRoleList(){
      this.roleList = null
        //角色下拉框初始化
        roleApi.getAllRole()
        .then( res => {
            this.roleList = res.data
        }).catch( err => {
            console.log(err, "获取角色下拉出错")
        })
    },
    getParkList(){
      this.roleList = null
      parkApi.getAllPark().then(res => {
        this.parkList = res.data
      }).catch(err => {

      })
    },
    edit(userId) {
      this.roleList = null
      //角色下拉框初始化
        roleApi.getAllRole()
        .then( res => {
            this.roleList = res.data
        }).catch( err => {
            console.log(err, "获取角色下拉出错")
        })
        this.$refs.editDialog.openDialog(userId, '700px')
    },
    //删除用户
    del(userId){
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then( () => {
        delUserById(userId)
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
