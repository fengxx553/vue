<template>
    <div>
        <el-table style="width: 100%" :data="tabledata" @expand-change="zhankai">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="食品名称">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="餐馆名称">
                            <span>{{ props.row.restaurant.name }}</span>
                        </el-form-item>
                        <el-form-item label="食品ID">
                            <span>{{ props.row.item_id }}</span>
                        </el-form-item>
                        <el-form-item label="餐馆ID">
                            <span>{{ props.row.restaurant_id }}</span>
                        </el-form-item>
                        <el-form-item label="食品介绍">
                            <span>{{ props.row.description }}</span>
                        </el-form-item>
                        <el-form-item label="餐馆地址">
                            <span>{{ props.row.restaurant.address }}</span>
                        </el-form-item>
                        <el-form-item label="食品评分">
                            <span>{{ props.row.rating }}</span>
                        </el-form-item>
                        <el-form-item label="食品分类">
                            <span>{{ props.row.menu.name }}</span>
                        </el-form-item>
                        <el-form-item label="月销量">
                            <span>{{ props.row.month_sales }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="食品名称" prop="name"> </el-table-column>
            <el-table-column label="食品介绍" prop="description"> </el-table-column>
            <el-table-column label="评分" prop="rating"> </el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button @click="editor(row)">编辑</el-button>
                    <el-button type="danger" @click="deletefood(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="count" @current-change="handleCurrentChange"></el-pagination>
        <el-dialog title="修改食品信息" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-width="80">
                <el-form-item label="食品名称">
                    <el-input size="mini" v-model="form.name" class="input"></el-input>
                </el-form-item>
                <el-form-item label="食品介绍">
                    <el-input size="mini" v-model="form.description" class="input"></el-input>
                </el-form-item>
                <el-form-item label="食品食品分类">
                    <el-select v-model="form.menu.id" size="mini">
                        <el-option v-for="item in selection" :key="item.id" :label="item.name" :value="item.id" class="select">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="食品图片">
                    <el-upload class="avatar-uploader" action="https://elm.cangdu.org/v1/addimg/avatar"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="form.image_path" :src="`https://elm.cangdu.org/img/${form.image_path}`" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-table border size="mini" :data="form.specfoods">
                        <el-table-column label="规格" prop="specs_name"> </el-table-column>
                        <el-table-column label="包装费" prop="packing_fee"> </el-table-column>
                        <el-table-column label="价格" prop="price"> </el-table-column>
                        <el-table-column label="操作">
                            <template #default="{ row }">
                                <el-button type="danger" @click="deletespecfood(row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" @click="opengform" class="btn">添加规格</el-button>
                </el-form-item>
            </el-form>
            <el-button type="primary" class="btn1" @click="updata">确定</el-button>
            <el-button class="btn1" @click="dialogFormVisible = false">取消</el-button>
        </el-dialog>
        <el-dialog :visible.sync="dialogFormVisible1" title="添加规格">
            <el-form :model="gform" label-width="80">
                <el-form-item label="规格">
                    <el-input v-model="gform.specs_name" class="input"></el-input>
                </el-form-item>
                <el-form-item label="包装费">
                    <el-input-number v-model="gform.packing_fee" :min=0 :max=5000></el-input-number>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input-number v-model="gform.price" :min=0 :max=5000></el-input-number>
                </el-form-item>
            </el-form>
            <el-button type="primary" class="btn1" @click="closegform">确定</el-button>
            <el-button class="btn1" @click="dialogFormVisible1 = false">取消</el-button>
        </el-dialog>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
    data() {
        return {
            offset: 0,
            limit: 20,
            tabledata: [],
            form: { menu: {} },
            gform: {
                specs_name: '',
                packing_fee: 1,
                price: 20,
            },
            selection: [],
            dialogFormVisible: false,
            dialogFormVisible1: false,
            count:0,
        };
    },
    methods: {
        handleCurrentChange(val) {
      this.offset = (val - 1) * this.limit;
      this.getfooddata()
    },
        async deletefood(row) {
            try {
                let res = await this.$API.deletefood(row.item_id)
                this.$message({
                    type: 'success',
                    message: res.data.message
                })
            } catch (error) {
                console.error(error)
            }
        },

        async updata() {
            // let restaurant_address = this.form.restaurant.address
            // let restaurant_name = this.form.restaurant.name
            // let new_category_id = this.form.menu.id
            // let { category_id, category_name, description, image_path, index, item_id, 
            //     month_sales, name, rating, restaurant_id, specfoods } = this.form
            // let specs = specfoods.map(item => {
            //     return {
            //         specs: item.specs_name,
            //         packing_fee: item.packing_fee,
            //         price: item.price
            //     }
            // })
            // let data = {
            //     category_id, category_name, description, image_path, index, item_id, month_sales, name,
            //      rating, restaurant_id, specfoods, specs, new_category_id,
            //     restaurant_name, restaurant_address
            // }
            let { restaurant, menu, ...rest } = this.form;
            let { id: new_category_id } = menu;
            let { specfoods, ...item } = rest;
            let specs = specfoods.map(({ specs_name, packing_fee, price }) => ({ specs: specs_name, packing_fee, price }));
            let data = { ...item, specs, new_category_id, restaurant_name: restaurant.name, restaurant_address: restaurant.address };

            try {
                await this.$API.setfoods(data)
                this.$message({
                    type: 'success',
                    message: '成功'
                })
                this.dialogFormVisible = false;
                this.getfooddata();
            } catch (error) {
                console.log(error)
            }




        },
        async getfooddata() {
            let { offset, limit, restaurant_id } = this;
            let res = await this.$API.getfoods(offset, limit, restaurant_id);
            if (res.status == 200) {
                let arr = res.data;
                arr.map((item) => {
                    this.$set(item, "restaurant", {});
                    this.$set(item, "menu", {});
                });

                this.tabledata = res.data;
            }
        },
        async getshoppingrestaurant(a) {
            this.loading = true;
            // if (a.restaurant_id) return
            try {
                let res = await this.$API.getshoppingrestaurant(a.restaurant_id);
                let res1 = await this.$API.getshoppingmenu(a.category_id);
                if (res1.status == 200 && res.status == 200) {
                    return { restaurant: res.data, menu: res1.data };
                }
            } catch (error) {
                console.error(error);
            }
        },
        async zhankai(a,key) {
            if (key.length !== 0) {
                let data = await this.getshoppingrestaurant(a);
                let { restaurant, menu } = data;
                a.restaurant = restaurant;
                a.menu = menu;
                this.loading = false;
            }
        },
        async getmenulist(row) {
            let res = await this.$API.getshoppingmenu(row.restaurant_id, true);
            if (res.status == 200) {
                let arr = res.data;
                //去重
                let arrs = arr.reduce((prev, cur) => {
                    if (!prev.some((item) => item.id === cur.id)) {
                        prev.push(cur);
                    }
                    return prev;
                }, []);
                this.selection = arrs;
            }
        },
        //深拷贝
        deepCopy(obj) {
            if (typeof obj !== "object" || obj === null) {
                return obj;
            }
            let copy = Array.isArray(obj) ? [] : {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    copy[key] = this.deepCopy(obj[key]);
                }
            }
            return copy;
        },
        async editor(row) {
            this.form = { menu: {} }
            await this.zhankai(row,[{}]);
            this.dialogFormVisible = true;
            await this.getmenulist(row);
            this.form = this.deepCopy(row);
        },
        handleAvatarSuccess(res, file) {
            this.form.image_path = res.image_path;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        opengform() {
            this.gform = {
                specs_name: '',
                packing_fee: 1,
                price: 20,
            }
            this.dialogFormVisible1 = true
        },
        deletespecfood(row) {
            this.form.specfoods = this.form.specfoods.filter(item => item._id != row._id)
        },
        closegform() {
            this.form.specfoods.push({ _id: uuidv4(), ...this.gform })
            this.dialogFormVisible1 = false
        },
        getshoppingcount(){
            this.$API.getshoppingcount().then(res=>{
                if(res.status==200){
                    this.count=res.data.count
                }
            })
        }
    },
    mounted() {
        this.getfooddata();
        this. getshoppingcount()
    },
};
</script>

<style scoped >
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.input {
    width: 330px;
}

.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.btn {
    position: relative;
    left: 40%;
    top: 20px;
}

.btn1 {
    position: relative;
    left: 440px;
}
.select{
   width: 100px;
}
</style>
