<template>
  <div class="meedu-main-body" style="width: 100%; height: 100%;">
    <back-bar class="mb-30" title="学生学习情况统计"></back-bar>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="hover">
          <div id="bar-chart" class="chart"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <div id="pie-chart" class="chart"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <el-table
            :data="students"
            style="width: 100%; height: 250px">
            <el-table-column
              prop="name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="hours"
              label="学习时长（小时）"
              width="180">
            </el-table-column>
            <el-table-column
              prop="courses"
              label="完成课程数">
            </el-table-column>
            <el-table-column
              prop="score"
              label="平均分数">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card shadow="hover">
          <div id="line-chart" class="chart"></div>
        </el-card>
      </el-col>
    </el-row>
    <div class="container">


    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      students: [
        {name: "万xx", hours: 10, courses: 3, score: 85},
        {name: "李xx", hours: 8, courses: 2, score: 90},
        {name: "王xx", hours: 12, courses: 4, score: 80},
        {name: "赵xx", hours: 6, courses: 1, score: 95},
        {name: "孙xx", hours: 9, courses: 3, score: 88},
      ],
    };
  },
  mounted() {
    this.renderBarChart();
    this.renderPieChart();
    this.renderLineChart();
  },
  methods: {
    renderBarChart() {
      const barChart = echarts.init(document.getElementById("bar-chart"));
      const option = {
        title: {
          text: "学习时长（小时）",
        },
        tooltip: {},
        xAxis: {
          data: this.students.map((student) => student.name),
        },
        yAxis: {},
        series: [
          {
            type: "bar",
            data: this.students.map((student) => student.hours),
          },
        ],
      };
      barChart.setOption(option);
    },
    renderPieChart() {
      const pieChart = echarts.init(document.getElementById("pie-chart"));
      const option = {
        title: {
          text: "完成课程数",
        },
        tooltip: {},
        series: [
          {
            type: "pie",
            data: this.students.map((student) => ({
              name: student.name,
              value: student.courses,
            })),
          },
        ],
      };
      pieChart.setOption(option);
    },
    renderLineChart() {
      const lineChart = echarts.init(document.getElementById("line-chart"));
      const option = {
        title: {
          text: "平均分数",
        },
        tooltip: {},
        xAxis: {
          data: this.students.map((student) => student.name),
        },
        yAxis: {},
        series: [
          {
            type: "line",
            data: this.students.map((student) => student.score),
          },
        ],
      };
      lineChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.container {
  width: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-gap: 10px;
}


.chart {
  width: 100%;
  height: 250px;
}

th,
td {
  border: solid;
}
</style>
