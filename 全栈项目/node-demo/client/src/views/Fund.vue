<template>
  <div class="fundContainer">
    <div>
      <el-form :inline="true" ref="add_data">
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" @click="handAdd">添加</el-button>
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
    </div>
    <Dialog :dialog="dialog" @update="getProfile"></Dialog>
  </div>
</template>

<script>
  import Dialog from './Dilong'
  export default {
      name:'Fund',
      data() {
        return {
          tableData: [],
          dialog:{
            show:false
          }
        }
      },
      created() {
        this.getProfile()
      },
      methods:{
        getProfile () {
          let self = this
          console.log('wwww');
          this.$axios.get('/api/profile')
          .then((res) => {
            //console.log(typeof res);
            // for (let i in res.data) {
            //   self.tableData.push(res.data[i])
            // }
            self.tableData = res.data
            //console.log(typeof self.tableData);
          })
          .catch(err => {
            console.log(err);
          })  
        },
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        },
        handAdd() {
          this.dialog.show = true
        }
      },
      components: {
        Dialog
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
</style>
