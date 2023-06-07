<template>
  <div>
    <el-table :data="tableData" style="width: 100%" @expand-change="zhankai" row-key="_id">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户名">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="店铺名称">
              <span>{{ props.row.restaurant_name }}</span>
            </el-form-item>
            <el-form-item label="收货地址">
              <span>{{ props.row.useraddress }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.restaurant_id }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.restaurant_address }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="订单 ID" prop="id">
      </el-table-column>
      <el-table-column label="总价格" prop="total_amount">
      </el-table-column>
      <el-table-column label="订单状态" prop="status_bar.title">
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="count" @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      offset: 0,
      limit: 20,
      tableData: [],
      count: 0,
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.offset = (val - 1) * this.limit;
      this.getorderlist()
    },
    async getorderlist() {
      let res = await this.$API.getorderlist(this.offset, this.limit)
      if (res.status == 200) {
        this.tableData = res.data
      }
    },
    async getorderaddess(row) {
      let res = await this.$API.getorderaddresse(row.address_id)
      let res1 = await this.$API.getshoppingrestaurant(row.restaurant_id)
      let res2 = await this.$API.getuserinfo(row.user_id)
      if (res.status == 200 && res1.status == 200 && res2.status == 200) {
        return {
          //收货地址
          useraddress: res.data.address,
          //店铺地址
          restaurant_address: res1.data.address,
          //用户名称
          username: res2.data.username,
        }
      }
    },
    async zhankai(row,key) {
      if (key.length !== 0) {
        let a = await this.getorderaddess(row)
        this.$set(row, 'username', a.username)
        this.$set(row, 'useraddress', a.useraddress)
        this.$set(row, 'restaurant_address', a.restaurant_address)
      }
    },
    getordercount(){
      this.$API.getordercount().then(res=>{
        this.count=res.data.count
      })
    }
  },
  mounted() {
    this.getorderlist()
    this.getordercount()
  }
}
</script>

<style scoped >
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
