<template>
    <div>
        <h4 class="container">选择食品种类</h4>
        <el-card class="card1">
            <div class="item_boder">
                <el-form>
                    <el-form-item label="食品种类" class="form">
                        <el-input placeholder="请输入食品种类" class="input_width"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <transition name="fade">
                <div class="foodtypeform" v-if="is_foodtypeform">
                    <el-form>
                        <el-form-item label="食品种类" class="form form-item">
                            <el-input class="input_width"></el-input>
                        </el-form-item>
                        <el-form-item label="种类描述" class="form">
                            <el-input class="input_width"></el-input>
                        </el-form-item>
                        <el-form-item class="form">
                            <el-button type="primary">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </transition>
                   
            <div class="container">
                <i class="el-icon-caret-bottom" v-if="!is_foodtypeform"></i>
                <i class="el-icon-caret-top" v-else></i>
                <span @click="foodtypeopen" class="span1">添加食品种类</span>
            </div>
        </el-card>
    </div>
</template>

<script>
import "animate.css";

export default {
    data() {
        return {
            is_foodtypeform: false,
        };
    },
    components: { },
    mounted() { },
    methods: {
        foodtypeopen() {
            this.is_foodtypeform = !this.is_foodtypeform;
        },
    },
};
</script>
<style scoped>
.foodtypeform {
    margin-top: -2px;
    background-color: #f9fafc;
    height: 185px;
    width: 100%;
}
.input_width {
    width: 400px;
}
.form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
}
.form-item {
    position: relative;
    top: 5px;
}

.item_boder {
    border-bottom: 1px solid #eaeefb;
    width: 100%;
    height: auto;
}

.card1 {
    width: 800px;
    position: relative;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0%);
}
.span1 {
    cursor: pointer;
}

.btn1 {
    margin-left: 110px;
    /* margin-top: -5px; */
}
@keyframes height {
    0% {
        height: 0px;
    }
    100% {
        height: 185px;
    }
}
.fade-enter-active, .fade-leave-active {
    transition: all 3s;
}
.fade-leave-active,.fade-enter-active {
    transition: height 3s reverse;
  
}
</style>
<style >
.el-card__body {
    padding: 0;
}
</style>
