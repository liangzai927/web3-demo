let initEcharts = () => {
  let base = +moment("2020-01-01 10:00:00").format("x");
  var oneDay = 24 * 1000 * 60 * 60;
  let onMin = 1000 * 15;

  var date = [];

  var data = [];

  for (var i = 1; i < 198; i++) {
    date.push(moment(base).format("HH:mm:ss"));
    base += onMin;
    data.push(Math.round((Math.random() + 2) * (Math.random() * 100)));
  }

  base += onMin;
  date.push(moment(base).format("HH:mm:ss"));

  let option = {
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "10%"];
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: date,
      axisLine: {
        lineStyle: {
          color: "rgba(221, 221, 221, 1)",
          width: 1, //这里是为了突出显示加上的
        },
      },
      axisLabel: {
        interval: 3, // x轴数据显示设置；0：则显示所有的；1：隔一个显示一个
        textStyle: {
          color: "rgba(153, 153, 153, 1)",
          fontSize: "21px",
        },
      },
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
        start: 90,
        end: 100,
      },
    ],
    series: [
      {
        name: "模拟数据",
        type: "line",
        smooth: true,
        symbol: "none",
        sampling: "average",
        itemStyle: {
          color: "rgba(255, 115, 52, 1)",
        },
        lineStyle: {
          width: 1,
        },
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
        data: data,
        markLine: {
          data: [
            {
              type: "max",
              name: "最大值",
              itemStyle: {
                color: "#2E90D1",
              },
            },
            {
              xAxis: "10:49:00",
              itemStyle: {
                color: "rgba(55, 201, 137, 1)",
              },
            },
            {
              xAxis: "10:49:30",
              itemStyle: {
                color: "rgba(243, 78, 78, 1)",
              },
            },
          ],
        },
        markPoint: {
          data: [
            {
              yAxis: 100,
              itemStyle: {
                color: "pink",
              },
            },
          ],
        },
      },
    ],
  };

  var myChart = echarts.init(document.getElementById("main"));
  // myChart.showLoading();
  myChart.setOption(option);

  option.dataZoom = [
    {
      type: "inside",
    },
  ];

  let flag = 0;

  setInterval(() => {
    flag++;
    // let now = (base += onMin);
    date.push(moment(base).format("HH:mm:ss"));
    data.push(Math.round((Math.random() + 2) * (Math.random() * 100)));
    if (flag == 6) {
      option.series[0].markLine.data[1].xAxis = "";
      option.series[0].markLine.data[1].xAxis = moment(base).format(
        "HH:mm:ss"
      );
    }
    if (flag == 8) {
      flag = 0;
      option.series[0].markLine.data[2].xAxis = "";
      option.series[0].markLine.data[2].xAxis = moment(base).format(
        "HH:mm:ss"
      );
    }
    myChart.setOption(option);
    base += onMin;
  }, 1000);
}