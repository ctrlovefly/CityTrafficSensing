<template>
  <!-- <div class="whole-div"> -->
  <el-container class="home-container" direction="vertical">
    <el-header height="50px">
      <div class="left-header">
        <img src="../assets/logo.png" alt="" />
        <span class="title-text">城市交通感知仿真系统</span>
      </div>
      <!-- button -->
      <div class="right-header">
        <span class="scenario-name">
          {{ scenarioname }}
        </span>
        <el-divider direction="vertical"></el-divider>
        <el-avatar> user </el-avatar>
        <!-- 用户头像，根据需要自行修改图片路径 -->

        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click">
          <span class="el-dropdown-link">
            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus"
                >狮子头</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-circle-plus-outline"
                >螺蛳粉</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check"
                >蚵仔煎</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container class="subcontainer">
      <div>
        <Viewer />
        <Sliderbar />
        <ContentList />
        <Satellites />
        <LayerTree />
      </div>
    </el-container>
  </el-container>
  <!-- </div> -->
</template>

<script>
import Sliderbar from "../components/Controls/Sliderbar.vue";
import Satellites from "../components/Controls/Satellites.vue";
import { useStore } from "vuex";
import Viewer from "../components/Viewer.vue";
import ContentList from "../components/Controls/AddSatellites.vue";
import LayerTree from "../components/Controls/LayerTree.vue";

export default {
  components: {
    Viewer,
    Sliderbar,
    ContentList,
    Satellites,
    LayerTree,
  },
  data() {
    return {
      items: [
        // 水平一级菜单栏的菜单
        { index: "Home", title: "首页" },
        { index: "test1", title: "一级菜单1" },
        { index: "test2", title: "一级菜单2" },
        { index: "test3", title: "一级菜单3" },
        { index: "permission", title: "管理员权限" },
      ],
      username: "Wuqianqian",
      scenarioname: "未命名场景",
    };
  },
  setup() {
    // const s=useStore();
    // const add=()=>{
    //     s.dispatch("increment");
    // };
    // return{
    //     add
    // };
    // console.log($store.state.msg);
  },
};
</script>

<style>
.whole-div {
  position: absolute;
  width: 100%;
  height: calc(93vh);
}
.home-container {
  height: 100vh;
}
.subcontainer {
  min-height: calc(93vh);
  /* 控制sidebar */
}
.el-header {
  background-color: #2a2a2e;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  padding-right: 0;
  align-items: center;
  color: snow;
  font-size: 20px;
}
.left-header {
  display: flex;
  align-items: center;
}
.title-text {
  margin-left: 10px;
}
.right-header {
  display: flex;
  align-items: center;
}
.user-name {
  margin-right: 5px;
}
.el-avatar {
  margin-right: 10px;
  margin-left: 10px;
}
.scenario-name {
  margin-right: 10px;
}
.el-dropdown-link {
  color: snow;
}
</style>