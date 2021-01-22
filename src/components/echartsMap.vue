<template>
  <div>
    <div class="nowEcharts" id="main"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import moment from "moment";
export default {
  data() {
    return {};
  },
  methods: {
    async initEcharts() {
      function randomData() {
        now = new Date(+now + oneDay);
        value = value + Math.random() * 21 - 10;
        var valueName =
          now.getFullYear() +
          "/" +
          (now.getMonth() + 1) +
          "/" +
          now.getDate() +
          " " +
          (now.getHours() >= 10 ? now.getHours() : "0" + now.getHours()) +
          ":" +
          (now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes()) +
          ":" +
          (now.getSeconds() >= 10 ? now.getSeconds() : "0" + now.getSeconds());

        return {
          name: now.toString(),
          value: [valueName, Math.round(value)],
        };
      }

      var data = [];
      var now = +new Date();
      var oneDay = 1000;
      //var oneDay = 24 * 3600 * 1000;
      var value = Math.random() * 1000;
      for (var i = 0; i < 1000; i++) {
        data.push(randomData());
      }

      // var temp = 59;
      // let startValue =

      let option = {
        title: {
          text: "动态数据 + 时间坐标轴",
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return (
              date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear() +
              " : " +
              params.value[1]
            );
          },
          axisPointer: {
            animation: false,
          },
        },
        xAxis: {
          type: "time",
          minInterval: 1000 * 60,
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(221, 221, 221, 1)",
              width: 1, //这里是为了突出显示加上的
            },
          },
          triggerEvent: true,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          position: "right",
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(221, 221, 221, 1)",
              width: 1,
            },
          },
          axisTick: {
            show: false,
          },
          minorTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            formatter: function () {
              return "";
            },
          },
        },
        dataZoom: [
          {
            type: "inside",
            start: 100,
            // end: 100,
            minValueSpan: 1000 * 60 * 3,
            maxValueSpan: 5000 * 60,
          },
        ],
        series: [
          {
            name: "模拟数据",
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            markPoint: {
              data: [
                // {
                //   symbol: "none",
                //   x: "95%",
                //   yAxis: data[data.length - 1].value[1],
                // },
                {
                  symbol: "none",
                  // label: {
                  //   normal: {
                  //     position: "start",
                  //     formatter: "实时数据\n{c}",
                  //   },
                  // },
                  name: "实时数据",
                  value: data[data.length - 1].value[1],
                  xAxis: data[data.length - 1].value[0],
                  yAxis: data[data.length - 1].value[1],
                },
              ],
            },
            data: data,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255, 230, 205, 1)",
                },
                {
                  offset: 1,
                  color: "rgba(255, 255, 255, 1)",
                },
              ]),
            },
            markLine: {
              data: [],
            },
            itemStyle: {
              color: "rgba(255, 115, 52, 1)",
            },
            lineStyle: {
              width: 1,
            },
          },
        ],
      };

      var myChart = echarts.init(document.getElementById("main"));
      // myChart.showLoading();
      myChart.setOption(option);

      let flag = 0;

      setInterval(function () {
        flag++;
        data.push(randomData());
        // if (flag == 1) {
        // }
        //alert(data[999].name)
        myChart.setOption({
          series: [
            {
              data: data,

              markLine: {
                data: [
                  [
                    {
                      symbol: "none",
                      x: "95%",
                      yAxis: data[data.length - 1].value[1],
                    },
                    {
                      symbol: "circle",
                      label: {
                        normal: {
                          position: "start",
                          formatter: "实时数据\n{c}",
                        },
                      },
                      name: "实时数据",
                      value: data[data.length - 1].value[1],
                      xAxis: data[data.length - 1].value[0],
                      yAxis: data[data.length - 1].value[1],
                    },
                  ],
                ],
              },
            },
          ],
        });
      }, 1000);
    },
  },
  mounted() {
    this.initEcharts();
  },
};
</script>
<style scoped>
.nowEcharts {
  width: 100%;
  height: 300px;
  margin-bottom: 0.3rem;
}
</style>