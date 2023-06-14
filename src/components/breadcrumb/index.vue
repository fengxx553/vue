<template>
  <div class="breadcrumb" id="frozen-section">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <span v-show="this.$route.meta.title">
        <el-breadcrumb-item>{{ this.$route.meta.type }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.$route.meta.title }}</el-breadcrumb-item>
      </span>
      <el-popover placement="top-start" trigger="hover" class="popover">
        <router-link to="/" class="span1">首页</router-link>
        <span class="span1" @click="outuser">退出</span>
        <span slot="reference"
          ><img
            :src="`https://elm.cangdu.org/img/${userinfo.avatar}`"
            class="img"
        /></span>
      </el-popover>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["userinfo"]),
  },
  methods: {
    async outuser() {
      this.$message({
        type: "progress",
        message: "退出成功",
      });
      this.$store.dispatch("outuser");
    },
  },
};
</script>

<style scoped >
.breadcrumb {
  width: 85%;
  height: 15px;
  padding: 20px 24px;
  min-width: 0;
}

.img {
  height: 40px;
  width: 40px;
  border: 2px solid black;
  border-radius: 50%;
}
.popover {
  float: right;
  position: relative;
  top: -14px;
  width: 70px;
}
.span1 {
  font-size: 20px;
  width: 70px;
  height: 30px;
  display: block;
  padding: 7px 0px;
  text-align: center;
}
.span1:hover {
  background-color: #909399;
}
.el-popover {
  min-width: 70px;
  line-height: 1.4;
}
</style>