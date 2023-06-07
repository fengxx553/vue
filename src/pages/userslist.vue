<template>
  <div>
    <el-table :data="tableData" style="width: 100%" height="540">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="registe_time" label="注册日期" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名称"></el-table-column>
      <el-table-column prop="city" label="注册地"></el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="count" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      limit: 30,
      offset: 0,
      tableData: [],
      count:0
    }
  },
  methods: {
    async getuserlist() {
      try {
        let res = await this.$API.getuserlist(this.offset, this.limit)
      if (res.status == 200) {
        this.tableData = res.data
      }
      } catch (error) {
        console.error(error)
      }
    },
    handleCurrentChange(val) {
      this.offset = (val - 1) * this.limit;
      this.getuserlist()
    },
    async getusercount() {
      let res = await this.$API.getusercount()
      if (res.status == 200) {
        this.count=res.data.count
      }
    }
    },
    mounted() {
      // 
      this.getuserlist()
      this.getusercount()
      // console.log(this.tableData)
    },
  }
</script>

<style scoped ></style>
