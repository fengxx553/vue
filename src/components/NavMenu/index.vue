<template>
    <div class="menu">
        <el-menu router default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            :collapse="false" id="frozen-section">
            <el-menu-item index="/">
                首页
            </el-menu-item>
            <el-submenu :index="index + ''" v-for="(item, index) in routerslist" :key="index">
                <template slot="title">
                    <span slot="title">{{ item.uname }}</span>
                </template>
                <el-menu-item :index="list.path" v-for="(list, index) in item.children" :key="index">
                    {{ list.meta.title }}
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        }
    },
    //计算属性
    computed: {
        routerslist() {
            return this.$store.getters.routerslist
        }
    }
}
</script>

<style scoped >
.el-menu-vertical-demo:not(.el-menu--collapse) {
    position: relative;
    height: 100vh;
    min-width: 144px;
}

.menu {
    width: 144px;
}

.el-submenu .el-menu-item {
    min-width: 100%;
}
</style>
