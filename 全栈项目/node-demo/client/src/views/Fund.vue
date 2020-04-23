<template>
  <div class="fundContainer">
    <div>
      <el-form :inline="true" ref="add_data" :model="search_data">
        <!--时间筛选-->
        <el-form-item label="按照时间筛选">
          <el-date-picker
            v-model="search_data.startTime"
            type="datetime"
            placeholder="选择开始时间"
            >
          </el-date-picker>
          --
          <el-date-picker
            v-model="search_data.endTime"
            type="datetime"
            placeholder="选择结束时间"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="handSearch">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button 
            type="primary" 
            size="small" 
            icon="view" 
            v-if="user.identity == 'manager'"
            @click="handAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
        <el-table
      v-if="tableData.length > 0"
      :data="tableData"
      max-height="450"
      border 
      style="width: 100%">
      <el-table-column
        prop="date"
        align="center"
        label="创建时间"
        width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="收支类型"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="descripe"
        label="收支描述"
        align="center"
        width="160">
      </el-table-column>
      <el-table-column
        prop="income"
        label="收入"
        align="center"
        width="150">
        <template slot-scope="scope">
          <span style="color:#00d053">{{ scope.row.income }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="expend"
        label="支出"
        align="center"
        width="150">
        <template slot-scope="scope">
          <span style="color:#f56767">{{ scope.row.expend }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cash"
        label="账户现金"
        align="center"
        width="150">
        <template slot-scope="scope">
          <span style="color:#4db3ff">{{ scope.row.cash }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        align="center"
        width="200">
      </el-table-column>
      <el-table-column 
        label="操作" 
        v-if="user.identity == 'manager'"
        prop="operation"
        align="center"
        width="150px">
      <template slot-scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <!--分页-->
    <el-row>
      <el-col :span="24">
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pagiations.page_index"
            :page-sizes="pagiations.page_sizes"
            :page-size="pagiations.page_size"
            :layout="pagiations.layout"
            :total="pagiations.total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    </div>
    <Dialog :dialog="dialog" :formData="formData" @update="getProfile"></Dialog>
  </div>
</template>

<script>
  import Dialog from './Dilong'
  export default {
      name:'Fund',
      components: {
        Dialog
      },
      data() {
        return {
          search_data: {
            startTime:'',
            endTime:''
          },
          filterTableData:[],
          pagiations: {
            page_index: 1, // 当前位于那页
            total: 0, //当前数据的总数
            page_size: 5, // 每页显示多少
            page_sizes:[2,5, 10, 15],
            layout: "total,sizes,prev,pager,next,jumper"// 翻页属性
          },
          tableData: [],
          //allTableData:[],
          formData: {
            type:"",
            descripe: "",
            income: "",
            expend:"",
            cash:"",
            remark:"",
            id: ""
          },
          dialog:{
            show:false,
            title:"",
            option:'edit'
          }
        }
      },
      created() {
        this.getProfile()
      },
      computed: {
        user(){
          return this.$store.getters.user;
        }
      },
      methods:{
        getProfile () {
          let self = this
          //console.log('wwww');
          this.$axios.get('/api/profile')
          .then((res) => {
            //console.log(typeof res);
            // for (let i in res.data) {
            //   self.tableData.push(res.data[i])
            // }
            self.allTableData = res.data
            this.filterTableData = res.data
            //self.tableData = res.data
            //console.log(this.allTableData);
            // 设置分页数据
            this.setPaginations()
          })
          .catch(err => {
            console.log(err);
          })  
        },
        setPaginations(){
          // 对分页属性设置
          this.pagiations.total = this.allTableData.length
          this.pagiations.page_index = 1
          this.pagiations.page_size = 5
          // 设置默认分页数据
          this.tableData = this.allTableData.filter((item, index) => {
            return index < this.pagiations.page_size
          })
        },
        handSearch(){
          if (!this.search_data.startTime || !this.search_data.endTime) {
            this.$message({
              type:'warning',
              message:'请选择时间序列'
            })
            this.getProfile()
            return 
          }
          const sTime = this.search_data.startTime.getTime()
          const eTime = this.search_data.endTime.getTime()
          this.allTableData = this.filterTableData.filter(item => {
            //console.log(item);
            let date = new Date(item.date)
            let time = date.getTime()
            return time >= sTime && time <= eTime
          })
          this.setPaginations()
        },
        handleEdit(index, row) {
          this.dialog = {
            show: true,
            title:'修改资金信息',
            option:'edit'
          }
          this.formData = {
            type:row.type,
            descripe: row.descripe,
            income:row.income,
            expend:row.expend,
            cash: row.cash,
            remark: row.remark,
            id: row._id
          }
        },
        handleDelete(index, row) {
          this.$axios.delete(`/api/profile/delete/${row._id}`)
            .then(() => {
              this.$message({
                type:'success',
                message:'删除成功'
              })
              this.getProfile()
            })
        },
        handAdd() {
          this.dialog = {
            show: true,
            title:'添加资金信息',
            option:'add'
          }
          this.formData = {
            type:'',
            descripe: '',
            income: '',
            expend: '',
            cash: '',
            remark: '',
            id: ''
          }
        },
        handleSizeChange(page_size){
          //console.log(page_size);
          // 切换size
          this.pagiations.page_index = 1;
          this.pagiations.page_size = page_size
          this.tableData = this.allTableData.filter((item, index) => {
            return index < page_size
          })
        },
        handleCurrentChange(page){
          //console.log(page);
          //获取当前页
          let index = this.pagiations.page_size * (page - 1)
          // 获取数据总数
          let nums = this.pagiations.page_size * page
          // 容器
          let tables = []
          for(let i=index; i<nums; i++) {
            if (this.allTableData[i]) {
              //console.log(typeof  this.allTableData[i]);
              //console.log(this.allTableData[i]);
              tables.push(this.allTableData[i])
              //console.log(typeof tables);
            }
            this.tableData = tables 
          }
      },
    }
  }
</script>

<style scoped>
.fundContainer{
  margin: 5px;
  padding-left: 180px;
  box-sizing: border-box;
}
.btnRight{
  float: right;
}
.page {
  text-align: right;
  margin-top: 10px;
}
</style>
