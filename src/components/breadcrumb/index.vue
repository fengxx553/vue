<template>
    <div class="breadcrumb" id="frozen-section">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <span v-show="this.$route.meta.title">
                <el-breadcrumb-item>{{ this.$route.meta.type }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ this.$route.meta.title }}</el-breadcrumb-item>
            </span>
            <img src="@/assets/logo.png" class="img" />
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
}
</script>

<style scoped >
.breadcrumb {
    background-color: DodgerBlue;
    width: 100%;
    height: 15px;
    padding: 20px 24px;
    min-width: 0;
}

.img {
    height: 25px;
    width: 25px;
    float: right;
}
</style>
