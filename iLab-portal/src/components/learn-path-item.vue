<template>
  <div class="learnPath-item-comp" @click="goDetail">
    <div class="learnPath-thumb">
      <div class="thumb-bar">
        <thumb-bar :value="thumb" :width="264" :height="198"></thumb-bar>
      </div>
    </div>
    <div class="learnPath-body">
      <div class="learnPath-title">{{ name }}</div>
      <div class="learnPath-count">
        <div class="courses-count">包含{{ coursesCount }}门课程</div>
        <div class="learnpath-course-charge" v-if="charge > 0">
          <small>￥</small>{{ charge }}
        </div>
        <div class="green-free" v-if="charge === 0">免费</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "cid",
    "name",
    "charge",
    "desc",
    "coursesCount",
    "originalCharge",
    "stepsCount",
    "thumb",
  ],
  methods: {
    goDetail() {
      this.$router.push({
        name: "learnPathDetail",
        query: {
          id: this.cid,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.learnPath-item-comp {
  width: 264px;
  height: 273px;
  float: left;
  display: flex;
  background: #ffffff;
  border-radius: 8px;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 4px 8px 0px rgba(102, 102, 102, 0.1);
    .learnPath-thumb {
      .thumb-bar {
        transform: scale(1.1, 1.1);
      }
    }
  }
  .learnPath-thumb {
    width: 100%;
    height: 198px;
    border-radius: 8px 8px 0px 0px;
    overflow: hidden;
    .thumb-bar {
      width: 100%;
      height: 100%;
      transition: all 0.3s;
    }
  }
  .learnPath-body {
    width: 100%;
    height: auto;
    background: #ffffff;
    border-radius: 0px 0px 8px 8px;
    box-sizing: border-box;
    padding: 15px 10px;
    .learnPath-title {
      width: 100%;
      height: 20px;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      line-height: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 20px;
    }
    .learnPath-count {
      width: 100%;
      height: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .courses-count {
        height: 14px;
        font-size: 14px;
        font-weight: 400;
        color: #999999;
        line-height: 14px;
      }
      .learnpath-course-charge {
        height: 20px;
        font-size: 20px;
        font-weight: 600;
        color: #ef4444;
        line-height: 20px;
        small {
          font-size: 14px;
        }
      }
      .green-free {
        height: 20px;
        font-size: 14px;
        font-weight: 600;
        color: #04c877;
        line-height: 20px;
      }
    }
  }
}
</style>
