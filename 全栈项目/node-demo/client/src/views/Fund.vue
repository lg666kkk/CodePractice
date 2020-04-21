<template>
  <div class="fund">
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
        width="180">
      </el-table-column>
      <el-table-column
        prop="income"
        label="收入"
        align="center"
        width="170">
      </el-table-column>
      <el-table-column
        prop="expend"
        label="支出"
        align="center"
        width="170">
      </el-table-column>
      <el-table-column
        prop="cash"
        label="账户现金"
        align="center"
        width="170">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        align="center"
        width="220">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
      name:'Fund',
      data() {
        return {
          tableData: [],
          index: 0
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
        }
      }
  }
</script>

<style scoped>
.fund{
  padding-left: 180px;
}
</style>
