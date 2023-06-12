<template>
  <div>
    <h2 class="header">管理员信息</h2>
    <el-card shadow="never" class="card1">
      <ul>
        <li>姓名：</li>
        <li>注册时间：</li>
        <li>管理员权限：</li>
        <li>管理员ID：</li>
        <li>更换头像：</li>
        <div class="imgs">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            list-type="picture-card"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return { imageUrl: "" };
  },
  components: {},
  mounted() {},
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>
<style scoped>
.header {
  text-align: center;
}
.card1 {
  margin: 0 auto;
  width: 50%;
  margin-top: 20px;
}
ul {
  list-style: none;
  width: 50%;
}
li {
  margin-bottom: 35px;
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
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>