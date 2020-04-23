<template>
  <div class="dialog">
    <el-dialog 
        :title="dialog.title"
        :visible.sync="dialog.show"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :modal-append-to-body="false">
        <div class="from">
          <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px; width:auto;"
          >
            <el-form-item label="收支类型:">
              <el-select v-model="formData.type" placeholder="收支类型">
                <el-option v-for="(formtype, index) in format_type_list" :key="index" :label="formtype" :value="formtype"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="descripe" label="收支描述:">
                <el-input type="descripe" v-model="formData.descripe" placeholder="收支描述"></el-input>
            </el-form-item>
            <el-form-item prop="income" label="收入:">
                <el-input type="number" v-model="formData.income" placeholder="收入"></el-input>
            </el-form-item>
            <el-form-item prop="expend" label="支出:">
                <el-input type="number" v-model="formData.expend" placeholder="支出"></el-input>
            </el-form-item>
            <el-form-item prop="cash" label="账户现金:">
                <el-input type="number" v-model="formData.cash" placeholder="现金"></el-input>
            </el-form-item>
            <el-form-item prop="remark" label="备注:">
                <el-input type="text" v-model="formData.remark" placeholder="备注"></el-input>
            </el-form-item>
            <el-form-item class="text_right">
              <el-button @click="dialog.show = false">取消</el-button>
              <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
    </el-dialog>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
      name:'Dialog',
      data() {
        return {
          format_type_list:["期限", "充值", "优惠券", "转账"],
          form_rules: {
            descripe: [
              {
                required:true,
                message: '不能为空',
                trigger: 'blur'
              }
            ]
          }
        }
      },
      props: {
        dialog: Object,
        formData: Object
      },
      methods: {
        onSubmit(form) {
          this.$refs[form].validate(valid => {
            if (valid) {
              const url = this.dialog.option == 'add' ? 'add' : `edit/${this.formData.id}`
              //console.log(this.formData);
              this.$axios.post(`/api/profile/${url}`, qs.stringify(this.formData),
                {headers:{'Content-Type':'application/x-www-form-urlencoded'}})
                .then(()=> {
                  this.$message({
                    type:"success",
                    message:'添加成功'
                  })
                  // 影藏对话框
                  this.dialog.show = false
                  this.$emit('update')
                })
            }
          })
        }
      }
  }
</script>

<style scoped>

</style>
