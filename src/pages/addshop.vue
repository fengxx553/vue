<template>
  <div>
    <el-form class="form" label-width="85px">
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="form.name" class="input_with"></el-input>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input
          v-model="form.address"
          class="input_with"
          @focus="getadderss"
        ></el-input>
        <br />
        <span class="span_title"
          >当前城市：{{ $store.state.userinfo.city }}</span
        >
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.phone" class="input_with"></el-input>
      </el-form-item>
      <el-form-item label="店铺介绍">
        <el-input v-model="form.description" class="input_with"></el-input>
      </el-form-item>
      <el-form-item label="店铺标语">
        <el-input v-model="form.promotion_info" class="input_with"></el-input>
      </el-form-item>
      <el-form-item label="店铺分类">
        <el-cascader
          v-model="shoplistvalue"
          :options="shoplist"
          :props="{
            expandTrigger: 'hover',
            value: 'name',
            label: 'name',
            children: 'sub_categories',
          }"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="店铺特点">
        <el-switch inactive-text="品牌保证" v-model="form.is_premium">
        </el-switch>
        <el-switch inactive-text="蜂鸟专送 " v-model="form.delivery_mode">
        </el-switch>
        <el-switch inactive-text=" 新开店铺 " v-model="form.new"> </el-switch>
        <el-switch inactive-text="外卖保" v-model="form.bao"> </el-switch>
        <el-switch inactive-text="准时达" v-model="form.zhun"> </el-switch>
        <el-switch inactive-text="开发票" v-model="form.piao"> </el-switch>
      </el-form-item>
      <el-form-item label="配送费">
        <el-input-number
          v-model="form.float_delivery_fee"
          :min="0"
          :max="2000"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="起送价">
        <el-input-number
          v-model="form.float_minimum_order_amount"
          :min="0"
          :max="2000"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="营业时间">
        <el-time-select
          placeholder="起始时间"
          v-model="form.startTime"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
          }"
        >
        </el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="form.endTime"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
            minTime: form.startTime,
          }"
        >
        </el-time-select>
      </el-form-item>
      <el-form-item label="上传店铺图像">
        <el-upload
          class="avatar-uploader"
          action="https://elm.cangdu.org/v1/addimg/shop"
          :show-file-list="false"
          :on-success="
            (response, file, fileList) =>
              handleAvatarSuccess(response, file, fileList, 1)
          "
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="form.image_path"
            :src="`https://elm.cangdu.org/img/${form.image_path}`"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传营业执照">
        <el-upload
          class="avatar-uploader"
          action="https://elm.cangdu.org/v1/addimg/shop"
          :show-file-list="false"
          :on-success="
            (response, file, fileList) =>
              handleAvatarSuccess(response, file, fileList, 2)
          "
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="form.business_license_image"
            :src="`https://elm.cangdu.org/img/${form.business_license_image}`"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传餐饮服务许可证">
        <el-upload
          class="avatar-uploader"
          action="https://elm.cangdu.org/v1/addimg/shop"
          :show-file-list="false"
          :on-success="
            (response, file, fileList) =>
              handleAvatarSuccess(response, file, fileList, 3)
          "
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="form.catering_service_license_image"
            :src="`https://elm.cangdu.org/img/${form.catering_service_license_image}`"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="优惠活动">
        <el-select v-model="optionsvalue" @change="settab">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-table :data="optionstab">
        <el-table-column label="活动标题" prop="icon_name"> </el-table-column>
        <el-table-column label="活动名称" prop="name"> </el-table-column>
        <el-table-column label="活动详情" prop="description"> </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row, $index }">
            <el-button type="danger" @click="deletetab(row, $index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="container">
        <el-button type="primary" @click="Submission">立即创建</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        name: "",
        address: "",
        phone: "",
        category: "",
        image_path: "",
        promotion_info: "",
        description: "",
        switch: false,
        float_delivery_fee: "",
        float_minimum_order_amount: "",
        is_premium: false,
        delivery_mode: false,
        new: false,
        bao: false,
        zhun: false,
        piao: false,
        startTime: "",
        endTime: "",
        business_license_image: "",
        catering_service_license_image: "",
        activities: [],
      },
      shoplist: [],
      shoplistvalue: [],
      options: [
        {
          value: "满减优惠",
          label: "满减优惠",
        },
        {
          value: "优惠大酬宾",
          label: "优惠大酬宾",
        },
        {
          value: "新用户立减",
          label: "新用户立减",
        },
        {
          value: "进店领券",
          label: "进店领券",
        },
      ],
      optionsvalue: "",
      optionstab: [
        {
          icon_name: "新",
          name: "新用户立减",
          description: "减减减",
        },
      ],
      restaurants: [],
    };
  },
  components: {},
  computed: {
    ...mapState(["longitudes"]),
  },
  mounted() {
    this.getshoplist(this.longitudes);
  },
  methods: {
    async getshoplist(a) {
      let { latitude, longitude } = a;
      let res = await this.$API.getshoplist(latitude, longitude);
      if (res.status == 200) {
        this.shoplist = res.data;
      }
    },
    handleChange(value) {
      this.form.category = `${value[0]}/${value[1]}`;
    },
    handleAvatarSuccess(res, file, fileList, a) {
      console.log(a);
      //   this.imageUrl = URL.createObjectURL(file.raw);
      switch (a) {
        case 1:
          this.form.image_path = res.image_path;
          break;
        case 2:
          this.form.business_license_image = res.image_path;
          break;
        case 3:
          this.form.catering_service_license_image = res.image_path;
          break;
        default:
      }
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
    settab(val) {
      this.$prompt("请输入活动详情", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          let newObj = {};
          switch (val) {
            case "满减优惠":
              newObj = {
                icon_name: "减",
                name: "满减优惠",
                description: value,
              };
              break;
            case "优惠大酬宾":
              newObj = {
                icon_name: "特",
                name: "优惠大酬宾",
                description: value,
              };
              break;
            case "新用户立减":
              newObj = {
                icon_name: "新",
                name: "新用户立减",
                description: value,
              };
              break;
            case "进店领券":
              newObj = {
                icon_name: "领",
                name: "进店领券",
                description: value,
              };
              break;
          }
          this.optionstab.push(newObj);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    deletetab(row, $index) {
      console.log(row, $index);
      this.optionstab.splice($index, 1);
    },
    async getadderss() {
      let { latitude, longitude } = this.longitudes;
      let res = await this.$API.getadderss(latitude, longitude);
      if (res.status == 200) {
        this.form.address = res.data.address;
      }
    },
    inif() {
      this.form.activities = this.optionstab;
      let { latitude, longitude } = this.longitudes;
      this.form.latitude = latitude;
      this.form.longitude = longitude;
      this.form.phone = parseInt(this.form.phone);
    },
    async Submission() {
      this.inif();
      let res = await this.$API.addshop(this.form);
      if (res.status == 200) {
        this.$message({
          message: res.data.sussess,
          type: "success",
        });
        this.$router.push("/businesslist");
      }
    },
  },
};
</script>
<style>
.input_with {
  width: 800px;
}

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
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}

.avatar {
  width: 80px;
  height: 80px;
  display: block;
}

.form {
  width: 1000px;
  margin: 0 auto;
}

.span_title {
  color: #8c939d;
  font-size: 10px;
}
</style>
