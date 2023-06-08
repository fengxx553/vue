<template>
    <div class="menu">
        <el-menu router="true" default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            :collapse="false" id="frozen-section" >
            <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                首页
            </el-menu-item>
            <el-submenu :index="index + ''" v-for="(item, index) in routerslist" :key="index">
                <template slot="title">
                    <i :class="item.icon"></i>
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
import { mapState } from 'vuex';

export default {
    data() {
        return {
        }
    },
    mounted() {
        this.$store.dispatch('initrouters')
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
        ...mapState(['routerslist'])
    }
}
</script>

<style scoped >
.el-menu-vertical-demo:not(.el-menu--collapse) {
    position: relative;
    height: 100vh;
    min-width: 155px;
}

.menu {
    width: 155px;
}

.el-submenu .el-menu-item {
    min-width: 100%;
}
</style>
