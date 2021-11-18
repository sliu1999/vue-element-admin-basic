<template>
<div class="container-box">
  <div style="margin-left:10px">
    <el-row style="margin-top:10px">
      <el-col :span="6">
       <el-row>
          <div class="demo-input-suffix">
            <label style="color:#909399;font-size: 16px;line-height: 1.5;margin-left:10px;margin-right:10px;font-family:Arial;font-weight:normal" >角色:</label>
            <el-input
              style="width:200px"
              placeholder="请输入角色名称"
              prefix-icon="el-icon-search"
              v-model="searchCondition.roleName"
              @change="search()">
            </el-input>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="demo-form-inline">
      <el-col :span="12">
        <el-row style="display: flex;justify-content: flex-start;"  class="right_icon">
          <el-button type="primary" @click="add()" >
            <i style="margin-right:5px" class="el-icon-plus" />新增角色
          </el-button>
        </el-row>
      </el-col>
    </el-row>

      <el-table
      v-loading="loading" :data="pageData.list" style="width: 100%" :header-cell-style="{ background: '#f7f7f7', color: '#666' }" size="mini" border>
      <el-table-column prop="number" label="序号" width="50" />
      <el-table-column prop="roleName" label="角色名称" style="width: 20%"/>
      <el-table-column prop="menuNum" label="权限数量" align="center" style="width: 15%"/>
      <el-table-column prop="userNum" label="绑定人数" align="center" style="width: 15%"/>
      <el-table-column label="操作" align="center" style="width: 30%">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="edit(scope.row.roleId)">编辑</el-button>
          <el-button type="text" size="mini" @click="del(scope.row.roleId,scope.row.userNum)" >删除</el-button>
          <el-button type="text" size="mini" @click="detail(scope.row.roleId)" >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom center-text">
      <el-pagination
        :v-model="pageData" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pageData.current" :page-sizes="[10]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="pageData.total">
      </el-pagination>
    </div>
    <router-view/>
    <RoleAdd ref="roleAddDialog" :park-list="parkList"></RoleAdd>
    <RoleEdit ref="roleEditDialog" :park-list="parkList"></RoleEdit>
  </div>
</div>
  
</template>


<script>
import roleApi from '@/api/system/role'
import RoleAdd from '@/views/system/role/manage/add'
import RoleEdit from '@/views/system/role/manage/edit'
import parkApi from '@/api/park/park'
export default {
  name: 'RoleList',
  components: {
    RoleAdd,
    RoleEdit
  },
  data() {
    return {
      loading: false,
      searchCondition: {
        roleName: ''
      },
      parkList:null,
      pageData: {
        list: [],
        current: 1,
        pages: 0,
        total: 0
      }
    }
  },
  created: function() {
    this.init()
  },
  methods: {
    //列表初始化
    init(){
      this.getRolePageList()
      this.getParkList()
    },
    getParkList(){
      this.roleList = null
      parkApi.getAllPark().then(res => {
        this.parkList = res.data
      }).catch(err => {

      })
    },
    //获取角色列表
    getRolePageList(){
      this.loading = true
      const obj = {
        pageNum: this.pageData.current,
        pageSize: 10,
        roleName: this.searchCondition.roleName
      }
      roleApi.getRolePage(obj)
        .then(res => {
          this.pageData.list = []
          this.pageData.total = res.data.total
          this.pageData.pages = res.data.pages
          this.pageData.current = res.data.prePage + 1
          res.data.list.forEach((v,k) => {
            res.data.list[k].number = k + 1;
          });
          this.pageData.list = res.data.list
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          console.log(err, "获取列表接口出错")
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
    add() {
        this.$refs.roleAddDialog.openDialog('700px')
    },
    edit(id) {
        this.$refs.roleEditDialog.openDialog(id, '700px')
    },
    //删除用户
    del(roleId,userNum){
      console.log(userNum,"此角色绑定用户"+userNum)
      if(userNum > 0){
        this.$message.error('请先删除此角色下的用户，再进行删除角色操作！');
        return;
      }
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then( () => {
        roleApi.delRoleById(roleId)
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
    //用户详情
    detail(id){
      this.$router.push({
        name:'role-detail',
        query: {
          roleId: id
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
   .container-box {
    margin: 20px;
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
  }

  

</style>