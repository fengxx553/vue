<template>
  <div>
    <el-table :data="tableData">
      <el-table-column label="姓名" prop="user_name"> </el-table-column>
      <el-table-column label="注册日期" prop="create_time"></el-table-column>
      <el-table-column label="地址" prop="city"> </el-table-column>
      <el-table-column label="权限" prop="admin"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
        tableData:[],
        offset:0, 
        limit:20,
    };
  },
  methods: {
   async alladminlist(){
    let {offset, limit}=this
        let res=await this.$API.alladminlist(offset, limit)
        if(res.status==200){
            this.tableData=res.data.data
        }
    }
  },
  mounted(){
    this.alladminlist()
  }
};
</script>

<style scoped >
</style>
