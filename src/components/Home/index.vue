<template>
    <div id="home">
        <div class="left-cd">
            <NavMenu />
        </div>
        <div class="riger">
            <breadcrumb />
            <div class="card">
                <router-view></router-view>
            </div>
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
    height: 100%;
    width: 100%;
}

.riger {
    width: 85%;
    height: 100%;
}

.card {
    margin: 60px 0 0 7px;
    overflow: hidden;

}

.left-cd {
    width: 13%;
    height: 100%;
    min-width: 200px;
}</style>
