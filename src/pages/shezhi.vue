<template>
  <div>
    <h2 class="header">管理员信息</h2>
    <el-card shadow="never" class="card1">
      <ul>
        <li>姓名：{{ userinfo.user_name }}</li>
        <li>注册时间：{{ userinfo.create_time }}</li>
        <li>管理员权限：{{ userinfo.admin }}</li>
        <li>管理员ID：{{ userinfo.id }}</li>
        <li>更换头像：</li>
        <div class="imgs">
          <el-upload
            class="avatar-uploader"
            action="https://elm.cangdu.org/v1/addimg/avatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            list-type="picture-card"
          >
            <img v-if="userinfo.avatar" :src="`https://elm.cangdu.org/img/${userinfo.avatar}`" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </ul>
    </el-card>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return { };
  },
  components: {},
  mounted() {},
  methods: {
    handleAvatarSuccess(res, file){
      this.$store.dispatch('getadmininfo')
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
  computed:{
    ...mapState(['userinfo'])
  }
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
    width: 146px;
    height: 146px;
    line-height: 146px;
    text-align: center;
  }
  .avatar {
    width: 146px;
    height: 146px;
    display: block;
  }
</style>