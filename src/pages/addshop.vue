<template>
  <div>
    <el-form>
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <span>当前城市：</span>
      <el-form-item label="联系电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="店铺介绍">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="店铺标语">
        <el-input v-model="form.promotion_info"></el-input>
      </el-form-item>
      <el-form-item label="店铺分类">
        <el-select v-model="form.category">
          <el-option key="item.value" label="item.label" value="item.value">
          </el-option>
        </el-select>
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
        <el-input-number v-model="form.float_delivery_fee"></el-input-number>
      </el-form-item>
      <el-form-item label="起送价">
        <el-input-number
          v-model="form.float_minimum_order_amount"
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
      <el-form-item label="上传店铺图像"> </el-form-item>
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
        //|name      |Y       |string   | 餐馆名称 |
        // |address      |Y       |string   | 餐馆地址 |
        // |phone      |Y       |int   |联系电话 |
        // |latitude      |Y       |string   | 纬度 |
        // |longitude      |Y       |string   | 经度 |
        // |category      |Y      |string   |食品分类 |
        // |image_path      |Y       |string   |店铺图片地址 |
        // |float_delivery_fee      |Y       |int   | 运费|
        // |float_minimum_order_amount      |Y       | init   | 起送价 |
        // |description      |N      |string   | 餐馆介绍 |
        // |promotion_info      |N       |string   | 店铺标语 |
        // |is_premium      |N       |boolean   | 品牌商铺,默认false |
        // |delivery_mode      |N       |boolean   | 支持蜂鸟专送，默认false |
        // |new      |N      |boolean   |新开店铺，默认false|
        // |bao      |N       |boolean   |支持保险，默认false|
        // |zhun      |N       |boolean   |准时达，默认false|
        // |piao      |N       |boolean   |开发票，默认false|
        // |startTime      |N       |string   |开始营业时间 |
        // |endTime      |N       |string   |停止营业时间 |
        // |business_license_image      |N       |string   |营业执照图片地址 |
        // |catering_service_license_image      |N       |string   |餐饮服务许可证图片地址 |
        // |catering_service_license_image      |N       |string   |餐饮服务许可证图片地址 |
        // |activities      |N      |array   | 商铺活动：示例：[{icon_name:'新', name:'新用户立减', description: ''}]|
      },
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
      let { latitude, longitude } =a;
      let res = await this.$API.getshoplist(latitude, longitude);
      if (res.status == 200) {
        console.log(res.data);
      }
    },
  },
};
</script>
<style scoped>
</style>