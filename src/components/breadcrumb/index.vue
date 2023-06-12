<template>
    <div class="breadcrumb" id="frozen-section">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <span v-show="this.$route.meta.title">
                <el-breadcrumb-item>{{ this.$route.meta.type }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ this.$route.meta.title }}</el-breadcrumb-item>
            </span>
            <el-popover  placement="top-start"  width="10" trigger="hover" class="popover">
                <span style="width: 20px;" class="span1" @click="$router.push({path:'/userslist'})">首页</span>
                <br/>
                <span @click="outuser" class="span1">退出</span>
                <span slot="reference"><img :src="`https://elm.cangdu.org/img/${userinfo.avatar}`" class="img" /></span>
            </el-popover>

        </el-breadcrumb>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState(['userinfo'])
    },
    methods: {
     async   outuser(){
            let res=await this.$API.outuser()
                if(res.status==200){
                    this.$message({
                        type:"progress",
                        message:"退出成功"
                    })
                    this.$stort.dispatch('outuser')
                    this.$router.push({name:"login"})
                }
        }
    }
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
    height: 40px;
    width: 40px;
    border: 2px solid black;
    border-radius: 50%;
}
.popover{
    position: relative;
    left: 1100px;
    top: -15px;
}
.span1 {
    padding: 2px 15px;
    font-size: 20px;
}
</style>
