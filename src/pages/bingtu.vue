<template>
  <div>
    <div ref="charts" class="charts"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  components: {},
  mounted() {
    this.getcitycount();
  },
  methods: {
    init(a) {
      let charts = this.$refs.charts;
      let myChart = echarts.init(charts);
      let option;
      option = {
        title: {
          text: "用户分布",
          left: "center",
        },
        tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
        series: [
          {
            name: '访问来源',
      type: 'pie',
      radius: '50%',
            data: a,
          },
        ],
      };
      option && myChart.setOption(option);
    },
    async getcitycount() {
      try {
        const res = await this.$API.getcitycount();
        const object = Object.entries(res.data.user_city).map(
          ([name, value]) => ({ name, value })
        );
        this.init(object);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.charts {
  width: 500px;
  height: 500px;
  margin: 0 auto;
}
</style>
