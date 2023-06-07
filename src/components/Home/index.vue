<template>
    <div id="home">
        <NavMenu />
        <div class="riger">
            <breadcrumb />
            <el-card shadow="always" class="card">
                <router-view></router-view>
            </el-card>
        </div>
    </div>
</template>

<script>
import NavMenu from "../NavMenu"
import breadcrumb from '../breadcrumb'
export default {
    data() {
        return {}
    },
    components: {
        NavMenu,
        breadcrumb,
    },
    methods: {},
}
</script>

<style scoped >
#home {
    display: flex;
}

.riger {
    width: 85%;
    height: 100%;
    min-width: 0px;
}
.card{
  width: 104%;
  margin-top:60px;
}
</style>
