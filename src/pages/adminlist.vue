<template>
  <div>
    <el-table :data="tableData">
      <el-table-column label="姓名" prop="user_name"> </el-table-column>
      <el-table-column label="注册日期" prop="create_time"></el-table-column>
      <el-table-column label="地址" prop="city"> </el-table-column>
      <el-table-column label="权限" prop="admin"> </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="count" @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script>
import { getadminconut } from '../api';

export default {
  data() {
    return {
        tableData:[],
        offset:0, 
        limit:20,
        count:0,
    };
  },
  methods: {
   async alladminlist(){
    let {offset, limit}=this
        let res=await this.$API.alladminlist(offset, limit)
        if(res.status==200){
            this.tableData=res.data.data
        }
    },
    handleCurrentChange(val) {
      this.offset = (val - 1) * this.limit;
      this.alladminlist()
    },
    async getadminconut(){
      let res=await this.$API.getadminconut()
      if(res.status==200){
        this.count=res.data.count
      }
    }
  },
  mounted(){
    this.alladminlist()
    this.getadminconut()
  }
};
</script>

<style scoped >
</style>
