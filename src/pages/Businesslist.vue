<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="店铺名称">
              {{ props.row.name }}
            </el-form-item>
            <el-form-item label="店铺地址">
              {{ props.row.address }}
            </el-form-item>
            <el-form-item label="店铺介绍">
              {{ props.row.description }}
            </el-form-item>
            <el-form-item label="店铺 ID">
              {{ props.row.id }}
            </el-form-item>
            <el-form-item label="联系电话">
              {{ props.row.phone }}
            </el-form-item>
            <el-form-item label="评分">
              {{ props.row.rating }}
            </el-form-item>
            <el-form-item label="销售额">
              {{ props.row.recent_order_num }}
            </el-form-item>
            <el-form-item label="分类">
              {{ props.row.category }}
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" prop="name">
      </el-table-column>
      <el-table-column label="店铺地址" prop="address">
      </el-table-column>
      <el-table-column label="店铺介绍" prop="description">
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" size="mini" @click="setshopping(row)">编辑</el-button>
          <el-button type="success" size="mini">添加商品</el-button>
          <el-button type="danger" size="mini" @click="deleteshopping(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="count" @current-change="handleCurrentChange"></el-pagination>
    <!-- 输入表单 -->
    <el-dialog title="修改店铺信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="店铺名称" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="form.address"></el-input>
          <span>
            当前城市：{{ this.city.name }}
          </span>
        </el-form-item>
        <el-form-item label="店铺介绍" :label-width="formLabelWidth">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类" :label-width="formLabelWidth">
          <el-cascader v-model="form.category" :options="shoplist"
            :props="{ expandTrigger: 'hover', value: 'name', label: 'name', children: 'sub_categories' }"
            @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="店铺图片" :label-width="formLabelWidth">
          <el-upload class="avatar-uploader" action="https://elm.cangdu.org/v1/addimg/shop" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="form.image_path" :src="`https://elm.cangdu.org/img/${form.image_path}`" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setshoppingto">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formLabelWidth: '120px',
      form: {},
      tableData: [],
      city: {},
      dialogFormVisible: false,
      shoplist: [],
      count:0,
      offset:0,
      limit:20,
    }
  },
  methods: {
    getshoppingcount(){
      this.$API.getshoppingcount().then(res=>{
        this.count = res.data.count
      })
    },
    handleChange(value) {
      console.log(value);
    },
    //获取商家列表
    shoppinglist(longitude, latitude) {
      let {offset,limit} = this
      this.$API.shoppinglist(longitude, latitude,offset,limit).then(res => {
        this.tableData = res.data
      })
    },
    //获取经纬度
    async getLongitude() {
      await this.$API.getLongitude().then(res => {
        let { longitude, latitude } = res
        this.city = res.data
        this.shoppinglist(longitude, latitude)
      })
    },
    setshopping(row) {
      this.dialogFormVisible = true
      this.getshoplist()
      this.form = { ...row }
      this.form.category = this.form.category.split("/")
    },
    async getshoplist() {
      let { longitude, latitude } = this.city
      this.$API.getshoplist(latitude, longitude).then(res => {
        this.shoplist = res.data
      })
    },
    handleAvatarSuccess(res, file) {
      this.form.image_path = res.image_path
      // console.log(res.image_path)
      // URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    async setshoppingto() {
      this.form.category = this.form.category.join("/")
        let res=await this.$API.setshopping(this.form)
        if(res.status==200){
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.dialogFormVisible = false
          this.getLongitude()
        }
    },
    //删除
   async deleteshopping(row){
      let res=await this.$API.deleteshopping(row.id)
      if(res.status==200){
        this.$message({
          message: res.data.message,
          type: 'success'
        });
        this.getLongitude()
      }
    },
    handleCurrentChange(val) {
      this.offset = (val - 1) * this.limit;
      this.getLongitude()
    },
  },
  mounted() {
    this.getLongitude()
    this.getshoppingcount()
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}</style>

