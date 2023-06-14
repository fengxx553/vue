<template>
    <div >
        <el-menu :router=true default-active="$route.path" class="el-menu-vertical-demo" :collapse="false"
            id="frozen-section" :unique-opened="true" background-color="#545c64" text-color="#fff"
            active-text-color="#ffd04b" :default-openeds="openeds">
            <el-scrollbar class="scrollbar" wrap-style="overflow-x:hidden;">
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
            </el-scrollbar>
        </el-menu>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            openeds: ['0']
        }
    },
    mounted() {
        this.$store.dispatch('initrouters')
    },
    methods: {
    },
    //计算属性
    computed: {
        ...mapState(['routerslist'])
    }
}
</script>

<style scoped >
.scrollbar {
    height: 100vh;
    Overflow: hidden;
}

.el-menu-vertical-demo {
    width: 200px;
    height: 100vh
}
</style>
