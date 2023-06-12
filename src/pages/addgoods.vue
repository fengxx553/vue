<template>
    <div>
        <h4 class="container title">选择食品种类</h4>
        <el-card class="card1">
            <div class="item_boder">
                <el-form class="form_width" label-width="90px" label-position="right" :model="foodform">
                    <el-form-item label="食品种类">
                        <el-select class="input_width" v-model="foodform.category_id">
                            <el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <transition name="fade">
                <div class="foodtypeform" v-if="is_foodtypeform">
                    <el-form class="form_width" label-width="90px" label-position="right" :model="classform">
                        <el-form-item label="食品种类">
                            <el-input class="input_width" v-model="classform.name"></el-input>
                        </el-form-item>
                        <el-form-item label="种类描述">
                            <el-input class="input_width" v-model="classform.description"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" class="btn" @click="setclassform">提交</el-button>
                </div>
            </transition>
            <div class="container buttom">
                <i class="el-icon-caret-bottom  header-icon" v-if="!is_foodtypeform"></i>
                <i v-else class="el-icon-caret-top header-icon"></i>
                <span @click="foodtypeopen">添加食品种类</span>
            </div>
        </el-card>

        <h4 class="container title">添加食品</h4>
        <el-card class="card1">
            <el-form label-width="90px" label-position="right" class="form_width" :model="foodform">
                <el-form-item label="食品名称">
                    <el-input class="input_width" v-model="foodform.name"></el-input>
                </el-form-item>
                <el-form-item label="食品活动">
                    <el-input class="input_width" v-model="foodform.activity"></el-input>
                </el-form-item>
                <el-form-item label="食品详情">
                    <el-input class="input_width" v-model="foodform.description"></el-input>
                </el-form-item>
                <el-form-item label="上传食品图片">
                    <template>
                        <el-upload class="avatar-uploader" action="https://elm.cangdu.org/v1/addimg/food"
                            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
                            list-type="picture-card">
                            <img v-if="foodform.image_path" :src="`https://elm.cangdu.org/img/${foodform.image_path}`"
                                class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </template>
                </el-form-item>
                <el-form-item label="食品特点">
                    <el-select v-model="foodform.attributes" multiple class="select_color">
                        <el-option v-for="item in attributeslist" :key="item.value" :label="item.label" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="食品规格">
                    <el-radio-group v-model="radio" @change="setradio()">
                        <el-radio :label="true">单规格</el-radio>
                        <el-radio :label="false">多规格</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div v-if="radio">
                    <el-form-item label="包装费">
                        <el-input-number v-model="specslist[0].packing_fee" :min="1" :max="2000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="价格">
                        <el-input-number v-model="specslist[0].price" :min="1" :max="2000"></el-input-number>
                    </el-form-item>
                </div>
                <div v-else>
                    <el-button type="primary" class="btn" @click="dialogFormVisible = true">添加规格</el-button>
                    <el-table border :data="specslist" class="tab">
                        <el-table-column label="规格" prop="specs"></el-table-column>
                        <el-table-column label="包装" prop="packing_fee"></el-table-column>
                        <el-table-column label="价格" prop="price"></el-table-column>
                        <el-table-column label="操作">
                            <template #default="{ row, $index }">
                                <el-button type="danger" @click="deletespecs(row, $index)"
                                    v-if="row.specs != '默认'">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-form>
            <el-button type="primary" class="btn" @click="addgood">确认添加食品</el-button>
        </el-card>
        <el-dialog title="添加规格" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
            <el-form :model="specsform">
                <el-form-item label="规格" label-width="50px">
                    <el-input v-model="specsform.specs" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="包装费" label-width="50px">
                    <el-input v-model="specsform.packing_fee" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="价格" label-width="50px">
                    <el-input v-model="specsform.price" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="setspecslist">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogFormVisible: false,
            is_foodtypeform: false,
            radio: true,
            classform: {},
            category: [],
            foodform: {
                restaurant_id: "",
                category_id: "",
                image_path: "",
                name: "",
                description: "",
                activity: "",
                attributes: [],
                specs: [],
            },
            attributeslist: [{
                value: '新',
                label: '新品'
            }, {
                value: '招牌',
                label: '招牌'
            },],
            specslist: [{
                specs: '默认', packing_fee: 0, price: 20,
            }],
            specsform: {},
            //             |restaurant_id      |Y       |int   | 餐馆ID |
            // |category_id      |Y       |int   | 分类ID |
            // |name      |Y       |string   | 食品名称 |
            // |image_path      |Y       |string   | 图片地址 |
            // |specs      |Y       |array   | 规格： [{specs: '默认',packing_fee: 0,price: 20,}]|
            // |description      |N       |string   |描述 |
            // |activity      |N      |string   |活动 |
            // |attributes      |N       |array   |特点：[{value: '新',label: '新品'}] |
        };
    },
    components: {},
    mounted() {
        this.open();
        this.getcategory()
    },
    methods: {
       async addgood() {
            this.init()
            let res=await this.$API.addgoods(this.foodform)
            if(res.status==200){
                this.$message({
                    type:'success',
                    message: res.data.success

                })
                this.$router.push({
                    name:"foodlist"
                })
            }
        },
        init() {
            this.foodform.specs = this.specslist
            this.foodform.restaurant_id = this.$route.params.id
        },
        deletespecs(row, $index) {
            this.specslist.splice($index, 1);
        },
        setspecslist() {
            this.specsform.price=parseInt(this.specsform.price)
            this.specsform.packing_fee=parseInt(this.specsform.packing_fee)
            this.specslist.push(this.specsform);
            this.specsform = {};
            this.dialogFormVisible = false;
        },
        handleAvatarSuccess(res, file) {
            this.foodform.image_path = res.image_path
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        foodtypeopen() {
            this.is_foodtypeform = !this.is_foodtypeform;
        },
        open() {
            if (this.$route.params.id == undefined) {
                this.$confirm('未选择商家请商家，列表前往选择商家后填写', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'primary'
                }).then(() => {
                    this.$router.push({
                        name: "businesslist"
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }

        },
        async setclassform() {
            let restaurant_id = this.$route.params.id;
            let res = await this.$API.setclassform({ ...this.classform, restaurant_id })
            if (res.status == 200) {
                this.$message({
                    type: 'info',
                    message: res.data.success
                })
                this.classform = {}
            }
        },
        async getcategory() {
            let id = this.$route.params.id;
            if (id != undefined) {
                let res = await this.$API.getcategory(id)
                if (res.status == 200) {
                    let arr = res.data.category_list
                    //去重
                    let arrs = arr.reduce((prev, cur) => {
                        if (!prev.some((item) => item.id === cur.id)) {
                            prev.push(cur);
                        }
                        return prev;
                    }, []);
                    this.category = arrs
                }
            }
        },
        setradio() {
            if (this.radio) {
                this.$confirm('此操作将清空多规格表格记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    showClose:false,
                }).then(() => {
                    this.specslist = [{
                        specs: '默认', packing_fee: 0, price: 20,
                    }]
                    this.$message({
                        type: 'success',
                        message: '清空成功'
                    });
                }).catch(() => {
                    this.radio=false;
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    },
};
</script>
<style scoped>
.btn {
    display:block;
    margin:3px auto;
}

.foodtypeform {
    height: 185px;
    width: 100%;
    overflow: hidden;
    background-color: #F5F5F5;
}

.form_width {
    margin: 15px 0px 20px 0px;
}

.input_width {
    width: 650px
}

.card1 {
    position: relative;
    top: 5px;
    left: 50%;
    width: 800px;
    transform: translate(-50%)
}

span {
    cursor: pointer;
}

@keyframes heights {
    0% {
        height: 0
    }

    to {
        height: 185px
    }
}

.fade-enter-active {
    animation: heights .5s
}

.fade-leave-active {
    animation: heights .5s reverse
}

.title {
    margin: 70px 0 10px
}

.buttom {
    margin: 10px 0;
    color: #F5F5F5;
}

.header-icon {
    font-size: 20px
}

.buttom:hover * {
    color: #20a0ff
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
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
}

.avatar {
    width: 148px;
    height: 148px;
    display: block;
}
.tab{
    margin: 0 30px;
    width: 740px;
}
</style>
<style >
.el-card__body {
    padding: 0;
}

.el-tag.el-tag--info {
    background-color: rgba(32, 160, 255, .1);
    border-color: rgba(32, 160, 255, .2);
    color: #20a0ff;
}
</style>
